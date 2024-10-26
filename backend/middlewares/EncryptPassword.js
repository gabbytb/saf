const bcrypt = require("bcrypt");



const encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync());
};


module.exports = encryptPassword;
