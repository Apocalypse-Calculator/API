import mongoose from "mongoose"
import config from "./config"

const createConnection = async () => {
    const { MONGO_URL: dbPath } = config;
    await mongoose.connect(dbPath, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
}

Promise.resolve(createConnection())

export default mongoose