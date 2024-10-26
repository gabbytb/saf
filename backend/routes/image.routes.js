module.exports = app => {

    const router = require("express").Router();
    const images = require("../controllers/image.controllers.js");    


    router.post("/api/upload", images.create);

    
    app.use("/", router);

};