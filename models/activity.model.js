module.exports = mongoose => {
    
    const { Schema } = mongoose;
    var activitySchema = new Schema({
        _id : {
            type: Number,
            unique: true,
        },
        trigger: {
            type: String,
        },
        log: {
            type: String,
        },
    }, { 
        versionKey: false, 
        timestamps: true, 
    });


    const Activity = mongoose.model("Activity", activitySchema);
    // Role.create({ _id: 247, role: "ROLE_ADMIN", });
    // Role.create({ _id: 627, role: "ROLE_EDITOR", });
    // Role.create({ _id: 90210, role: "ROLE_STAFF", });
    // Role.create({ _id: 366247, role: "ROLE_USERS", });
    // console.log("Created Role: ", Role);
    return Activity;

};