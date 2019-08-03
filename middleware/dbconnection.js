module.exports = async function (app) {

    const mongoose = require('mongoose');

    const props = {
        bufferCommands : false,
        useNewUrlParser: true
    };

    const envUrl = {
        "test" : "mongodb://localhost:27017/ntalk_test",
        "development" : "mongodb://localhost:27017/ntalk",
    };

    const url = envUrl[process.env.NODE_ENV || "development"];

    try {
        return await mongoose.connect(url, props).then(result => { return result });
    } catch (error) {
        throw error;
    }

};