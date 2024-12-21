const mongoose = require('mongoose');
const Schema = mongoose.Schema;







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
    donor: [
        {
            contribution: Number,
            userName: { 
                type: String, 
                default: 'anonymous',
            },         
            company: String,        
            email: String,
            Phone: Number,
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
})
const donations = new mongoose.Model('donations', donationSchema);



module.exports = donations;