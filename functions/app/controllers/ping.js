import { Router } from "express"
import mongoose from "../database"

const ping = (req, resp) => {
    resp.json({
        status: "OK",
        databaseStatus: mongoose.connection.readyState
    })
}

export const getPingRoutes = () => {
    const router = Router()
    router.get("/", ping)
    return router
}

