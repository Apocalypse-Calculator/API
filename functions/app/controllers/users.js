
import {Router} from "express"

const registerUser = (req, resp) => {
    resp.json({})
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