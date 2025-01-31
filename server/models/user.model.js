module.exports = mongoose => {

    const { Schema } = mongoose;
    var userSchema = new Schema({
        _id: {
            type: Number,
        },
        // userName: {
        //     type: String,
        //     // unique: true,
        // },
        displayImage: { 
            type: String,
        },
        firstName: {
            type: String,
        },
        lastName: {
            type: String,
        },
        phone: {
            type: String,
        },
        address: {
            type: String,
        },
        address2: {
            type: String,
        },
        city: {
            type: String,
        },
        state: {
            type: String,
        },
        country: {
            type: String,
        },
        postalCode: {
            type: String,
        },
        email: {
            type: String,
            unique: true,
        },
        password: {
            type: String,
            max: 1022,
            min: 8,
        },
        aboutMe: { 
            type: String,
        },
        status: { 
            type: String, 
            default: 'rejected',
        },
        approvesTandC: {
            type: Boolean,
            default: false
        },
        isVerified: { 
            type: Boolean, 
            default: false,
        },
        accessToken: {
            type: String,
        },
        tokenExpires: {
            type: Date,
        },
        roles: [
            {
                _id: Number,
                role: String,
                createdAt: Date,
                updatedAt: Date,
            }
        ],
        socials: [
            {
                _id: Number,
                fb: String,
                xr: String,
                ig: String,
                pn: String,
                wh: String,
                tk: String,
                tg: String,
                yt: String,
            },
        ],
    }, { 
        versionKey: false, 
        timestamps: true,  
    }); 
    // The first option disables the automatic creation of the default  "_v" attribute representing "versionKey".
    // Timestamps will keep track of "Time of Creation" and "Time of Update".

    const User = mongoose.model("User", userSchema);
    return User;
};




// User.create({ id: 4427, username: "admin", firstName: "Oyebanji", lastName: "Gabriel", phone: 2347038662402, address: '11a, Chidison str', address2: '14, Lekan Muritala str, Aboru, Lagos', city: 'Iba', state: 'Oyo', country: 'Nigeria', zipCode: 23401, email: "igabrieloyebanji@gmail.com", password: "Administrativerightsonly", roles: [ { id: 5, role: "ROLE_STAFF" } , { id: 6, role: "ROLE_ADMIN" } ], permission: ["project-index", "project-create", "project-delete"], isActive: true });

// console.log(`***** Created New User: ${User}`);
// console.log("***** Created New User: ", User);