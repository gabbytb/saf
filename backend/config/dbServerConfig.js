const DB_Server_Connection = async (username, password) => {
    

    const mongoose = require("mongoose"); 
    const db = require("../models");    
    const { cc, dd, srvr, saved } = process.env;


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // DATABASE:- Connection
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const connType = db.url;
    var DB_URI = connType+`${username}`+cc+`${password}`+dd+srvr+saved || `mongodb+srv://${username}:${password}@safdb.71th1.mongodb.net/?retryWrites=true&w=majority`;   
    
    try {        

        await mongoose.set("strictQuery", false);
        await mongoose.connect(DB_URI);
        console.log("***********************************************",
                    "\n*********     DATABASE CONNECTION     *********",
                    `\n***********************************************`,
                    `\n\nCONNECTED TO DATABASE: ${connType}${srvr}${saved}`,
                    "\n***********************************************",
                    "\n***********************************************\n\n");               
    } catch(error) {
        console.log("Could not connect to database!", error);
    };
};

module.exports = DB_Server_Connection;