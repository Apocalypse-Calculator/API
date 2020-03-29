import { MongoClient } from "mongodb"
import config from "../config"

export const getConnection = async (collectionName) => {
    const { connectionString } = config
    const client = await MongoClient.connect(connectionString, {
        useUnifiedTopology: true
    })
    return client
}