const mongoose = require('mongoose')
const connectDB = async () => {
    try{
        await mongoose.connect('mongodb+srv://usersecu:9uHvElXCBR2IozS5@secu.2yhzf42.mongodb.net/?retryWrites=true&w=majority')
        console.log("Connected to DB");
        mongoose.set("debug", true)
    } catch (err) {
        console.log("Err connect db", err);
        process.exit(1);
    }
}

module.exports = connectDB;