const ROLES = {
    ADMIN: "ROLE_ADMIN",   // FOR: signUp
    EDITOR: "ROLE_EDITOR",   // FOR: signUp
    STAFF: "ROLE_STAFF",   // FOR: signUp
    USERS: "ROLE_USERS",   // FOR: signUp
    // Add other roles as needed
    XYZ: ["ROLE_ADMIN", "ROLE_EDITOR", "ROLE_STAFF"],   // FOR: findAllAdmins
    SELECTOR: ["ROLE_ADMIN" || "ROLE_EDITOR" || "ROLE_STAFF" || "ROLE_USERS" ||
          "ROLE_ADMIN", "ROLE_EDITOR", "ROLE_STAFF", "ROLE_USERS" ||
          "ROLE_ADMIN", "ROLE_EDITOR", "ROLE_STAFF" ||
          "ROLE_ADMIN", "ROLE_EDITOR" ||
          "ROLE_ADMIN", "ROLE_STAFF" ||
          "ROLE_EDITOR", "ROLE_STAFF"
    ],
};

module.exports = ROLES;