const app = require('./app');
const dotenv = require('dotenv');
const connectToDB = require("./config/database")

//Handling Uncaught Exception
process.on("uncaughtException", err => {
    console.log(`Error: ${err.message}`);
    console.log("Shutting down server due to Uncaught Exception");

    process.exit(1);
});

dotenv.config({path: "backend/config/config.env"});

connectToDB();

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is listening at port ${process.env.PORT}`);
})

//Unhandled Promise Rejection
process.on("unhandledRejection", err => {
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to Unhandled Promise Rejection");

    server.close(() => {
        process.exit(1);
    });
})