import mongoose from 'mongoose';

const dev_db_url = "mongodb://@localhost:27017/nodes";
const mongoDB = process.env.MONGODB_URI || dev_db_url;

mongoose.connect(mongoDB, { useUnifiedTopology: true, useNewUrlParser: true });
mongoose.Promise = global.Promise;
  

export default mongoose;
