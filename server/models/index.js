const mongoose = require("mongoose");
mongoose.Promise = global.Promise;


const dataBase = require("../config/db.js");

const db = {
};


db.mongoose = mongoose;
db.url = dataBase.url;


db.users = require("./user.model.js")(mongoose);
db.socials = require("./social.model.js")(mongoose);
db.roles = require("./role.model.js")(mongoose);
db.activities = require("./activity.model.js")(mongoose);
db.blogs = require("./blog.model.js")(mongoose);
db.donations = require("./donation.model.js")(mongoose);
db.images = require("./image.model.js")(mongoose);

module.exports = db;