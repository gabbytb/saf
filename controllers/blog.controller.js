const db = require("../models");
const Blog = db.blogs;
const Image = db.images;






// *****************************************************************
// Middlewares
// *****************************************************************
// const assignOneDayToken = require("../middlewares/AssignOneDayToken");
// const verifyToken = require("../middlewares/VerifyToken");
const setNigerianTime = require("../middlewares/SetNigerianTime");
// const setThisTimeToNigerianTime = require("../middlewares/SetThisTimeToNigerianTime");
// *****************************************************************
// *****************************************************************






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
            createdAt: setNigerianTime(),
            updatedAt: setNigerianTime(),   
            // expirationInMs: encrypt(expiresIn),        // Encode: token lifespan  
        });
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
            // console.log('NEW IMAGE BEING CREATED = ', newImage);
            return await newImage;
        });

        // Save all images
        const savedImages = await Promise.all(imagePromises);
        // console.log('Saved Images: ', savedImages);         

        // Save all images to Post Object
        newPost.images = savedImages;
      
        // Save New Post
        const newBlog = await newPost.save(); // Update the post with the image references            
        console.log(          
            "\n*********************************************************",
            "\n*****          NEW BLOG ARTICLE DETAILS             *****",
            "\n*********************************************************",
            `\nBlog Article: ${newBlog}`,
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

    // Get Pagination Parameters from the request query        
    const status = req.query.status || "";               
    const page = parseInt(req.query.page, 10) || 1;        
    const postLimit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * postLimit,
          sort = "recent";

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
                                .skip(parseInt(skip))
                                .limit(parseInt(postLimit)); 
        // console.log("ALL BLOG POSTS ARRANGED ACCORDING TO MOST-RECENT: ", allBlogPosts);

        
        const totalBlogPosts = await Blog.countDocuments(query); // Total number of users with the given status
        const totalPages = Math.ceil(totalBlogPosts / postLimit); // Calculate total pages
        const pagination = {
            postsRecord: totalBlogPosts,
            page,
            postLimit,
            lastPage: totalPages,
        };
        // console.log("PAGINATION: ", pagination, "\n\n");
        


        const responseData = {
            success: true,
            data: {
                allBlogPosts,
                pagination
            },
            message: "Items retrieved successfully",
        };
        res.status(200).json(responseData);

    } catch (error) {
        console.error("Internal Server Error:", error);
        return res.status(500).send(`Internal Server Error: ${error.message}`);
    };
};  // THOROUGHLY Tested === Working

// Our FIND All BLOG POSTS Logic starts here
exports.totalPublishedPosts = async (req, res) => { 

    // Get Pagination Parameters from the request query     
    const status = req.query.status || "";               
    const page = parseInt(req.query.page, 10) || 1;        
    const limit = parseInt(req.query.limit, 10) || 20;                        
    const skip = (page - 1) * limit,
          sort = "recent";

    try {

        // Set for DB Query
        let query = { 
            "status": "published",
        };        
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


        const allPublishedPosts = await Blog.find(query)
                                .sort(sortOrder)
                                .skip(parseInt(skip))
                                .limit(parseInt(limit));   
        
                                
        const responseData = {
            success: true,
            data: allPublishedPosts.length,
            message: "Items retrieved successfully",
        };
        res.status(200).json(responseData);

    } catch (error) {
        console.error("Internal Server Error:", error);
        return res.status(500).send(`Internal Server Error: ${error.message}`);
    };
};  // THOROUGHLY Tested === Working

// Our FIND All BLOG POSTS Logic starts here
exports.totalDraftPosts = async (req, res) => { 

     // Get Pagination Parameters from the request query     
     const status = req.query.status || "";               
     const page = parseInt(req.query.page, 10) || 1;        
     const limit = parseInt(req.query.limit, 10) || 20;                        
     const skip = (page - 1) * limit,
           sort = "recent";

    try {

        // Set for DB Query
        let query = {
            "status": "draft",
        };        
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


        const allDraftPosts = await Blog.find(query)
                                .sort(sortOrder)
                                .skip(parseInt(skip))
                                .limit(parseInt(limit));   


        const responseData = {
            success: true,
            data: allDraftPosts.length,
            message: "Items retrieved successfully",
        };
        res.status(200).json(responseData);

    } catch (error) {
        console.error("Internal Server Error:", error);
        return res.status(500).send(`Internal Server Error: ${error.message}`);
    };
};  // THOROUGHLY Tested === Working





// Our FIND All PUBLISHED BLOG POSTS Logic starts here
exports.findAllPublishedPosts = async (req, res) => {
       
    const sort = "recent";

    try {

        // Set the sorting order
        let sortOrder = { };
        if (sort === 'recent') {
            sortOrder.createdAt = -1; // Sort by createdAt in descending order
        } else {
            sortOrder.createdAt = 1; // Default sorting (ascending)
        };
 
        const allPublishedPosts = await Blog.find({ isPublished: true })             
                                            .sort(sortOrder);                                         
                
        if (!allPublishedPosts) {
            console.log("ALL PUBLISHED POSTS: ", allPublishedPosts, "\n\n");
            const responseData = {
                success: false,
                message: "No article was published",
            };
            return res.status(404).json(responseData);
        };

        console.log("ALL PUBLISHED POSTS: ", allPublishedPosts, "\n\n");
        const responseData = {
            success: true,
            data: allPublishedPosts,
            message: "Items retrieved successfully",
        };
        res.status(200).json(responseData);

    } catch (error) {
        // Catch error
        return res.status(500).send(`Internal Server Error ${error}`);
        // return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    };
};  // THOROUGHLY Tested === Working

// Our FIND All PUBLISHED BLOG POSTS Logic starts here
exports.findAllDraftPostsBUTDONTuseUSEfindAllBlogPostsMethod = async (req, res) => {

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
        const blog = await Blog.findOne({ uri });
            
        if (!blog) {
            const responseData = {
                success: false,
                message: "Post with url not found",
            };
            console.log("Find Blog Post by URL: ", responseData, "\n\n");
            return res.status(404).json(responseData);
        };
        
        const responseData = {
            success: true,
            data: blog,
            message: "Successful",
        };
        // console.log("FOUND ARTICLE BY URL: ", responseData);
        return res.status(200).json(responseData);

    } catch (error) {
        // Catch error
        return res.status(500).send(`Internal Server Error ${error.message}`);
    };
};  // THOROUGHLY Tested === Working

// Our FIND SINGLE USER by ID Logic starts here
exports.findBlogPostById = async (req, res) => {
    
    try {        

        const _id = req.params.id;    
        const blogId = await Blog.findById(_id);  

        if (!blogId) {
            const responseData = {
                success: false,
                message: "Post not found",
            };
            console.log("Find Article with ID: ", responseData);
            return res.status(404).json(responseData);
        };

        const responseData = {
            success: true,
            data: blogId,
            message: "Successful",
        };
        // console.log("Found Article with ID: ", responseData);
        return res.status(200).json(responseData);
    } catch (error) {
        // Catch error
        return res.status(500).send(`Internal Server Error ${error}`);
    };
};  // THOROUGHLY Tested === Working





// Deleta a User with the Specified id in the request
exports.deleteBlogPostById = async (req, res) => {
    
    try {

        const _id = req.params.id;         
        const postId = await Blog.deleteOne({ _id }, { useFindAndModify: false });           

        if (!postId) {
            const responseData = {
                success: false,
                message: "Post not found"
            };
            console.log("DELETE ARTICLE: ", responseData);
            return res.status(404).json(responseData);
        };

        const responseData = {
            success: true,
            data: postId,
            message: "Article deleted successfully!",
        };
        console.log("DELETED ARTICLE: ", responseData);
        return res.status(200).json(responseData);
    
    } catch (error) {
        return res.status(500).send(`Internal Server Error ${error}`);
        // return res.status(500).json({ message: `Could not delete User with ID = ${id}`, err });
    };

};