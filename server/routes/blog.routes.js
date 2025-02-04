module.exports = app => {

    const router = require("express").Router();    
    // const corsOptions = {
    //     // origin: ["http://127.0.0.1:8000"],
    //     origin: ["http://localhost:8000"],
    //     methods: ["GET", "POST", "PUT", "DELETE"],
    //     credentials: true,
    // };
    const blogs = require("../controllers/blog.controller");




    router.post("/api/v1/admin/blogs/manage/create", blogs.createBlogPost);


    router.get(["/api/v1/admin/posts/manage", "/donations"], blogs.findAllBlogPosts);
    router.get("/api/v1/admin/posts/manage/publishedPosts", blogs.totalPublishedPosts);
    router.get("/api/v1/admin/posts/manage/draftPosts", blogs.totalDraftPosts);


    router.get("/api/v1/admin/blogs/manage/:isPublished", blogs.findAllPublishedPosts); // WORKING PERFECT FOR DISPLAYING ALL ARTICLES ON A SINGLE PAGE


    router.get("/api/v1/admin/blogs/manage/draft-posts", blogs.findAllDraftPostsBUTDONTuseUSEfindAllBlogPostsMethod); 
    
    // router.get("/api/v1/admin/blogs/manage/:isPublished", blogs.findAllPublishedPosts); 
    
    router.get("/api/v1/admin/blogs/manage/post/:id", blogs.findBlogPostById);

    router.get("/api/v1/admin/blogs/manage/article/:uri", blogs.findBlogPostByUrl);

    // router.put("/api/v1/admin/blogs/manage/post/update", blogs.updateBlogPost);

    router.delete("/api/v1/admin/blogs/manage/delete/:id", blogs.deleteBlogPostById);

    // router.delete("/api/v1/admin/blogs/manage/posts/cleanup", blogs.deleteAllBlogPost);

    // Serve static files from the React app (build folder)
    app.use("/", router);

};