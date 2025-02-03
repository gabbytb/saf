module.exports = mongoose => {
       
    const { Schema } = mongoose;

    var blogSchema = new Schema({
        _id: {
            type: Number,
        },
        images: [
            { 
                _id: { 
                    type: Number,                   
                },
                url: { 
                    type: String,
                }, 
                featured: { 
                    type: Boolean,
                }, 
                createdAt: { 
                    type: Date,
                },
                updatedAt: { 
                    type: Date,
                },
            },
        ],
        title: {
            type: String,
            unique: true,
            // default: 'anonymous',
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
                _id: { 
                    type: Number,                   
                },
                comment: { 
                    type: String,
                }, 
                firstName: {                    
                    type: String,                    
                }, 
                lastName: { 
                    type: String,
                }, 
                email: { 
                    type: String,
                },  
            },
        ],
        author: [
            { 
                _id: { 
                    type: Number,                   
                },
                img: {
                    type: String,
                },
                name: {                    
                    type: String,
                }, 
                email: { 
                    type: String,
                }, 
                bio: { 
                    type: String,
                },             
            },
        ],
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
        // scheduledFor: {
        //     type: Date,
        // },
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
