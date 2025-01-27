const express = require("express");
const serverless = require('serverless-http');
const path = require("path");
const cors = require("cors");
// Load environment variables from .env file.
const dotenv = require("dotenv");
dotenv.config();    // or require("dotenv").config();
// Environment variables
const ip = process.env.BASE_URL || "0.0.0.0",
      CSPort = 3000,
      port = process.env.PORT || CSPort;
const corsOptions = {
    origin: "https://67964cb165d323de7e4df4f4--superlative-crepe-cc644f.netlify.app/",    // Set origin of client-side IP 
    credentials: true,            // access-control-allow-credentials:true
    optionSuccessStatus: 200
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// =======================================================================================================//
// 1. SERVER  ======================================================================================//
// =======================================================================================================//
////////////////////////////////////////////////////////////////////////////////////////////////////////////
const app = express();
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////////
// =======================================================================================================//
// 2. MIDDLEWARES  =======================================================================================//
// =======================================================================================================//
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Enable: CORS (CROSS ORIGIN RESOURCE SHARING) for all routes
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Enable: CORS (CROSS ORIGIN RESOURCE SHARING) for all routes with corsOptions
app.use(cors(corsOptions));
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
LaunchCloudDBConnection(app, ip, port);

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
// (including non-existent paths 
// like /about or /contact) 
// will serve the index.html file, 
// allowing React’s client-side router to take over.
app.get(['*', 'https://67964cb165d323de7e4df4f4--superlative-crepe-cc644f.netlify.app/'], (req, res) => {
   res.sendFile(buildPath, 'index.html');
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 6. Export Express app as a Netlify function
////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports.handler = serverless(app);
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