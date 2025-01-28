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
const ip = process.env.BASE_URL || "0.0.0.0",
      CSPort = 3000,
      port = process.env.PORT || CSPort;

////////////////////////////////////////////////////////////////////////////////////////////////////////////
// =======================================================================================================//
// 1. SERVER  ======================================================================================//
// =======================================================================================================//
////////////////////////////////////////////////////////////////////////////////////////////////////////////
const app = express();

// Load certificate and key
const certificate = fs.readFileSync('./cert/localhost.pem', 'utf8');
const privateKey = fs.readFileSync('./cert/localhost-key.pem', 'utf8');

const credentials = { key: privateKey, cert: certificate };

// const credentials = {
//     key: fs.readFileSync('/etc/letsencrypt/live/your-domain/privkey.pem'),
//     cert: fs.readFileSync('/etc/letsencrypt/live/your-domain/cert.pem'),
// };
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////////
// =======================================================================================================//
// 2. MIDDLEWARES  =======================================================================================//
// =======================================================================================================//
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Enable: CORS (CROSS ORIGIN RESOURCE SHARING) for all routes
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SET THE URL OF THE FRONTEND HERE (i.e Web Browser url = http://localhost:3000)
// const corsOptions = {
//     origin: 'http://192.168.138.113:3000',
//     methods: 'GET, POST, PUT, DELETE',  // Specify which methods are allowed
//     allowedHeaders: 'Content-Type, Authorization', // Specify which headers are allowed
//     credentials: true,  // Allows cookies and access-control-allow-credentials to be sent with the request
// };
// Your list of allowed origins (domains)
// const allowedOrigins = [
//     "https://samuelakinolafoundation.netlify.app", // Allow production frontend on Netlify / Allow the frontend domain
//     "https://localhost:3000",  // Allow local React app
//     "https://192.168.234.113:3000",  // Allow local network access if needed
// ];

// // Configure CORS options
// const corsOptions = {
//     origin: (origin, callback) => {
//         // If the origin is in allowedOrigins or it's empty (e.g. Postman, or curl), allow the request
//         if (allowedOrigins.includes(origin) || !origin) {  // origin can be null for Postman or CURL requests
//             callback(null, true);  // Allow the request
//         } else {
//             callback(new Error('Not allowed by CORS'));  // Block the request if origin isn't allowed
//         };
//     },
//     methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific HTTP methods
//     allowedHeaders: ['Content-Type', 'Authorization'], // Allow headers for requests
//     credentials: true,  // Don't pass cookies by default
    
//     // Setting the withCredentials option to true
//     // axios.get('https://your-api-url.com/endpoint', {
//     //     withCredentials: true  // Tells Axios to send cookies along with the request
//     // })
  
// };

// CORS configuration for accepting credentials
const corsOptions = {
    origin: 'https://samuelakinolafoundation.netlify.app', // Your frontend domain (this is crucial)
    methods: ['GET', 'POST'], // Allowed methods, adjust as necessary
    credentials: true, // Allow credentials (cookies, Authorization headers, etc.)
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers for requests
};
// Apply CORS settings to the Express app
// Now your Express server will allow requests from these three locations and respond without CORS issues.
app.use(cors(corsOptions));

// Handle preflight CORS request
// app.options('*', cors(corsOptions));
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// express.json():-  Will add a body property to the request or req object. 
// - This includes the request body's parsed JSON data. 
 app.use(express.json({ limit: "50mb" , extended: true }));      // for parsing application/json
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// NOTE:- req.body in your route handler function will allow you to access this data.
app.use(express.urlencoded({ limit: "50mb", extended: true }));
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Serve static files from the React app (build folder)
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// USE IF:-  client directory is inside server directory.
// const buildPath = path.join(__dirname, 'client/build')
// - OR -
// USE IF:-  client directory and server directory are seperate.
const buildPath = path.join(__dirname, '..', 'client', 'build');
////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.use(express.static(buildPath));
app.use((req, res, next) => {
    console.log('Request received:', req.method, req.url);
    console.log('Request headers:', req.headers);
    next();
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
// 4. BACKEND API ROUTES
////////////////////////////////////////////////////////////////////////////////////////////////////////////
require("./routes/user.routes")(app);
require("./routes/role.routes")(app);
require("./routes/blog.routes")(app);
require("./routes/donation.route")(app);
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 5. Serve the index.html for all API routes
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// The app.get('*') route ensures that any request 
// (including non-existent paths like /about or /contact) 
// will serve the index.html file, 
// allowing React’s client-side router to take over.
app.get('*', (req, res) => {
   res.sendFile(buildPath, 'index.html');
});
// app.options("/", (req, res) => {
//     res.setHeader("Access-Control-Allow-Origin", "https://679748336c295d17464a00e7--samuelakinolafoundation.netlify.app");
//     res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
//     res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//     res.sendStatus(204);
// });
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
// 8) Database Connection
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// const db = require("./models");
//
//
// db.mongoose.connect(db.url)
// .then(() => {
//     console.log(`ACTIVE DB: ${DB_URI}`);
// })
// .catch((err) => {
//     console.log("************ ERROR WITH DATABASE CONNECTION ************")
//     console.log(`Cannot connect to the database: ${err}`);
//     process.exit();
// });
//
//
// let server = app.listen(PORT, () => {
//     const port = server.address().port;
//     console.log(`Listening on: ${port}`);
// });
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////