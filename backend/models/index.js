const brandDB = require("../config/db.js");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;


const db = {};
db.mongoose = mongoose;
db.url = brandDB.url;


db.users = require("./user.model.js")(mongoose);
db.roles = require("./role.model.js")(mongoose);
db.blogs = require("./blog.model.js")(mongoose);
db.products = require("./product.model.js")(mongoose);
db.images = require("./image.model.js")(mongoose);


module.exports = db;