// backend/config/database.js
require('dotenv').config();

const mongoose = require('mongoose');

exports.connectDatabase = () => {
    const uri = process.env.MONGODB_URI;



    if (!uri) {
        console.error('MONGODB_URI environment variable is not defined');
        process.exit(1);
    }

    mongoose.connect(uri)
        .catch((err) => {
            console.error('Database connection error:', err);
            process.exit(1); // Exit process with failure
        });

    mongoose.connection.on('connected', () => {
        console.log('Mongoose connected to ' + uri);
    });


};
