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

    const Role = mongoose.model("Role", roleSchema);
    // Role.create({ _id: 247, role: "ROLE_ADMIN", });
    // Role.create({ _id: 627, role: "ROLE_EDITOR", });
    // Role.create({ _id: 90210, role: "ROLE_STAFF", });
    // Role.create({ _id: 366247, role: "ROLE_USERS", });
    // console.log("Created Role: ", Role);
    return Role;

};