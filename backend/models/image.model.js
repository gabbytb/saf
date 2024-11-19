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
    // The first option disables the automatic creation of the default  "_v" attribute representing "versionKey".
    // Timestamps will keep track of "Time of Creation" and "Time of Update".

    const Image = mongoose.model('Image', imageSchema);
    return Image;    
};