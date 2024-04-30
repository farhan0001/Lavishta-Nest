const mongoose = require("mongoose");

const ConnectToDB = () => {
    mongoose.connect(process.env.DB_URI).then((res) => {
        console.log(`MongoDB connected with server : ${res.connection.host}`);
    });
}

module.exports = ConnectToDB;