const jwt = require("jsonwebtoken");
const { secretKey } = process.env;


const verifyToken = (token) => {
    
    // return jwt.verify(token, secretKey);

    // const authHeader = req.headers['authorization'];
    // token = authHeader && authHeader.split(' ')[1]; // Get token from Bearer header
    
    if (token === null) {
        const responseData = {
            success: false,
            message: "Invalid token",
        };
        res.sendStatus(401); // No token provided
        return res.json(responseData);
    };

    return jwt.verify(token, secretKey);

};

module.exports = verifyToken;