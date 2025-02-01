const allowedOrigins = require("./allowedOrigins");



// Configure CORS options
// const corsOptions = {

//     origin: (origin, callback) => {
//         // If the origin is in allowedOrigins or it's empty (e.g. Postman, or curl), allow the request
//         if (allowedOrigins.includes(origin) || !origin) {  // origin can be null for Postman or CURL requests
//             callback(null, true);  // Allow the request
//         } else {
//             callback(new Error('Not allowed by CORS'));  // Block the request if origin isn't allowed
//         };
//     },

//     // methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific HTTP methods    
//     // credentials: true, // CORS configuration for accepting credentials (cookies, Authorization headers, etc.)
//     // allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers for requests
//     // allowedHeaders: ["Content-Type", "x-api-key"], // Specify which headers are allowed
// };



// Configure CORS options
const corsOptions = {

    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        };
    },
    credentials: true,
    optionsSuccessStatus: 200

};

module.exports = corsOptions;