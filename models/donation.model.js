module.exports = mongoose => {
       
    const { Schema } = mongoose;

    const donationSchema = new Schema({
        _id: {
            type: Number
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
        tags: [],
        categories: [],
        amountToRaise: { 
            type: String,
        },
        amountRaised: { 
            type: String,
        },    
        author: [
            { 
                _id: { 
                    type: Number,                   
                },
                name: {                    
                    type: String,
                    default: 'anonymous',
                }, 
                email: { 
                    type: String,
                }, 
                bio: { 
                    type: String,
                },             
            },
        ],
        donor: [
            { 
                _id: { 
                    type: Number,                   
                },
                firstName: {                    
                    type: String,
                    default: 'anonymous',
                }, 
                lastName: {                    
                    type: String,                    
                }, 
                email: { 
                    type: String,
                },
                phone: { 
                    type: Number,
                }, 
                company: { 
                    type: String,
                },
                amount: { 
                    type: String,
                },
                comments: { 
                    type: String,
                },       
            },
        ],
        status: { 
            type: String, 
            default: 'draft',
        },
        isActive: { 
            type: Boolean, 
            default: false,
        },
    });

    const Donations = mongoose.model("Donation", donationSchema);

    return Donations;

};
