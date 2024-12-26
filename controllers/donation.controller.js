const db = require('../models');
const Donation = db.donations;







// Our CREATE NEW DONATION Logic starts here
exports.createDonation = async (req, res) => {

    // Gets a unique number based on the current time
    const uniqueId = Date.now();

    // Payload
    const { id = 23401, images, title, description, uri, excerpt, categories, tags, amountToRaise, amountRaised, author, isActive } = req.body;
    
    try {

        // FORM VALIDATION:  "Compulsory Payload"
        if (!(title && description && amountToRaise)) {
            const responseData = {
                success: false,
                message: "Fill required inputs"
            };
            console.log("*************************************",
                        "\n***  ATTEMPT: CREATE NEW DONATION ***",
                        "\n*************************************",
                        "\nCreate Donation Error: ", responseData.message + "\n\n");
            return res.status(200).json(responseData);
        };

        
        //  CHECK IF DONATION TITLE EXISTS IN DONATION REPOSITORY
        const titleExists = await Donation.findOne({ title: title.toLowerCase() });
        if (titleExists) {
            const responseData = {
                success: false,
                message: "Donation Title Exists"
            };
            console.log("********************************",
                        "\n*** CREATE NEW POST FAILED   ***",
                        "\n********************************",
                        "\nPOST ID: ", titleExists._id,
                        "\nPOST TITLE: ", titleExists.title + "\n\n");
            return res.status(200).json(responseData);
        };
       

        // ************************************ //
        // ***  FE: CREATE "DONATION"  *** //
        // ************************************ //      
        const newDonation = new Donation({
            _id: uniqueId % id,            
            title,          
            uri: uri.toLowerCase(),     // sanitize: convert title to lowercase. NOTE: You must sanitize your data before forwarding to backend.                                 
            description,     
            excerpt,            
            tags,
            categories,  
            amountToRaise,
            amountRaised,
            author,
            isActive,
            status: isActive === true ? 'published' : 'draft' ,        
            // expirationInMs: encrypt(expiresIn),        // Encode: token lifespan  
        });
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

            console.log('NEW IMAGE BEING CREATED = ', newImage);
            return await newImage.save();    
        });


        // Save all images
        const savedImages = await Promise.all(imagePromises);
        console.log('Saved Images: ', savedImages);
         

        // Save all images to Donation Object
        newDonation.images = savedImages;
      
        
        // Save New Post
        const savedDonation = await newDonation.save(); // Update the post with the image references
            

        console.log(          
            "\n*********************************************************",
            "\n*****          NEW BLOG ARTICLE DETAILS             *****",
            "\n*********************************************************",
            `\nDONATION Status: ${savedDonation}`,
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
        console.error("Unexpected error during account verification: ", error);
        return res.status(500).json(responseData);  
    }
};  // THOROUGHLY Tested === Working


