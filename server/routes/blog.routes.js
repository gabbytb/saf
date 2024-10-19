module.exports = app => { 

    const router = require("express").Router();
    const blogs = require("../controllers/blog.controller");




    router.post("/api/v1/admin/blogs/manage/create", blogs.createBlogPost);

    router.get("/api/v1/admin/blogs/manage", blogs.findAllBlogPosts);

    router.get("/api/v1/admin/blogs/manage/isPublished", blogs.findAllPublishedPosts); 
    
    router.get("/api/v1/admin/blogs/manage/unPublished", blogs.findAllDraftPosts); 
    
    // router.get("/api/v1/admin/blogs/manage/:isPublished", blogs.findAllPublishedPosts); 
    
    router.get("/api/v1/admin/blogs/manage/post/:uri", blogs.findBlogPostByUrl);

    router.get("/api/v1/admin/blogs/manage/post/:id", blogs.findBlogPostById);

    // router.put("/api/v1/admin/blogs/manage/post/update", blogs.updateBlogPost);

    // router.delete("/api/v1/admin/blogs/manage/post/delete/:id", blogs.deleteSingleBlogPost);

    // router.delete("/api/v1/admin/blogs/manage/posts/cleanup", blogs.deleteAllBlogPost);

    

    app.use("/", router);

};