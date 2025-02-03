const jwt = require("jsonwebtoken");
const { secretkey, expiresInTwoDays } = process.env || '!MalcomXbox360!';   // 32 bytes for AES-256;


// Generate a JWT Using HS256:
module.exports = (userId, userEmail) => {
    
    // Create a payload
    const payload = {
        id: userId,
        email: userEmail,
    };

    return jwt.sign(payload, secretkey, { 
                                            algorithm: 'HS256', 
                                            expiresIn: expiresInTwoDays 
                                        });
};