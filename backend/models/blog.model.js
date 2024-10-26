module.exports = mongoose => {
       
    const { Schema } = mongoose;
    var blogSchema = new Schema({
        _id: {
            type: Number,
        },
        img: {
            type: String,
        },
        title: {
            type: String,
        },
        uri: {
            type: String,
        },
        description: {
            type: String,
        },   
        excerpt: {
            type: String,
        },
        comments: [
            {
                contribution: String,
                firstName: { 
                    type: String, 
                    default: 'anonymous',
                },
                lastName: String,        
                email: String,
            },
        ],
        author: {
            img: String,
            name: String,
            bio: String,
        },
        tags: [],
        categories: [],
        status: { 
            type: String, 
            default: 'draft',
        },
        isPublished: { 
            type: Boolean, 
            default: false,
        },
        accessToken: {
            type: String,
        },
        scheduledFor: {
            type: Date,
        },
    }, { 
        versionKey: false, 
        timestamps: true,  
    }); 
    // The first option disables the automatic creation of the default  "_v" attribute representing "versionKey".
    // Timestamps will keep track of "Time of Creation" and "Time of Update".


    const Blog = mongoose.model("Blog", blogSchema);
    // console.log("Blog Post: ", Blog);
    return Blog;
};
