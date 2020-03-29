import { Router } from "express"
import { getConnection } from "../services"

const ping = async (req, resp) => {
    const client = await getConnection()
    const isDatabaseConnected = client.isConnected()
    resp.json({
        status: "OK",
        isDatabaseConnected
    })
    await db.close()
}

export const getPingRoutes = () => {
    const router = Router()
    router.get("/", ping)
    return router
}

