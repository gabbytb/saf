module.exports = mongoose => {


    var productSchema = new mongoose.Schema({
        _id : {
            type: Number,
        },
        title: {
            type: String,
            required: true,
            unique: true,
        },
        description: {
            type: String,
        },
        excerpt: {
            type: String,
        },
        images: [
            { 
                _id: Number,
                url: String,
                featured: Boolean,
                createdAt: Date,
                updatedAt: Date,
            }
        ],
        unit: {
            type: String,
        },
        price: {
            type: Number,
        },
        location: {
            type: String,
        },
        author: {
            type: String,
        },
        isActive: {
            type: Boolean,
        },
    }, { timestamps: true, versionKey: false });

    
    const Product = mongoose.model("Product", productSchema);
    return Product;

};















// images: [
//     { 
//         _id: {
//             type: Number
//         },
//         url:  {
//             type: String,
//         },
//         featured: {
//             type: Boolean
//         },
//         createdAt: {
//             type: Date,
//         },
//         updatedAt: {
//             type: Date,
//         },
//     }
// ],