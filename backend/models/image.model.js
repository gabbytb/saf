module.exports = mongoose => {

    const { Schema } = mongoose;

    var imageSchema = new Schema({
        _id: {
            type: Number,              
        },
        url: { 
            type: String,        
        },
        alt: { 
            type: String 
        },
        featured: { 
            type: Boolean, 
            default: false 
        },
    }, { versionKey: false, timestamps: true });

    const Image = mongoose.model('Image', imageSchema);
    return Image;
    
};