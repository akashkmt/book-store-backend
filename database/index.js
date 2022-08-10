const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        let uri = process.env.MONGO_URI;
        await mongoose.connect(uri, {useNewUrlParser:true});
        console.log('MongoDB Connected');
    } catch (error) {
        console.log(error);
    }
}

module.exports = {connectDB};