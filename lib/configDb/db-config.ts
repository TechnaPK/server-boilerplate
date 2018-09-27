import * as mongoose from 'mongoose';

//set port for mongobd
 const db_url = process.env.DB_URL || 'mongodb://localhost:27017/boiler-plate'

 //connect db with mongoose
 mongoose.connect(db_url, {useNewUrlParser: true});

 const db = mongoose.connection;
 db.on('error', console.error.bind(console, 'DB connection error:'));
 db.once('open', function () { console.log('Successfully connected to DB') });