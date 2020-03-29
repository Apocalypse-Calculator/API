import config from "../config"
import { getConnection } from "./database-service"

const userCollection = "users"

const register = async (data) => {
    const { dbName } = config
    const client = await getConnection()
    const User = client.db(dbName).collection(userCollection)
    await User.insertOne(data)
    await client.close()
}

export const UserService = {
    register
}