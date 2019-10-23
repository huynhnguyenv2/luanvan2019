import mongoose from 'mongoose';

const dev_db_url = "mongodb://@localhost:27017/nodes";
const mongoDB = process.env.MONGODB_URI || dev_db_url;

mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;

export default db;