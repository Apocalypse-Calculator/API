import { MongoClient } from "mongodb"
import config from "../config"

const makeConnectionString = () => {
    const { dbUser, dbPassword, dbHost, dbName } = config
    return `mongodb+srv://${dbUser}:${dbPassword}@${dbHost}/${dbName}?retryWrites=true&w=majority`
}


export const getConnection = async (collectionName) => {
    const connectionString = makeConnectionString()
    const client = await MongoClient.connect(connectionString, {
        useUnifiedTopology: true
    })
    return client
}