import {Router} from "express"

const ping = (req, resp) => {
    resp.json({
        status: "OK" })
}

export const getPingRoutes = () => {
    const router = Router()
    router.get("/", ping)
    return router
}

