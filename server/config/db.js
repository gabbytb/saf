//  CONNECT TO CLOUD DATABASE
const emoji = process.env.MONGO_URI;

//  CONNECT TO [COCKY] CLOUD DATABASE
// const emoji = process.env.MONGO_DB_CLOUD;

//  CONNECT TO LOCAL DATABASE
// const emoji = process.env.MONGO_DB;




module.exports = {
    url: emoji || null
};