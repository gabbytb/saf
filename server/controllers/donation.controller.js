const db = require('../models');
const Donation = db.donations;
const Image = db.images;








// *****************************************************************
// Middlewares
// *****************************************************************
const setNigerianTime = require("../middlewares/SetNigerianTime");
// const setThisTimeToNigerianTime = require("../middlewares/SetThisTimeToNigerianTime");
// *****************************************************************
// *****************************************************************








// Our CREATE NEW DONATION Logic starts here
exports.createDonation = async (req, res) => {

    // Gets a unique number based on the current time
    const uniqueId = Date.now();

    // Payload
    const { id = 23401, images, title, description, uri, excerpt, categories, tags, amountToRaise, amountRaised, author, isActive } = req.body;
    
    try {

        // FORM VALIDATION:  "Compulsory Payload"
        if (!(title)) {
            const responseData = {
                success: false,
                message: "Fill required inputs"
            };
            console.log("*************************************",
                        "\n***  ATTEMPT: CREATE NEW DONATION ***",
                        "\n*************************************",
                        "\nCreate Donation, Error: ", responseData.message + "\n\n");
            return res.status(200).json(responseData);
        };

        
        //  CHECK IF DONATION TITLE EXISTS IN DONATION REPOSITORY
        const titleExists = await Donation.findOne({ title: title.toLowerCase() });
        if (titleExists) {
            const responseData = {
                success: false,
                message: "Donation Title exists"
            };
            console.log("************************************",
                        "\n*** CREATE NEW DONATION FAILED   ***",
                        "\n************************************",
                        "\nDONATION ID: ", titleExists._id,
                        "\nDONATION TITLE: ", titleExists.title + "\n\n",
                        "\nERROR MESSAGE: ", responseData.message + "\n\n");
            return res.status(200).json(responseData);
        };
       

        // ************************************ //
        // ***  FE: CREATE "DONATION"  *** //
        // ************************************ //    
        const newDonation = new Donation({
            _id: uniqueId % id,            
            title,            
            uri: uri.toLowerCase(),     // sanitize: convert url to lowercase. NOTE: You must sanitize your data before forwarding to backend.                                 
            description,     
            excerpt,            
            tags,
            categories,  
            amountToRaise,
            amountRaised,
            author,
            isActive,
            status: isActive === true ? 'active' : 'inactive',  
            createdAt: setNigerianTime(),
            updatedAt: setNigerianTime(),          
            // expirationInMs: encrypt(expiresIn),        // Encode: token lifespan  
        });
        // console.log("NEW DONATION: ", newDonation);
        // **************************************** //
        // ***    FE: SAVE DONATION    *** //
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
         
        // Merge/Save all saved images to Donation Object
        newDonation.images = savedImages;
              
        // Save New Post
        const savedDonation = await newDonation.save(); // Update the post with the image references            
        console.log(          
            "\n*********************************************************",
            "\n*****            NEW DONATION DETAILS               *****",
            "\n*********************************************************",
            `\nNEW DONATION: ${savedDonation}`,
            "\n******************************************************************************************\n");
        
        
        // Send response with the created post and images
        const responseData = {
            success: true,
            data: savedDonation,
            message: "Successful",
        };
        return res.status(201).json(responseData);

    } catch (error) {
        // return res.status(409).json({ message: error.message});
        const responseData = { 
            success: false, 
            message: "Internal Server Error",
        };
        console.error("Unexpected error occurred while Creating Donation: ", error);
        return res.status(500).json(responseData);  
    }
};  // THOROUGHLY Tested === Working





// Our FIND All BLOG POSTS Logic starts here
exports.findAllDonations = async (req, res) => { 

    // Get Pagination Parameters from the request query        
    const status = req.query.status || "";               
    const page = parseInt(req.query.page, 10) || 1;        
    const donationsLimit = parseInt(req.query.limit, 10) || 12;
    const skip = (page - 1) * donationsLimit,
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


        const donations = await Donation.find(query)
                                .sort(sortOrder)
                                .skip(parseInt(skip))
                                .limit(parseInt(donationsLimit)); 
        // console.log("ALL DONATIONS ARRANGED ACCORDING TO MOST-RECENT: ", donations);

        
        const totalDonations = await Donation.countDocuments(query); // Total number of users with the given status
        const totalPages = Math.ceil(totalDonations / donationsLimit); // Calculate total pages
        const pagination = {
            donationsRecord: totalDonations,
            page,
            donationsLimit,
            lastPage: totalPages,
        };
        // console.log("PAGINATION: ", pagination, "\n\n");
    
        const responseData = {
            success: true,
            data: {
                donations,
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

// Our FIND All ACTIVE DONATIONS Logic starts here
exports.totalActiveDonations = async (req, res) => { 

    // Get Pagination Parameters from the request query     
    const status = req.query.status || "";               
    const page = parseInt(req.query.page, 10) || 1;        
    const limit = parseInt(req.query.limit, 10) || 20;                        
    const skip = (page - 1) * limit,
          sort = "recent";

    try {
     
        // Set for DB Query
        let query = { 
            "status": "active",
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

        const allActiveDonations = await Donation.find(query)
                                .sort(sortOrder)
                                .skip(parseInt(skip))
                                .limit(parseInt(limit));   
                                        
        const responseData = {
            success: true,
            data: allActiveDonations.length,
            message: "Items retrieved successfully",
        };
        res.status(200).json(responseData);

    } catch (error) {
        console.error("Internal Server Error:", error);
        return res.status(500).send(`Internal Server Error: ${error.message}`);
    };
};  // THOROUGHLY Tested === Working

// Our FIND All INACTIVE DONATIONS Logic starts here
exports.totalInactiveDonations= async (req, res) => { 

     // Get Pagination Parameters from the request query     
     const status = req.query.status || "";               
     const page = parseInt(req.query.page, 10) || 1;        
     const limit = parseInt(req.query.limit, 10) || 20;                        
     const skip = (page - 1) * limit,
           sort = "recent";

    try {

        // Set for DB Query
        let query = { 
            "status": "inactive",
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

        const allInactiveDonations = await Donation.find(query)
                                .sort(sortOrder)
                                .skip(parseInt(skip))
                                .limit(parseInt(limit));   

        const responseData = {
            success: true,
            data: allInactiveDonations.length,
            message: "Items retrieved successfully",
        };
        res.status(200).json(responseData);

    } catch (error) {
        // console.error("Internal Server Error:", error);
        return res.status(500).send(`Internal Server Error: ${error.message}`);
    };
};  // THOROUGHLY Tested === Working





exports.findDonationById = async (req, res) => {

    try {
        const _id = req.params.id;
        const donationId = await Donation.findById(_id);

        if (!donationId) {
            const responseData = {
                success: false,
                message: "Donation not found",
            };
            res.status0(404).json(responseData);
        };

        const parseDonationFound = {
            id: donationId._id,
            title: donationId.title,
            desc: donationId.description,
            url: donationId.uri,
            excerpt: donationId.excerpt,
            tags: donationId.tags,
            categories: donationId.categories,
            amount_raised: donationId.amountRaised,
            amount_to_raise: donationId.amountToRaise,
            author: donationId.author,
            status: donationId.status,
            is_active: donationId.isActive,
            images: [donationId.images],
            created_at: donationId.createdAt,
            updated_at: donationId.updatedAt,    
        };
        const responseData = {
            success: true,
            data: parseDonationFound,
            message: "Item retrieved successfully",
        };
        console.log("Find Donation by ID: ", responseData);
        res.status(200).json(responseData);

    } catch (error) {        
        return res.status(500).send("Internal Server Error: ", error.message);
    };

};  // THOROUGHLY Tested === Working
