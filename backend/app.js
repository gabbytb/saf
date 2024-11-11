const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

const ip = process.env.ip || "192.168.98.113";
const port = process.env.port || 98765;



////////////////////////////////////////////////////////////////////////////////////////////////////////////
// =======================================================================================================//
// DATABASE PROPS  ================================================================================//
// =======================================================================================================//
////////////////////////////////////////////////////////////////////////////////////////////////////////////
const db = require("./models");
const mongoConnType = db.url;

const username = process.env.MONGO_DB_USERNAME || "serverusername";
const DB_SC = process.env.MONGO_DB_SEPERATOR || "serverseperator";
const password = process.env.MONGO_DB_PASSWORD || "serverpassword";
const DB_PORT = process.env.MONGO_DB_PORT || "serverport";
const DB_NAME = process.env.MONGO_DB_DATABASE || "serverdatabase";

const DB_URI = mongoConnType + username + DB_SC + password + DB_PORT + DB_NAME || `mongodb+srv://${username}:${password}@safdb.71th1.mongodb.net/?retryWrites=true&w=majority`;



////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 1. SERVER INSTANCE
////////////////////////////////////////////////////////////////////////////////////////////////////////////
const app = express();



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
// =======================================================================================================//
// 2. MIDDLEWARES  =======================================================================================//
// =======================================================================================================//
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Enable: CORS (CROSS ORIGIN RESOURCE SHARING) for all routes
////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.use(cors());
////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.use(express.urlencoded({ limit: "50mb", extended: false }));
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// express.json():-  Will add a body property to the request or req object. 
// - This includes the request body's parsed JSON data. 
// NOTE:- req.body in your route handler function will allow you to access this data.
app.use(express.json({ limit: "50mb" , extended: true }));
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



////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 3. ROUTES:-  Home Page
////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get("/", (req, res) => {
    const responseData = {
        success: true,
        data: null,
        message: "App | Samuel Akinola Foundation"
    };
    return res.json(responseData);
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 4. IMPORT:-  ROUTES
////////////////////////////////////////////////////////////////////////////////////////////////////////////
require("./routes/user.routes")(app);
require("./routes/role.routes")(app);
require("./routes/blog.routes")(app);
////////////////////////////////////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 5. DATABASE:- Connection
////////////////////////////////////////////////////////////////////////////////////////////////////////////
let _DB;
mongoose.set("strictQuery", false);
mongoose.connect(DB_URI)
.then(client => {
    _DB = client; // you can also use this "client.db();"
    console.log("************************************************",
        "\n*********     DATABASE CONNECTION     **********",
        `\n************************************************`,
        `\n\nCONNECTED TO DATABASE: ${mongoConnType}${DB_NAME}\n`);

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