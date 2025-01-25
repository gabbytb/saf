// // Middleware function to check for Token in Cookies if it is associated with USER RECORD in Database
// const db = require("../models");
// const User = db.users;
// require("dotenv").config();
// const jwt = require("jsonwebtoken");
// const { secretKey } = process.env;





// module.exports.userVerification = (req, res) => {

//     const token = req.cookies.token
//     if (!token) {
//         return res.json({ success: false, message: "Invalid token" })
//     };

//     jwt.verify(token, secretKey, async (err, data) => {
//         if (err) {
//             return res.json({ success: false })
//         } else {
//             const _id = data._id
//             const user = await User.findById(_id)
//             if (user) { 
//                 return res.json({ success: true, data: user.email, message: "Token verified" })
//             } else {
//                 return res.json({ success: false, message: "Invalid token" })
//             }
//         }
//     });
// }