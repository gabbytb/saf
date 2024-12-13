const express = require("express");
const path = require('path');
const cors = require("cors");
// const corsOptions = {        
//     origin: ["http://127.0.0.1:3000"],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
// };
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load environment variables from .env file.
dotenv.config();

////////////////////////////////////////////////////////////////////////////////////////////////////////////
// =======================================================================================================//
// 1. START SERVER  ======================================================================================//
// =======================================================================================================//
////////////////////////////////////////////////////////////////////////////////////////////////////////////
const app = express();

const ip = process.env.IP || "0.0.0.419";
const port = process.env.PORT || 9080;
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////




////////////////////////////////////////////////////////////////////////////////////////////////////////////
// =======================================================================================================//
// 2. MIDDLEWARES  =======================================================================================//
// =======================================================================================================//
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Enable: CORS (CROSS ORIGIN RESOURCE SHARING) for all routes
////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.use(cors());
////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.use(express.json({ limit: "50mb" , extended: true }));      // for parsing application/json
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// express.json():-  Will add a body property to the request or req object. 
// - This includes the request body's parsed JSON data. 
// NOTE:- req.body in your route handler function will allow you to access this data.
app.use(express.urlencoded({ limit: "50mb", extended: true }));
// Serve static files from the React app (build folder)
app.use(express.static(path.join(__dirname, 'client/build')));
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////




////////////////////////////////////////////////////////////////////////////////////////////////////////////
// =======================================================================================================//
// 3. DATABASE CONFIG  =============================================================================//
// =======================================================================================================//
////////////////////////////////////////////////////////////////////////////////////////////////////////////
const db = require("./models");
const authSource = db.url;
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//   CLOUD CONFIG.
const username = process.env.MONGO_DB_USERNAME || "userName";
const authbinder = process.env.MONGO_DB_PLANNER || "serverAuthBinder";
const pswd = process.env.MONGO_DB_PASSWORD || "usersPass";
const host = process.env.MONGO_DB_HOST || "serverHost";
const defaultauthdb = process.env.MONGO_DB_CLOUD_DATABASE || "serverAuthDatabase";

//   SELECT CLOUD
const mongoURI = authSource + username + authbinder + pswd + host + defaultauthdb || `mongodb+srv://${username}:${password}@safdb.93th1.mongodb.net/?retryWrites=true&w=majority`;
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//   LOCAL CONFIG.
// const defaultauthdb = process.env.MONGO_DB_DATABASE || "localDatabase";

//   SELECT LOCAL
// const mongoURI =  authSource + defaultauthdb || `mongodb+srv://${username}:${password}@safdb.93th1.mongodb.net/?retryWrites=true&w=majority`;
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////




////////////////////////////////////////////////////////////////////////////////////////////////////////////
// =======================================================================================================//
// 4. DATABASE CONNECTION  ===========================================================================//
// =======================================================================================================//
////////////////////////////////////////////////////////////////////////////////////////////////////////////
let _DB;

//   OPTIONS for Mongoose
//   &retryWrites=true: Automatically retries write operations if they fail due to temporary network issues or other transient problems.
//   &w=majority: Ensures that the write operations are confirmed by the majority of the nodes in the database replica set, making sure the data is safely written.
//   &serverSelectionTimeoutMS: Time (in milliseconds) before Mongoose throws an error if it can't connect to any server.
//   &socketTimeoutMS: The maximum time for a socket to wait before throwing a timeout error (useful if you expect to have slow connections).
//   &autoIndex: Whether to automatically build indexes for your collections. By default, this is true in Mongoose, but you can set it to false if you want to manually manage indexes.
const options = {
    // keepAlive: true,
    // keepAliveInitialDelay: 30000,  // 30 seconds delay for keep-alive
    retryWrites: true,
    w: 'majority',  // Ensures the write concern is majority
    serverSelectionTimeoutMS: 45000, // Default 5/45-second timeout if the connection fails
    socketTimeoutMS: 60000, // Default 45/60-second timeout for socket operations
    autoIndex: false,

    // ssl: true,
    // tls: true
};

mongoose.set("strictQuery", false);
mongoose.connect(mongoURI, options)
.then(client => {
    _DB = client; // you can also use this "client.db();"
    console.log("************************************************",
        "\n*********     DATABASE CONNECTION     **********",
        `\n************************************************`,    
        `\n\nCONNECTED TO DATABASE: ${authSource}${defaultauthdb}\n`);
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    // 6. SERVER:-  Port
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Start the server only after successful DB connection
    let server = app.listen(port, ip, () => {
        let port = server.address().port;
        let family = server.address().family;
           
        console.log("************************************************",
                    "\n*********      BACKEND CONNECTION      *********",
                    `\n************************************************`,              
                    `\n\nSERVER IP ADDRESS: http://${ip}:${port}`,
                    `\nINTERNET PROTOCOL: ${family}\n`,
                    "\n************************************************",
                    "\n************************************************\n\n");   
    });  
})
.catch(err => console.error(err));        
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////




////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 5. API ROUTES
////////////////////////////////////////////////////////////////////////////////////////////////////////////
require("./routes/user.routes")(app);
require("./routes/role.routes")(app);
require("./routes/blog.routes")(app);
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Serve React app for all API routes
////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});
// ['*', '/']
// '*'
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////



















// ************************************************** //
// 2) This is CORS-enabled for a Single Route!
// ************************************************** //
// app.get("/products/:id", cors(), function (req, res, next) {
//     res.json({ msg: 'This is CORS-enabled for a Single Route!' });
// });
// ***************************************************//
// ************************************************** //


// ************************************************** //
// 3) This is CORS-enabled for a particular origin!
// ************************************************** //
// var corsOptions = {
//     origin: 'http://127.0.0.1:5000',
// }
// app.use(cors(corsOptions));  
// app.get("/products/:id", cors(corsOptions), function (req, res, next) {
//     res.json({ msg: 'This is CORS-enabled for a Single Route!' });
// });
// var corsOptionz = {
//     origin: "http://127.0.0.1:8000",
// }
// app.use(cors(corsOptionz));
// ***************************************************//
// ************************************************** //


////////////////////////////////////////////////////////////////////////////////////////////////////////////
// =======================================================================================================//
// OLD DATABASE CONNECTION  ===============================================================================//
// =======================================================================================================//
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// const DB_Local_Connection = require("./config/dbLocalConfig");
// const DB_Server_Connection = require("./config/dbServerConfig");
//
// DB_Local_Connection();
// DB_Server_Connection(USERNAME, PASSWORD);


////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Serve uploaded files statically
// app.use('/uploads', express.static('uploads'));
//
// app.use(express.static("public"))
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// =======================================================================================================//
// END OF MIDDLEWARES ====================================================================================//
// =======================================================================================================//
////////////////////////////////////////////////////////////////////////////////////////////////////////////


// const db = require("./models");
// db.mongoose.connect(db.url)
// .then(() => {
//     console.log(`ACTIVE DB: ${DB_URI}`);
// })
// .catch((err) => {
//     console.log("************ ERROR WITH DATABASE CONNECTION ************")
//     console.log(`Cannot connect to the database: ${err}`);
//     process.exit();
// });


// let server = app.listen(PORT, () => {
//     const port = server.address().port;
//     console.log(`Listening on: ${port}`);
// });