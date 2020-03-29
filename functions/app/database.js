import mongoose from "mongoose"
import config from "../config"

const {MONGO_URI: dbPath} = config;

mongoose.connect(dbPath, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => {console.log("Connection Successful")}).catch(err => {
    console.log(err.message)
})

const db = mongoose.connection;

db.on("error", () => {
    console.log("Error occured from database")
})

db.once("open", () => {
    console.log("accessing database")
})

export default mongoose