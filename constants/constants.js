const ROLES = {
    ADMIN: "ROLE_ADMIN",
    EDITOR: "ROLE_EDITOR",
    STAFF: "ROLE_STAFF",
    USERS: "ROLE_USERS",
    // Add other roles as needed
    XYZ: ["ROLE_ADMIN", "ROLE_EDITOR", "ROLE_STAFF"],
    SELECTOR: ["ROLE_ADMIN" || "ROLE_EDITOR" || "ROLE_STAFF" || "ROLE_USERS" ||
          "ROLE_ADMIN", "ROLE_EDITOR", "ROLE_STAFF", "ROLE_USERS" ||
          "ROLE_ADMIN", "ROLE_EDITOR", "ROLE_STAFF" ||
          "ROLE_ADMIN", "ROLE_EDITOR" ||
          "ROLE_ADMIN", "ROLE_STAFF" ||
          "ROLE_EDITOR", "ROLE_STAFF"
    ],
};

module.exports = ROLES;