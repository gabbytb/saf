const https = require('https');
const fs = require('fs');
// const serverless = require('serverless-http');
const path = require("path");
const cors = require("cors");
const express = require("express");
// Load environment variables from .env file.
const dotenv = require("dotenv");
dotenv.config();    // or require("dotenv").config();
// Environment variables
const ip = process.env.BASE_URI || "0.0.0.0",      
      CSPort = 3000,
      port = process.env.PORT || CSPort;



    


////////////////////////////////////////////////////////////////////////////////////////////////////////////
// =======================================================================================================//
// 1. HTTPS SERVER  ======================================================================================//
// =======================================================================================================//
////////////////////////////////////////////////////////////////////////////////////////////////////////////
const app = express();

// DEFAULT LOCAL:-  Load SSL certificates
// const certificate = fs.readFileSync("cert/localhost.pem", "utf8");
// const privateKey = fs.readFileSync("cert/localhost-key.pem", "utf8");

// MKCERT:-  Load SSL certificates
const certificate = fs.readFileSync("ssl/localhost+2.pem");
const privateKey = fs.readFileSync("ssl/localhost+2-key.pem");

const credentials = { 
    key: privateKey,
    cert: certificate
};


// OpenSSL:- Load certificate and key
// Set up paths to the certificate files
// const sslCertPath = path.join(__dirname, './cert/server.crt');  // Path to your .crt file
// const sslKeyPath = path.join(__dirname, './cert/server.key');   // Path to your .key file

// SSL options for the Express HTTPS server
// const credentials = {
//     key: fs.readFileSync(sslKeyPath),   // Read the private key
//     cert: fs.readFileSync(sslCertPath), // Read the certificate file
// };
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////




////////////////////////////////////////////////////////////////////////////////////////////////////////////
// =======================================================================================================//
// 2. MIDDLEWARES  =======================================================================================//
// =======================================================================================================//
// Middleware to set headers globally
app.use((req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    next();
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Enable: CORS (CROSS ORIGIN RESOURCE SHARING) for all routes
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DEVELOPMENT: Your list of allowed origins (domains) (i.e https://samuelakinolafoundation.netlify.app).
const allowedOrigins = [
    "https://samuelakinolafoundation.netlify.app", // Allow production frontend on Netlify / Allow the frontend domain
    
    "https://localhost:3000",  // Allow local React app
    "https://192.168.238.113:3000",  // Allow local network access if needed

    "http://localhost:8888",  // Allow local React app
    "http://192.168.238.113:8888",  // Allow local network access if needed   
];
// Configure CORS options
const corsOptions = {
    origin: (origin, callback) => {
        // If the origin is in allowedOrigins or it's empty (e.g. Postman, or curl), allow the request
        if (allowedOrigins.includes(origin) || !origin) {  // origin can be null for Postman or CURL requests
            callback(null, true);  // Allow the request
        } else {
            callback(new Error('Not allowed by CORS'));  // Block the request if origin isn't allowed
        };
    },
    // methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific HTTP methods    
    // credentials: true, // CORS configuration for accepting credentials (cookies, Authorization headers, etc.)
    // allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers for requests
    // allowedHeaders: ["Content-Type", "x-api-key"], // Specify which headers are allowed

   
    // Setting the withCredentials option to true
    // axios.get('https://your-api-url.com/endpoint', {
    //     withCredentials: true  // Tells Axios to send cookies along with the request
    // })  
};
// Apply CORS settings to the Express app:- Now your Express server will allow requests from these three locations and respond without CORS issues.
app.use(cors(corsOptions));


// PRODUCTION: Allow all origins
// app.use(cors({
//     origin: '*', // Allow all origins
//     methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific HTTP methods
//     credentials: false,
// }));


// Handle preflight CORS request
// app.options('*', cors(corsOptions));
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// express.json():-  Will add a body property to the request or req object. 
// NOTE:- This includes the request body's parsed JSON data. 
app.use(express.json({ limit: "50mb" , extended: true }));      // for parsing application/json
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// NOTE:- req.body in your route handler function will allow you to access this data.
app.use(express.urlencoded({ limit: "50mb", extended: true }));
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Serve static files from the React app (build folder)
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// USE IF:-  client directory is inside server directory.
const buildPath = path.join(__dirname, 'client/build')
// - OR -
// USE IF:-  client directory and server directory are both inside the root/project directory.
// const buildPath = path.join(__dirname, '..', 'client', 'build');
app.use(express.static(buildPath));
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Serve the index.html for all API routes
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// The app.get('*') route ensures that any request will serve the index.html file, allowing React’s client-side router to take over.
app.get('*', (req, res) => {
    res.sendFile(buildPath, 'index.html');
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// =======================================================================================================//
// END OF MIDDLEWARES ====================================================================================//
// =======================================================================================================//
////////////////////////////////////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////////////////////////////////////
// =======================================================================================================//
// 3. DATABASE CONNECTION  ===============================================================================//
// =======================================================================================================//
////////////////////////////////////////////////////////////////////////////////////////////////////////////
const LaunchCloudDBConnection = require("./config/dbServerConfig");
LaunchCloudDBConnection(https, credentials, app, ip, port);

// const LaunchLocalDBConnection = require("./config/dbLocalConfig");
// LaunchLocalDBConnection(app, ip, port);
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 5. BACKEND API ROUTES
////////////////////////////////////////////////////////////////////////////////////////////////////////////
require("./routes/user.routes")(app);
require("./routes/role.routes")(app);
require("./routes/blog.routes")(app);
require("./routes/donation.route")(app);
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 6. Export Express app as a Netlify function
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// module.exports.handler = serverless(app); // Make the express app serverless
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 6) This is CORS-enabled for a particular origin!
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// var corsOptions = {
//     origin: 'http://127.0.0.1:8000',
// };
// app.use(cors(corsOptions));  
// app.use(express.static("public"));
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 7) This is CORS-enabled for a Single Route!
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// // app.get("/products/:id", cors(), function (req, res, next) {
//     res.json({ msg: 'This is CORS-enabled for a Single Route!' });
// });
//
// app.get("/products/:id", cors(corsOptions), function (req, res, next) {
//     res.json({ msg: 'This is CORS-enabled for a Single Route!' });
// });
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////