import { MongoClient } from "mongodb"
import config from "../config"

const makeConnectionString = () => {
    const { dbUser, dbPassword, dbHost, dbName } = config

    // encoding username and password to handle special chars in conn string
    const encodedUser = encodeURI(dbUser)
    const encodedPassword = encodeURI(dbPassword)

    return `mongodb+srv://${encodedUser}:${encodedPassword}@${dbHost}/${dbName}?retryWrites=true&w=majority`
}


export const getConnection = async (collectionName) => {
    const connectionString = makeConnectionString()
    const client = await MongoClient.connect(connectionString, {
        useUnifiedTopology: true
    })
    return client
}