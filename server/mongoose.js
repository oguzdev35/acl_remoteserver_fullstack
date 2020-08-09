import mongoose from "mongoose";
import config from '../config/config';

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.Promise = global.Promise;



mongoose.connection.on("error", () => {
    throw new Error(`unable to connect to database: ${config.dbUri}`)
});

mongoose.connection.on("open", () => {
    console.info(`MongoDb client connected to ${config.dbUri}`)
})

export default mongoose;
