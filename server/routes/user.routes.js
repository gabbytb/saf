module.exports = app => {        

    const router = require('express').Router();
    // const cors = require("cors");
    // const corsOptions = {        
    //     origin: ["https://67964cb165d323de7e4df4f4--superlative-crepe-cc644f.netlify.app"],
    //     methods: ["GET", "POST", "PUT", "DELETE"],
    //     credentials: true,
    // };
    const requireAUTHORIZATION = require("../middlewares/RequireAuthorization.js");   
    const verifyTokenAndUpdateUserByID = require("../middlewares/VerifyTokenAndUpdateUserByID.js");
    const users = require("../controllers/user.controllers.js");







    


 

    // Monitor and Save - ALL USERS Activities !!!
    router.post("/api/logs", users.monitorUsersActivities);
    // Expose this endpoint(i.e "http://127.0.0.1:8000/api/logs") for the frontend to access.


    // Create a new "signUp" using this API
    router.post("/api/v1/admin/users/manage/create", users.signUp);
    //  router.post("/api/v1/admin/users/manage/create", cors(corsOptions), users.signUp);
    // Expose this endpoint(i.e "http://127.0.0.1:8000/api/v1/admin/users/manage/create") for the frontend to access.    

    
    // ADMIN: Create a new "signUp" using this API
    router.post("/api/v1/auth/admin/manage/create", users.adminCreateUser);
    // Expose this endpoint(i.e "http://127.0.0.1:8000/api/v1/admin/users/manage/create") for the frontend to access.
        
    
    // Verify Unverified "signUp" using this API
    router.post("/api/v1/admin/users/manage/account/verify", users.reValidateSignUp);
    // router.post("/api/v1/admin/users/manage/account/verify", cors(corsOptions), users.reValidateSignUp);
    // Expose this endpoint(i.e "http://127.0.0.1:3000/api/v1/admin/users/manage/account-revalidation") for the frontend to access.

    
    // Verify "signUp" using this API
    router.get("/user/verify", verifyTokenAndUpdateUserByID, users.verifySignUpWithGetReq);
    // Expose this endpoint(i.e "http://127.0.0.1:8000/user/verify?token=:token") for the frontend to access.
    

    // Verify All "User" Accounts using this API
    // router.post("/user/verify/:token", users.verifyUserAccountWithPost);
    // router.post("/user/verify/:token", cors(corsOptions), users.verifySignUpWithPost); 
    // Expose this endpoint(i.e "http://127.0.0.1:8000/user/verify/:token") for the frontend to access.


    // Login User
    router.post("/api/v1/auth/login", users.logIn);
    // Expose this endpoint(i.e "http://127.0.0.1:8000/api/v1/auth/login") for the frontend to access.


    // Login User with G-Mail
    router.post('/api/v1/auth/gmail/login', users.googleSignOn);
    // Expose this endpoint(i.e "http://127.0.0.1:8000/api/v1/auth/gmail/login") for the frontend to access.

        
    // Fetch a "Single User" DATA by it's ID, using this API
    router.get("/api/v1/auth/account/manage/:id", users.findSingleUserById);
    // Expose this endpoint(i.e "http://127.0.0.1:8000/api/v1/admin/users/manage/:id") for the frontend to access.




    // Fetch all "Users" DATA using API
    router.get("/api/v1/auth/account/by-role/ROLE_USERS", users.findAllUsers);
    // Expose this endpoint(i.e "http://127.0.0.1:8000/api/v1/admin/users/manage") for the frontend to access.
        
    // Fetch DATA using this API
    router.get("/api/v1/account/users/manage/approved", users.totalApprovedUsers);
    // Expose this endpoint(i.e "http://127.0.0.1:8000/api/v1/admin/users/manage/published") for the frontend to access.
    router.get("/api/v1/account/users/manage/pending", users.totalPendingUsers);
    // Expose this endpoint(i.e "http://127.0.0.1:8000/api/v1/admin/users/manage/published") for the frontend to access.
    router.get("/api/v1/account/users/manage/rejected", users.totalRejectedUsers);       
    // Expose this endpoint(i.e "http://127.0.0.1:8000/api/v1/admin/users/manage/published") for the frontend to access.
  


        
    // Fetch all "Admin Users" DATA using API
    router.get("/api/v1/auth/account/admins", users.findAllAdmins);
    // Expose this endpoint(i.e "http://127.0.0.1:8000/api/v1/auth/account/admins") for the frontend to access.

    // Fetch DATA using this API
    router.get("/api/v1/admin/users/manage/approvedAdmins", users.totalApprovedAdmins);
    // Expose this endpoint(i.e "http://127.0.0.1:8000/api/v1/admin/users/manage/approvedAdmins") for the frontend to access.
    router.get("/api/v1/admin/users/manage/pendingAdmins", users.totalPendingAdmins);
    // Expose this endpoint(i.e "http://127.0.0.1:8000/api/v1/admin/users/manage/pendingAdmins") for the frontend to access.
    router.get("/api/v1/admin/users/manage/rejectedAdmins", users.totalRejectedAdmins);
    // Expose this endpoint(i.e "http://127.0.0.1:8000/api/v1/admin/users/manage/rejectedAdmins") for the frontend to access.
    
    



    // Update a "Single User" DATA by it's ID, using this API
    router.put("/api/v1/admin/users/manage/update/:id", users.updateSingleUserById);
    // Expose this endpoint(i.e "http://127.0.0.1:8000/api/v1/admin/users/manage/update/:id") for the frontend to access.


    // Update a "Single User Status" DATA by it's ID, using this API
    router.put("/api/v1/admin/users/manage/update/status/:id", users.activateOrDeactivateSingleUserById);
    // Expose this endpoint(i.e "http://127.0.0.1:8000/api/v1/admin/users/manage/update/:id") for the frontend to access.
    

    // router.post("/image-upload", users.uploadImages);
    // Expose this endpoint(i.e "http://127.0.0.1:8000/image-upload") for the frontend to access.


    // Delete a "Single User" DATA by it's ID, using this API
    router.delete("/api/v1/admin/users/manage/delete/:id", users.deleteUserById);
    // Expose this endpoint(i.e "http://127.0.0.1:8000/api/v1/admin/users/manage/delete/:id") for the frontend to access.


    // Delete all "Users" DATA using this API
    router.delete("/api/v1/admin/users/manage/delete", requireAUTHORIZATION, users.deleteAllUsers);
    // Expose this endpoint(i.e "http://127.0.0.1:8000/api/v1/admin/users/manage/delete") for the frontend to access.


    app.use("/", router);

};



























// const requireAuth = (req, res, next) => {
//     const bearerHeader = req.headers.authorization;
//     if (!bearerHeader || !bearerHeader.startsWith('Bearer ')) {
//         const responseData = { 
//             success: false, 
//             message: "Unauthorized",
//         }
//         return res.status(401).json(responseData);
//     }
//
//     next();
// }
//
// OR
//
// const verifyToken = (req, res, next) => {
//     const bearerHeader = req.headers["authorization"];
//     if (typeof bearerHeader !== "undefined") {
//         const bearerToken = bearerHeader.split(" ")[1];
//         req.token = bearerToken;
//         next();
//     } else {  
//         res.sendStatus(403);  
//     }  
// }