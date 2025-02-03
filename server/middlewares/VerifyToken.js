const jwt = require("jsonwebtoken");
const { secretKey } = process.env;




const verifyToken = (token) => {

    // const authHeader = req.headers['authorization'];
    // token = authHeader && authHeader.split(' ')[1]; // Get token from Bearer header    
    
    // const AuthHeader = req.headers.authorization;
    // if (!AuthHeader || !AuthHeader.startsWith('Bearer ')) {
    //     const responseData = { 
    //         success: false, 
    //         message: "Unauthorized",
    //     };
    //     console.log("Unauthorized token for Account Verification: ", responseData);
    //     return res.status(401).json(responseData);
    // };    
    // token = AuthHeader.split(" ")[1];

    if (token === null) {        
        const responseData = { 
            success: false,
            message: 'No token provided' 
        };
        return res.status(401).json(responseData);
    };

    return jwt.verify(token, secretKey);
};

module.exports = verifyToken;