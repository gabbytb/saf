const db = require("../models");
const Blog = db.blogs;
const Image = db.images;






// Our CREATE NEW BLOG POST Logic starts here
exports.createBlogPost = async (req, res) => {

    // Gets a unique number based on the current time
    const uniqueId = Date.now();

    // Payload
    const { id = 23401, title, description, uri, excerpt, images, author, tags, categories, isPublished } = req.body;
    
    try {

        // FORM VALIDATION:  "Compulsory Payload"
        if (!(title)) {
            const responseData = {
                success: false,
                message: "Post title missing"
            };
            console.log("*************************************",
                "\n*****  ATTEMPT: CREATE NEW POST ******",
                "\n*************************************",
                "\nCreate Post Error: ", responseData.message + "\n\n");
            return res.status(200).json(responseData);
        };

        
        //  CHECK IF POST TITLE EXISTS IN BLOG REPOSITORY
        const titleExists = await Blog.findOne({ title: title.toLowerCase() });
        if (titleExists) {
            const responseData = {
                success: false,
                message: "Post Exists"
            };
            console.log("********************************",
                        "\n*** CREATE NEW POST FAILED   ***",
                        "\n********************************",
                        "\nPOST ID: ", titleExists._id,
                        "\nPOST TITLE: ", titleExists.title + "\n\n");
            return res.status(200).json(responseData);
        };
       

        // ************************************ //
        // ***  FE: CREATE "POST"  *** //
        // ************************************ //      
        const newPost = new Blog({
            _id: uniqueId % id,
            title,          
            uri: uri.toLowerCase(),     // sanitize: convert title to lowercase. NOTE: You must sanitize your data before forwarding to backend.                                 
            description,     
            excerpt,
            author,
            tags,
            categories,  
            isPublished,
            status: isPublished === true ? 'published' : 'draft' ,        
            // expirationInMs: encrypt(expiresIn),        // Encode: token lifespan  
        });    
        await newPost.save();
        // **************************************** //
        // ***    FE: SAVE POST    *** //
        // **************************************** //


        let autoInc = uniqueId % id;
        // Step 2: Create and save images, associating them with the new post
        const imagePromises = images.map(async (imageData) => {
            const newImage = new Image({                
                _id: autoInc++,    // Associate image with the post
                url: imageData.url,
                alt: imageData.alt,
                featured: imageData.featured,
                createdAt: imageData.createdAt,
                updatedAt: imageData.updatedAt,
            });
            return await newImage.save();
        });

        // Save all images
        const savedImages = await Promise.all(imagePromises);
        console.log('Saved Images: ', savedImages);
        
        // Cleanly map over the objects, excluding the `_id`
        // const cleanedImages = savedImages.map(({ _id, ...rest }) => rest);
        // console.log(cleanedImages);

        // Step 3: Associate saved image IDs with the post
        // newPost.images = savedImages.map(img => img._id); // Store image IDs in the post
        newPost.images = savedImages;
        // newPost.images = cleanedImages;

        // newPost.images =
        const newBlog = await newPost.save(); // Update the post with the image references
            


        console.log(          
            "\n*********************************************************",
            "\n*****          NEW BLOG ARTICLE DETAILS             *****",
            "\n*********************************************************",
            `\nBlog Article Status: ${newBlog}`,
            "\n******************************************************************************************\n");
        
        
        // Send response with the created post and images
        const responseData = {
            success: true,
            data: newBlog,
            message: "Successful",
        };
        return res.status(201).json(responseData);

    } catch (error) {
        // return res.status(409).json({ message: error.message});
        const responseData = { 
            success: false, 
            message: "Internal Server Error",
        };
        console.error("Unexpected error during account verification: ", error);
        return res.status(500).json(responseData);  
    }
};  // THOROUGHLY Tested === Working


// Our FIND All BLOG POSTS Logic starts here
exports.findAllBlogPosts = async (req, res) => { 

    const { page = 1, limit = 10, status, sort } = req.query; // Destructure query parameters   
    // published
    // draft
    
    try {
        // Set for DB Query
        let query = { };
        if (status) {
            query.status = status;
        };
 
        // Set the sorting order
        let sortOrder = { };
        if (sort === 'recent') {
            sortOrder.createdAt = -1; // Sort by createdAt in descending order
        } else {
            sortOrder.createdAt = 1; // Default sorting (ascending)
        };


        const allBlogPosts = await Blog.find(query)
                                .sort(sortOrder)
                                .skip((page - 1) * limit)
                                .limit(parseInt(limit));
        console.log("BLOG POSTS BY MOST RECENT: ", allBlogPosts);


        const totalBlogPosts = await Blog.countDocuments(query); // Total number of users with the given status
        const totalPages = Math.ceil(totalBlogPosts / limit); // Calculate total pages
        const pagination = {
            postsRecord: totalBlogPosts,
            page,
            limit,
            lastPage: totalPages,
        };
        console.log("PAGINATION: ", pagination, "\n\n");

        
        const responseData = {
            success: true,
            data: {
                allBlogPosts,
                pagination
            },
            message: "Post Item retrieved successfully",
        }
        res.status(200).json(responseData);

    } catch (error) {
        console.error("Internal Server Error:", error);
        return res.status(500).send(`Internal Server Error: ${error.message}`);
    };
};  // THOROUGHLY Tested === Working


// Our FIND All PUBLISHED BLOG POSTS Logic starts here
exports.findAllPublishedPosts = async (req, res) => {

    //  res.setHeader('Content-Type', 'application/json');
    //  NOTE:  To filter a search results, specify a search condition using a "key-value" pair within curly braces, within the find method!
    //  For example, User.find({ username: 'john' }) would find all users with the username 'john'.     i.e  username = "john"
    //  In this case, We are searching for records where the isPublished property is equal to true.        i.e  isActive = true
    try {

        const allPublishedPosts = await Blog.find({ isPublished: true });
        if (!allPublishedPosts) {
            console.log("ALL PUBLISHED POSTS: ", allPublishedPosts, "\n\n");
            const responseData = {
                success: false,
                message: "RETRIEVE ALL PUBLISHED BLOG POST: Failed"
            };
            return res.status(404).json(responseData);
        };
    
        console.log("ALL PUBLISHED POSTS: ", allPublishedPosts, "\n\n");
        const responseData = {
            success: true,
            data: allPublishedPosts,
            message: "RETRIEVE ALL PUBLISHED BLOG POSTS: Successful"
        };        
        res.status(200).json(responseData);

    } catch (error) {
        // Catch error
        return res.status(500).send(`Internal Server Error ${error}`);
        // return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    };
};  // THOROUGHLY Tested === Working
// Our FIND All PUBLISHED BLOG POSTS Logic starts here
exports.findAllDraftPosts = async (req, res) => {

    //  res.setHeader('Content-Type', 'application/json');
    //  NOTE:  To filter a search results, specify a search condition using a "key-value" pair within curly braces, within the find method!
    //  For example, User.find({ username: 'john' }) would find all users with the username 'john'.     i.e  username = "john"
    //  In this case, We are searching for records where the isPublished property is equal to true.        i.e  isActive = true
    try {

        const allDraftPosts = await Blog.find({ isPublished: false });
        if (!allDraftPosts) {
            console.log("ALL POSTS IN DRAFT: ", allDraftPosts, "\n\n");
            const responseData = {
                success: false,
                message: "RETRIEVE ALL BLOG POSTS IN DRAFT: Failed"
            };
            return res.status(404).json(responseData);
        };

        console.log("ALL POSTS IN DRAFT: ", allDraftPosts, "\n\n");
        const responseData = {
            success: true,
            data: allDraftPosts,
            message: "RETRIEVE ALL BLOG POSTS IN DRAFT: Successful"
        };
        res.status(200).json(responseData);

    } catch (error) {
        // Catch error
        return res.status(500).send(`Internal Server Error ${error}`);
        // return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    };
};  // THOROUGHLY Tested === Working


// Our FIND SINGLE USER by TITLE Logic starts here
exports.findBlogPostByUrl = async (req, res) => {
    
    try {        
        
        const uri = req.params.uri;
        // const { title } = req.params;

        // const blog = await Blog.findOne({ title: title });
        const blog = await Blog.findOne({ uri });
       
        if (!blog) {
            const responseData = {
                success: false,
                message: "Post not found",
            };
            console.log("Searching for Post with Title: ", responseData);
            return res.json(responseData);
            // return res.status(404).json(responseData);
        };
        
        const responseData = {
            success: true,
            data: blog,
            message: "Successful",
        };
        console.log("FOUND POST TITLE: ", responseData);
        return res.status(200).json(responseData);

    } catch (error) {
        // Catch error
        return res.status(500).send(`Internal Server Error ${error}`);
    };
};  // THOROUGHLY Tested === Working


// Our FIND SINGLE USER by ID Logic starts here
exports.findBlogPostById = async (req, res) => {
    
    try {
        const _id = req.params.id;
        const blog = await Blog.findById(_id);

        // const id = req.params.id;
        // const blog = await Blog.filter(b => b._id === id);
        
        if (!blog) {
            const responseData = {
                success: false,
                message: "Blog post not found",
            };
            console.log("Find Blog by ID: ", responseData);
            return res.status(404).json(responseData);
        };
        
        const responseData = {
            success: true,
            data: blog,
            message: "Successful",
        };
        console.log("Find Post by ID: ", responseData);
        return res.status(200).json(responseData);

    } catch (error) {
        // Catch error
        return res.status(500).send(`Internal Server Error ${error}`);
    };
};  // THOROUGHLY Tested === Working

