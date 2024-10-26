const db = require("../models");
const Product = db.products;
const Image = db.images;






// exports.createImage = async (req, res) => {
//     const randNum = Math.floor(21*Math.random()) + Math.floor(47*Math.random()) + Math.floor(98*Math.random());
//     try {
//         // const productImages = req.body.file.map(file => file.path);
//         const { productId, file, featured } = req.body;
//         const product = await Product.findById(productId);

//         if (!product) {
//             const responseData = {
//                 success: false,
//                 message: "Failed to upload"
//             }
//             return res.status(400).json(responseData);
//         }
        
//         const newImage = await new Image({ 
//             _id: productId*randNum,
//             url: file,
//             featured,
//         })
//         const productImages = await newImage.save();
//         product.images = productImages;
//         await product.save();
        
//         return res.status(201).json({ message: 'Images uploaded successfully' });
        
//     } catch (error) {
//         console.log('ERROR FROM "CREATE NEW IMAGE" CONTROLLER:', error);
//         const errResponseData = { 
//             success: false, 
//             message: "INTERNAL SERVER ERROR: ", 
//             error: error.message 
//         }
//         return res.status(500).json(errResponseData);
//     }
// }


// Create New Product
exports.create = async (req, res) => {

    try {

        const randNum = Math.floor(280*Math.random());
        const { id, title, description, unit, price, location, author, isActive } = req.body;

        // FORM VALIDATION:  "Compulsory Payload"
        if (!( title && description && author && price )) {
            const responseData = { 
                success: false, 
                message: "Required fields are missing." 
            };
            console.log("Payload missing: ", responseData);
            return res.status(200).json(responseData);
        };
        

        const productTitleExists = await Product.findOne({ title: title.toLowerCase() });
        if (productTitleExists) {
            const responseData = { 
                success: false, 
                message: "Product exists."
            };
            console.log("Product Exists: ", responseData);
            return res.status(200).json(responseData);
        };


        // Initialize new Product instance
        const newProduct = new Product({
            _id: id*randNum,
            images: [],
            title: title.toLowerCase(),
            description,
            excerpt: description.slice(0, 130) + "...",
            unit,
            price,
            location,
            author,
            isActive
        });
        const product = await newProduct.save();
        const responseData = {
            success: true,
            data: product,
            message: "Successful"
        };
        console.log("*** NEW SHOP PRODUCT: ", responseData);
        return res.status(201).json(responseData);

    } catch(error) {
        // Catch error
        return res.status(500).send(`Internal Server Error ${error}`);
        // const errResponseData = { 
        //     success: false, 
        //     message: "INTERNAL SERVER ERROR: ", 
        //     error: error.message 
        // }
        // return res.status(500).json(errResponseData);    
    }
};

// Find All Products
exports.findAll = async (req, res) => {

    try {

        const allProducts = await Product.find({});
        if (!(allProducts)) {
            const responseData = {
                success: false,
                message: "Products not found",
            };
            console.log("Failed to fetch all Product items: ", responseData);
            return res.status(404).json(responseData);
        }

        const responseData = {
            success: true,
            data: allProducts,
            message: "Successful"
        };
        console.log("All Products: ", responseData);
        return res.status(200).json(responseData);

    } catch(error) {
        // Catch error
        return res.status(500).send(`Internal Server Error ${error}`);
        // const errResponseData = { 
        //     success: false, 
        //     message: "INTERNAL SERVER ERROR: ", 
        //     error: error.message 
        // }
        // return res.status(500).json(errResponseData);  
    }
};

// Find Single Product By ID
exports.findProductById = async (req, res) => {
    try{
        const _id = req.params['id'];
        const product = await Product.findById(_id);      
        if (!product) {
            const responseData = {
                success: false,
                message: "Product not found",
            };
            console.log("Failed to fetch Single Product item: ", responseData);
            return res.status(200).json(responseData);
        } 
        
        const responseData = {
            success: true,
            data: product,
            message: "Successful",
        };
        console.log("Single Product: ", responseData);
        return res.status(200).json(responseData);

    } catch(error) {
        // Catch error
        return res.status(500).send(`Internal Server Error ${error}`);
        // const errResponseData = { 
        //     success: false, 
        //     message: "INTERNAL SERVER ERROR: ", 
        //     error: error.message 
        // }
        // return res.status(500).json(errResponseData);
    }
};

// Find All isPublished Products
exports.findIsActiveProducts = async (req, res) => {
    try {
        const isActiveProducts = await Product.find({ isActive: true });
        if (!(isActiveProducts)) {
            const responseData = { 
                success: false,
                message: "isActive Products not found",
            };
            return res.status(404).json(responseData);
        };

        const responseData = {
            success: true,
            data: isActiveProducts,
            message: "Successful",
        }
        console.log('ALL ACTIVE PRODUCTS: ', responseData);
        return res.status(200).json(responseData);
        
    } catch (error) {
        // Catch error
        return res.status(500).send(`Internal Server Error ${error}`);
        // const errResponseData = { 
        //     success: false, 
        //     message: "INTERNAL SERVER ERROR: ", 
        //     error: error.message 
        // }
        // return res.status(500).json(errResponseData);
    };
};

// Update Post Information By Finding Post Title
exports.updateProductById = async (req, res) => {
    
    const { title, description, excerpt, images, author, unit, price, location, isActive } = req.body;
    const dataToUpdate = {  
        title,
        description, 
        excerpt,
        author,
        images,
        unit,
        price,
        location,
        isActive,
    };

    try {
        const updatedProduct = await Product.findOneAndUpdate({ title }, dataToUpdate, { new: true });
        if (!(updatedProduct)) {    
            const responseData = {
                success: false, 
                message: "UpdatedProduct not found",
            };
            console.log("SERVER RESPONSE FOR: ", responseData);
            return res.status(404).json(responseData);
        };

        const responseData = {
            success: true, 
            data: updatedProduct,
            message: "Successful", 
        };
        console.log("EXISTING PRODUCT: ", updatedProduct.title + " was updated!", 
                    "\nUPDATED PRODUCT: ", responseData.data);
        return res.status(200).json(responseData);;      
     
    } catch (error) {
        // Catch error
        console.log("Internal Server Error: ", error.message);
        return res.status(500).send("Internal Server Error: ", error);
    }
};

// Deleta a Post with the Specified "ID" in the request
exports.deleteProductById = async (req, res) => {
    try{
        const _id = req.params.id;
        const product = Product.findByIdAndRemove(_id, { useFindAndModify: false })
        if (!(product)) {
            const responseData = {
                success: false, 
                message: "Product not found!" 
            };
            return res.status(404).json(responseData);
        }
        
        const responseData = {
            success: true, 
            data: product,
            message: "Successful", 
        };
        return res.status(200).json(responseData);
    
    } catch (error) {
        // Catch error
        console.log("Internal Server Error: ", error.message);
        return res.status(500).send("Internal Server Error: ", error);
    }
};

// Delete All Posts
exports.deleteAll = (req, res) => {
    try{
        const products = Product.deleteMany({});
        if (!products) {
            const responseData = { 
                success: false,
                message: "Failed to execute action!" 
            };
            return res.status(404).json(responseData);
        }

        const responseData = { 
            success: true,
            data: products,
            message: `${products.deletedCount} Posts was deleted successfully!` 
        }
        return res.status(200).json(responseData);
        
    } catch (error) {
        console.log("Internal Server Error: ", error.message);
        return res.status(500).send("Internal Server Error: ", error);
    }
};
