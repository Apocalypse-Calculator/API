import config from "../config"
import { MongoClient } from "mongodb"

const userCollection = "users"

const register = async (data) => {
    const { connectionString, databaseName } = config
    MongoClient.connect(connectionString, { useUnifiedTopology: true }, (err, client) => {
        const User = client.db(databaseName).collection(userCollection)
        User.insertOne(data).then(() => {
            client.close()
        })
    })
}

export const UserService = {
    register
}