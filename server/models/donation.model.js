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
            type: Number,
        },
        amountRaised: { 
            type: Number,
        },        
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
        contributors: [
            {     
                _id: { 
                    type: Number,                   
                },
                comment: { 
                    type: String,
                }, 
                firstName: {                    
                    type: String,
                    // default: 'anonymous',
                }, 
                lastName: { 
                    type: String,
                }, 
                email: { 
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
                    // default: 'anonymous',
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
                amountDonated: { 
                    type: Number, // The donation amount                   
                },
                comments: { 
                    type: String,                    
                },      
                donationMethod: {
                    type: String, // How the donation was made (credit card, PayPal, etc.)     
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
    }, { 
        versionKey: false, 
        timestamps: true,  
    }); 

    const Donation = mongoose.model("Donation", donationSchema);
    
    return Donation;

};