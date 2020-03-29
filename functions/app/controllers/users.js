
import {Router} from "express"
import {UserService} from "../services"

const registerUser = async (req, resp) => {
    const {body} = req
    const response = await UserService.register(body)
    resp.json({response})
}


const authUser = (req, resp) => {
    resp.json({})
}


export const getUserRoutes = () => {
    const router = Router()
    router.post("/", registerUser)
    router.post("/auth", authUser)
    return router
}