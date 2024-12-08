module.exports = app => {

    const router = require("express").Router();
    const roles = require("../controllers/role.controllers.js");    
    

    // Create a New User
    router.post("/admin/roles/manage/create", roles.create);
    
    // Retrieve all Users 
    router.get("/admin/roles/manage", roles.findAllUserRoles);

    // // Retrieve all active Users
    // router.get("/admin/users/manage/active", users.findAllActive);

    // // Retrieve a single user by Id
    router.get("/admin/roles/manage/:id", roles.findRoleById);

    // // Retrieve a single user by Id
    // router.put("/admin/users/manage/update/:id", users.updateUser);

    // // Retrieve a single user by Id
    // router.delete("/admin/users/manage/delete/:id", users.deleteUser);

    // // Delete all user entries
    // router.delete("/admin/users/manage/delete", users.deleteAllUsers);

    app.use("/api/v1", router);

};