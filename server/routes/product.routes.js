module.exports = app => {

    const router = require("express").Router();
    const products = require("../controllers/product.controllers.js");    
    const multer = require("multer");

   
    // const corsOptions = {
    //     origin: "http://127.0.0.1:3000"
    // }
    // const cors = require("cors");


    // Set up Multer storage options
    // const storage = multer.diskStorage({
    //     destination: function (req, file, cb) {
    //         cb(null, 'uploads/');
    //     },
    //     filename: function (req, file, cb) {
    //         cb(null, Date.now() + '-' + file.originalname);
    //     }
    // });
    // const upload = multer({ storage: storage });


    // Handle POST request to upload images for a product
    // router.post('/products/images', upload.array('images', 5), products.createImage);


    // Create a new "Product" DATA using this API
    router.post("/api/v1/admin/products/manage/create", products.create);
    // Expose this endpoint(i.e "http://127.0.0.1:8000/api/v1/admin/products/manage/create") for the frontend to access.
    
    
    // Fetch all "Products" DATA from using API
    router.get("/api/v1/admin/products/manage", products.findAll);
    // Expose this endpoint(i.e "http://127.0.0.1:8000/api/v1/admin/products/manage") for the frontend to access.


    // Fetch a "Single Product" DATA by it's ID, using this API
    router.get("/api/v1/admin/products/manage/:id", products.findProductById);
    // Expose this endpoint(i.e "http://127.0.0.1:8000/api/v1/admin/products/manage/:id") for the frontend to access.
    

    // Fetch all "isPublished Products" DATA using this API
    router.get("/api/v1/admin/products/manage/published", products.findIsActiveProducts);
    // Expose this endpoint(i.e "http://127.0.0.1:8000/api/v1/admin/products/manage/published") for the frontend to access.


    // Update a "Single Product" DATA by it's ID, using this API
    router.put("/api/v1/admin/products/manage/update/:id", products.updateProductById);
    // Expose this endpoint(i.e "http://127.0.0.1:8000/api/v1/admin/products/manage/update/:id") for the frontend to access.


    // Delete a "Single Product" DATA by it's ID, using this API
    router.delete("/api/v1/admin/products/manage/delete/:id", products.deleteProductById);
    // Expose this endpoint(i.e "http://127.0.0.1:8000/api/v1/admin/products/manage/delete/:id") for the frontend to access.


    // Delete all "Products" DATA using this API
    router.delete("/api/v1/admin/products/manage/delete", products.deleteAll);
    // Expose this endpoint(i.e "http://127.0.0.1:8000/api/v1/admin/products/manage/delete") for the frontend to access.


    app.use("/", router);
    
};