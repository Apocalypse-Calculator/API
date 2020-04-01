import { UserModel } from "../models"

const getUserById = async (id) => {
    return await UserModel.findById(id).exec()
}

const getUserByEmail = async (email) => {
    return await UserModel.findOne({ email }).exec()
}

const createUser = async ({ email, password, displayName, providerId, provider, location }) => {
    const user = await UserModel.findOne({ email })
    if (user) {
        return {
            error: `email ${email} is already registered`
        }
    }
    return await UserModel.create({ email, password, displayName, provider, providerId, location })
}

const UserRepository = {
    getUserById,
    getUserByEmail,
    createUser
}

export {
    UserRepository
}