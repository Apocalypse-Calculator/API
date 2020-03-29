import config from "../config"
import { MongoClient } from "mongodb"
import { getConnection } from "./database-service"

const userCollection = "users"

const register = async (data) => {
    const { databaseName } = config
    const client = await getConnection(userCollection)
    const User = client.db(databaseName).collection(databaseName)
    await User.insertOne(data)
    await client.close()
}

export const UserService = {
    register
}