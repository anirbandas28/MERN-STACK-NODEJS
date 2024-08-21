const mongoose = require('mongoose');

module.exports = () => {
    try{
        mongoose.connect(process.env.MONGODB_URL);
        console.log('Connection Successfully');
    } catch(err){
        console.log('Failed to connect to MongoDB', err);
        throw err;
    }
}
