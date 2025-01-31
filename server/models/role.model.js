module.exports = mongoose => {
    
    const { Schema } = mongoose;
    var roleSchema = new Schema({
        _id : {
            type: Number,
        },
        role: {
            type: String,
            unique: true,
            required: true,
        },
    }, { versionKey: false, timestamps: true, });



    // ***************************************************************//
    // HOW TO SET CURRENT DATE TO CURRENT NIGERIAN TIME AND DATE
    // ***************************************************************//
    // const setNigerianTime = require("../middlewares/SetNigerianTime");


    
    const Role = mongoose.model("Role", roleSchema);
    // const roleAdmin = Role.create({ _id: 247, role: "ROLE_ADMIN", createdAt: setNigerianTime() });
    // console.log("Created Role ADMIN: ", roleAdmin);
    // const roleEditor = Role.create({ _id: 627, role: "ROLE_EDITOR", createdAt: setNigerianTime() });
    // console.log("Created Role EDITOR: ", roleEditor);
    // const roleStaff = Role.create({ _id: 90210, role: "ROLE_STAFF", createdAt: setNigerianTime() });
    // console.log("Created Role STAFF: ", roleStaff);
    // const roleUsers = Role.create({ _id: 366247, role: "ROLE_USERS", createdAt: setNigerianTime() });
    // console.log("Created Role USERS: ", roleUsers);
    return Role;

};