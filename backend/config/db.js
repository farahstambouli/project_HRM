const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
//require('dotenv').config();

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, '.env') });

const db = process.env.MONGO_URL;

const connect = async ()=>{
    try{
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true
          })
          console.log('connected to the database')
    }catch(err){
        console.log('error connecting to the database')
    }
}

module.exports = connect;