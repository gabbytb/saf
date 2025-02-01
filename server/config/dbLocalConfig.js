const LaunchLocalDBConnection = async (http, https, sslOptions, app, ip, port) => {    
    
    const mongoose = require("mongoose");    
    
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // =======================================================================================================//
    // 3. DATABASE CONFIG  ===================================================================================//
    // =======================================================================================================//
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const db = require("../models");
    const authSource = db.url;

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //   LOCAL CONFIG.
    const defaultauthdb = process.env.MONGO_DB_DATABASE || null;
    const defaultauthdbIP = process.env.MONGO_IP || null;
    //   SELECT LOCAL
    const mongoURI =  authSource + defaultauthdbIP + defaultauthdb || `mongodb+srv://${username}:${password}@safdb.93th1.mongodb.net/?retryWrites=true&w=majority`;
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // =======================================================================================================//
    // DATABASE CONNECTION  ==================================================================================//
    // =======================================================================================================//
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // let _DB;

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


    await mongoose.set("strictQuery", false);
    await mongoose.connect(mongoURI, options)
    .then(() => {
        let _DB = "***********/";
        // _DB = client; // you can also use this "client.db();"
        console.log("************************************************",
            "\n*********     DATABASE CONNECTION     **********",
            `\n************************************************`,    
            `\n\nCONNECTED TO DATABASE: ${authSource}${_DB}${defaultauthdb}\n`);
        
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////
        // 6. SERVER:-  Port
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // Start the server only after a successful DATABASE Connection
        const HTTPS_PORT = 443;

        // Redirect HTTP to HTTPS
        http.createServer((req, res) => {
            res.writeHead(301, { "Location": "https://" + req.headers.host + req.url });
            res.end();
        }).listen(port, () => {
            console.log(`Redirecting all HTTP requests to HTTPS`);
        });

        // Start HTTPS server
        const server = https.createServer(sslOptions, app).listen(HTTPS_PORT, () => {
            let port = server.address().port;
            let family = server.address().family;      
            
            if (ip === "https://samuelakinolafoundation.netlify.app" || ip === "https://samuelakinolafoundation.com") {
                console.log("************************************************",
                    "\n*********      BACKEND CONNECTION      *********",
                    `\n************************************************`,              
                    `\n\nSERVER IS RUNNING ON: ${ip}`,
                    `\nINTERNET PROTOCOL: ${family}\n`,
                    "\n************************************************",
                    "\n************************************************\n\n");
            } else {
                console.log("************************************************",
                        "\n*********      BACKEND CONNECTION      *********",
                        `\n************************************************`,              
                        `\n\nSERVER IS RUNNING ON: ${ip}:${port}`,    
                        `\nINTERNET PROTOCOL: ${family}\n`,
                        "\n************************************************",
                        "\n************************************************\n\n"); 
            };
        });
        
    })
    .catch((error) =>  {
        console.log('DATABASE ERROR: ', error.message,
            "\n*************************************************************************",
            "\nNOTE:  Server WON'T START UNLESS Connected to a Database [Cloud or Local]",
            "\n*************************************************************************");
    });        
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////


    // mongoose.connect(DB_URI)
    // .then(() => console.log("DATABASE:", db.url + "\n***********************************************\n***********************************************\n\n"))
    // .catch((err) => console.error(err));
    // db.mongoose.connection.on('connected', () => {
    //     console.log("DATABASE:", db.url);
    // });
    // db.mongoose.connection.on('open', () => console.log('CONNECTION: Open\n***********************************************\n***********************************************'));
    // db.mongoose.connection.on('disconnected', () => console.log('DATABASE CONNECTION: Disconnected'));
    // db.mongoose.connection.on('reconnected', () => console.log('DATABASE CONNECTION: Reconnected'));
    // db.mongoose.connection.on('disconnecting', () => console.log('DATABASE CONNECTION: Disconnecting'));
    // db.mongoose.connection.on('close', () => console.log('DATABASE CONNECTION: Closed'));
    // db.mongoose.connect(DB_URI);
    // ////////////////////////////////////////////////////////////////////////////////////////////////////////////

};

module.exports = LaunchLocalDBConnection;