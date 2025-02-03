const jwt = require("jsonwebtoken");
// FOR JWT: Replace with a secure, secret key.
const secretKey =  process.env.secretKey || '!wasinvincibleallalongtheydunno!';   // 32 bytes for AES-256;;
const expiresInThreeDays =  process.env.expiresInOneDay || 'UthoughtyouwasinvincibleallalongIkn!';   // 32 bytes for AES-256;;


// Generate a JWT Using HS256:
const assignThreeDaysToken = (userId) => {

    // Create a payload
    const payload = {
        id: userId,
        // email: email,  // Optional: Include only if needed
    };    
    return jwt.sign(payload, secretKey, { algorithm: 'HS256', expiresIn: expiresInThreeDays }); 
};
module.exports = assignThreeDaysToken;