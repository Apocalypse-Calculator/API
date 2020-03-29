import { MongoClient } from "mongodb"
import config from "../config"

export const getConnection = async () => {
    const { connectionString } = config
    const client = await MongoClient.connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    return client
}