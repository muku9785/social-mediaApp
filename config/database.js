// backend/config/database.js
require('dotenv').config();

const mongoose = require('mongoose');

exports.connectDatabase = () => {
    const uri = process.env.MONGODB_URI;



    if (!uri) {
        console.error('MONGODB_URI is not set');
        process.exit(1);
    }

    mongoose.connect(uri)
        .catch((err) => {
            console.error(err);
            process.exit(1);
        });

    mongoose.connection.on('connected', () => {
        console.log('DataB connected to' + uri);
    });


};
