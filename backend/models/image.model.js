module.exports = mongoose => {
    

    var imageSchema = new mongoose.Schema({
        _id : {
            type: Number,
        },
        url: {
            type: String,
        },
        featured: {
            type: Boolean,
            // required: true,
        },
    }, { versionKey: false, timestamps: true, });

    
    const Image = mongoose.model("Image", imageSchema);
    return Image;

};