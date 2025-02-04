// require('express-async-errors');
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require("path");
const cors = require("cors");
const express = require("express");

const corsOptions = require("./config/corsOptions");

const configureUserRoutes = require("./routes/user.routes");
const configureRoleRoutes = require("./routes/role.routes");
const configureBlogRoutes = require("./routes/blog.routes");
const configureDonationRoutes = require("./routes/donation.route");

// .env Config
require("dotenv").config();

// Load Environment variables
const ip = process.env.BASE_URI || "0.0.0.0",      
      gip = process.env.GLOBAL_URI || "0.0.0.0",
      CSPort = 9419,
      HTTP_PORT = process.env.PORT_HTTP || CSPort,
      HTTPS_PORT = process.env.PORT_HTTPS || CSPort;
    



      
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// =======================================================================================================//
// 1. HTTPS SERVER  ======================================================================================//
// =======================================================================================================//
////////////////////////////////////////////////////////////////////////////////////////////////////////////
const app = express();


// MKCERT:-  Load SSL certificates 
// const sslKey = fs.readFileSync("localhost+2-key.pem", "utf-8");
// const sslCert = fs.readFileSync("localhost+2.pem", "utf-8");


// SSL options for the Express HTTPS server
// DEFAULT LOCAL:-  Load SSL certificates
const sslOptions = {
    key: fs.readFileSync("cert/localhost-key.pem", "utf-8"),
    cert: fs.readFileSync("cert/localhost.pem", "utf-8"),
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////




////////////////////////////////////////////////////////////////////////////////////////////////////////////
// =======================================================================================================//
// 2. MIDDLEWARES  =======================================================================================//
// =======================================================================================================//
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Enable: CORS (CROSS ORIGIN RESOURCE SHARING) for all routes
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DEVELOPMENT: 
// CORS Configuration
app.use(cors({
    origin: '*', // Allow all origins - Change in production
    credentials: true,
    // allowedHeaders: ['Authorization', 'Content-Type', 'X-Requested-With'],
    // methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],    // Allow specific HTTP methods
    // exposedHeaders: ['Authorization', 'Content-Length'],
}));

// PRODUCTION: Your list of allowed origins (domains) (i.e https://samuelakinolafoundation.netlify.app).
// Apply CORS settings to the Express app:- Now your Express server will allow requests from these three locations and respond without CORS issues.
// app.use(cors(corsOptions));

// Security Headers Middleware
// app.use((req, res, next) => {
//     res.header('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline';");
//     res.header('X-Content-Type-Options', 'nosniff');
//     res.header('X-Frame-Options', 'DENY');
//     res.header('X-XSS-Protection', '1; mode=block');
//     res.header('Referrer-Policy', 'strict-origin-when-cross-origin');
//     res.header('Permissions-Policy', 'geolocation=(self)');
//     next();
// });

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
// const buildPath = path.join(__dirname, 'client/build');
// - OR -
// USE IF:-  client directory and server directory are both inside the root/project directory.
const buildPath = path.join(__dirname, '..', 'client', 'build');
app.use(express.static(buildPath));




////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 3. BACKEND API ROUTES
////////////////////////////////////////////////////////////////////////////////////////////////////////////
configureUserRoutes(app);
configureRoleRoutes(app);
configureBlogRoutes(app);
configureDonationRoutes(app);
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////




////////////////////////////////////////////////////////////////////////////////////////////////////////////
// =======================================================================================================//
// 4. DATABASE CONNECTION  ===============================================================================//
// =======================================================================================================//
////////////////////////////////////////////////////////////////////////////////////////////////////////////
const LaunchCloudDBConnection = require("./config/dbServerConfig");
LaunchCloudDBConnection(http, https, sslOptions, app, gip, ip, HTTP_PORT, HTTPS_PORT);

// const LaunchLocalDBConnection = require("./config/dbLocalConfig");
// LaunchLocalDBConnection(http, https, sslOptions, app, gip, ip, HTTP_PORT, HTTPS_PORT);
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////




////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Serve the index.html for all API routes
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// The app.get('*') route ensures that any request will serve the index.html file, allowing React’s client-side router to take over.
app.get('/', (req, res) => {
    res.status(200).json({ message: "Hello World" });
});

app.get('/*', (req, res) => {
    res.sendFile(buildPath, 'index.html');
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// =======================================================================================================//
// END OF MIDDLEWARES ====================================================================================//
// =======================================================================================================//
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
