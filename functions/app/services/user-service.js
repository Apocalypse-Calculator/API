import {User} from "../models"

const register = async (data) => {
    const user = new User({...data})
    return await user.save()
}

export const UserService = {
    register
}