module.exports = mongoose => {

    const Schema = mongoose.Schema;

    const socialSchema = new Schema({
        _id: {
            type: Number,
        },
        fb: {
            type: String,
        },
        xr: {
            type: String,
        },
        ig: {
            type: String,
        },
        pn: {
            type: String,
        },
        wh: {
            type: String,
        },
        tk: {
            type: String,
        },
        tg: {
            type: String,
        },
        yt: {
            type: String,
        }, 
    }, { 
        versionKey: false, 
        timestamps: true, 
    });

    const Social = mongoose.model("Social", socialSchema);
    return Social;

};