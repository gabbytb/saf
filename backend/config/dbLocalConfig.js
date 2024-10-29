const DB_Connection = async (username, password) => {
    
    const mongoose = require("mongoose");    
    const db = require("../models");    
    const { smiley } = process.env;

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // DATABASE:- Connection
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    var connType = db.url;
    var DB_URI = connType+smiley || `mongodb+srv://${username}:${password}@safdb.71th1.mongodb.net/?retryWrites=true&w=majority`;   ;


    try {
        await mongoose.set("strictQuery", false);
        await mongoose.connect(DB_URI);
        console.log("***********************************************",
                    "\n******       DATABASE CONNECTION        *******",
                    `\n***********************************************`,
                    `\n\nCONNECTED TO DATABASE: ${DB_URI}`,
                    "\n***********************************************",
                    "\n***********************************************\n\n");                
    } catch(error) {
        console.log("Could not connect to database!", error);
    };


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

module.exports = DB_Connection;