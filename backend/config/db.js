//  CONNECT TO LOCAL DATABASE
// const emoji = process.env.MONGO_DB;


//  CONNECT TO CLOUD DATABASE
const emoji = process.env.MONGO_DB_CLOUD;



module.exports = {
    url: emoji || null
};