const db = require("../models");
const User = db.users;


const verifyToken = require("./VerifyToken");




// Middleware to check for valid token
module.exports = async (req, res, next) => {

    const token = req.query.token;

    try {

        const decodedData = await verifyToken(token);
        
        // Fetch user data based on decoded id;
        const _id = decodedData.id;
        const existingUser = await User.findById(_id);

        try {
                        
            const dataToUpdate = {           
                accessToken: token,
                status: "approved",
                isVerified: true,     
            };

            // Step 2: If user exists, find User by Email - using 'findOneAndUpdate' will save user data automatically.
            const verifiedUser = await User.findOneAndUpdate({ email: existingUser.email }, dataToUpdate, { new: true });                   
            
            // Send a clean response without sensitive information
            const newUser = {
                id: verifiedUser._id,
                firstname: verifiedUser.firstName,
                lastname: verifiedUser.lastName,
                email: verifiedUser.email,
                status: verifiedUser.status,
                isverified: verifiedUser.isVerified,
                acesstoken: verifiedUser.accessToken,
            };        
            const responseData = {
                success: true,
                data: newUser,
                message: "successful",
            };
            console.log("*********************************************************",
                "\n*****           NEW ACCOUNT VERIFICATION             ****",
                "\n*********************************************************",
                "\nVERIFIED USER: ", responseData,
                "\n*********************************************************",
                "\n*********************************************************\n\n");                                
            
            req.user = responseData;
            next(); // Continue to the next middleware or route

        } catch (error) {
            const responseData = { 
                success: false, 
                message: "Invalid account",
                error: error.message,
            };
            console.error("VERIFIED USER: ", responseData, "\n");
            return res.status(500).json(responseData);
        };

    } catch (error) {
        if (error.name === 'TokenExpiredError') {           
            const responseData = { 
                success: false, 
                message: "Token has expired",
                error: error.message,
            };
            console.error("TokenExpiredError: ", responseData, "\n");
            res.redirect(302, "/user/signup");
            // return res.status(401).json(responseData);
        } else if (error.name === 'JsonWebTokenError') {         
            const responseData = { 
                success: false, 
                message: "Token does not exist",
                error: error.message,
            };
            console.error("JsonWebTokenError: ", responseData, "\n");
            res.redirect(302, "/user/signup");
            // return res.status(404).json(responseData);
        } else if (error.name === 'MongoServerError') {           
            const responseData = { 
                success: false, 
                message: "Mulitple User entry",
                error: error.message,
            };
            console.error("MongoServerError-Mulitple User entry: ", responseData, "\n");
            res.redirect(302, "/user/signup");
            // return res.status(207).json(responseData);
        } else {
            const responseData = { 
                success: false, 
                message: "Token is missing or invalid",
                error: error.message,
            };
            console.error("Token Verification: ", responseData, "\n");
            res.redirect(302, "/user/signup");
            // return res.status(404).json(responseData);
        };
    };
};






// Middleware to check for valid token
// module.exports = async (req, res, next) => {

//     // const authHeader = req.headers['authorization'];
//     // const token = authHeader && authHeader.split(' ')[1]; // Get token from Bearer header

//     // if (token === null) return res.sendStatus(401); // No token provided
//     const token = req.query.token;

//     try {

//         await jwt.verify(token, secretkey, async (err, decodedData) => {
//             if (err) return res.sendStatus(403); // Token invalid
    
//             // Fetch user data based on decoded email
//             const _id = decodedData.id;
//             const existingUser = await User.findById(_id);

//             try {
                            
//                 const dataToUpdate = {           
//                     accessToken: token,
//                     status: "approved",
//                     isVerified: true,     
//                 };

//                 // Step 2: If user exists, find User by Email - using 'findOneAndUpdate' will save user data automatically.
//                 const verifiedUser = await User.findOneAndUpdate({ email: existingUser.email }, dataToUpdate, { new: true });                   
                
//                 // Send a clean response without sensitive information
//                 const newUser = {
//                     id: verifiedUser._id,
//                     firstname: verifiedUser.firstName,
//                     lastname: verifiedUser.lastName,
//                     email: verifiedUser.email,
//                     status: verifiedUser.status,
//                     isverified: verifiedUser.isVerified,
//                     acesstoken: verifiedUser.accessToken,
//                 };        
//                 const responseData = {
//                     success: true,
//                     data: newUser,
//                     message: "Verification successful",
//                 };
//                 console.log("*********************************************************",
//                     "\n*****           NEW ACCOUNT VERIFICATION             ****",
//                     "\n*********************************************************",
//                     "\nVERIFIED USER: ", responseData,
//                     "\n*********************************************************",
//                     "\n*********************************************************\n\n");                                

//                 next(); // Continue to the next middleware or route

//             } catch (error) {
//                 const responseData = { 
//                     success: false, 
//                     message: "Invalid account",
//                     error: error.message,
//                 };
//                 console.error("VERIFIED USER: ", responseData, "\n");
//                 return res.status(500).json(responseData);
//             };
//         });
        
//     } catch (error) {
//         if (error.name === 'TokenExpiredError') {           
//             const responseData = { 
//                 success: false, 
//                 message: "Token has expired",
//                 error: error.message,
//             };
//             console.error("TokenExpiredError:- Token verification status: ", responseData, "\n");
//             return res.status(401).json(responseData);
//         } else if (error.name === 'JsonWebTokenError') {         
//             const responseData = { 
//                 success: false, 
//                 message: "Token does not exist",
//                 error: error.message,
//             };
//             console.error("JsonWebTokenError:- Token verification status: ", responseData, "\n");
//             return res.status(404).json(responseData);
//         } else if (error.name === 'MongoServerError') {           
//             const responseData = { 
//                 success: false, 
//                 message: "Mulitple User entry",
//                 error: error.message,
//             };
//             console.error("MongoServerError-Mulitple User entry:- Token verification status: ", responseData, "\n");
//             return res.status(207).json(responseData);
//         } else {
//             const responseData = { 
//                 success: false, 
//                 message: "Token is missing or invalid",
//                 error: error.message,
//             };
//             console.error("Token Verification: ", responseData, "\n");
//             return res.status(404).json(responseData);
//         };
//     };
// };
