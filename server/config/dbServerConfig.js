const DB_Server_Connection = async (app, ip, port) => {
            
    const mongoose = require("mongoose");
       

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // =======================================================================================================//
    // 3. DATABASE CONFIG  ===================================================================================//
    // =======================================================================================================//
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const db = require("../models");
    const authSource = db.url;

    // Environment variables
    const username = process.env.MONGO_DB_USERNAME || "userName";
    const authbinder = process.env.MONGO_DB_PLANNER || "serverAuthBinder";
    const password = process.env.MONGO_DB_MAIN_PASSWORD || "authpwrd";
    const pswd = process.env.MONGO_DB_PASSWORD || password;
    const host = process.env.MONGO_DB_HOST || "serverHost";
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //   CLOUD CONFIG.   
    const defaultauthdb = process.env.MONGO_DB_CLOUD_DATABASE || "serverAuthDatabase";
    
    //   SELECT CLOUD
    const mongoURI = authSource + username + authbinder + pswd + host + defaultauthdb || `mongodb+srv://${username}:${password}@safdb.93th1.mongodb.net/?retryWrites=true&w=majority`;
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // =======================================================================================================//
    // DATABASE CONNECTION  ==================================================================================//
    // =======================================================================================================//
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
        let _DB = "*******/";
        // _DB = client; // you can also use this "client.db();"
        console.log("************************************************",
            "\n*********     DATABASE CONNECTION     **********",
            `\n************************************************`,    
            `\n\nCONNECTED TO DATABASE: ${authSource}${_DB}${defaultauthdb}\n`);
            
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////
        // 6. SERVER:-  Port
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // Start the server only after a successful DATABASE Connection
        let server = app.listen(port, () => {
                let port = server.address().port;
                let family = server.address().family;           
                console.log("************************************************",
                            "\n*********      BACKEND CONNECTION      *********",
                            `\n************************************************`,              
                            `\n\nSERVER IS RUNNING ON: ${ip}:${port}`,
                            `\nINTERNET PROTOCOL: ${family}\n`,
                            "\n************************************************",
                            "\n************************************************\n\n");   
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

};

module.exports = DB_Server_Connection;