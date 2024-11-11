module.exports = mongoose => {

    const { Schema } = mongoose;

    var imageSchema = new Schema({
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
        id: {
            type: Number,    
              
        },
    }, { versionKey: false, timestamps: true });



    const Image = mongoose.model('Image', imageSchema);
    
    return Image;

};