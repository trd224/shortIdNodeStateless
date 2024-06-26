const mongoose = require("mongoose");

async function mongoDbConnection(url){
    return await mongoose.connect(url);
}

module.exports = mongoDbConnection;