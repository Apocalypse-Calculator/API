import { Router } from "express"
import { getConnection } from "../services"

const ping = async (req, resp) => {
    const client = await getConnection()
    const database = client.isConnected() ? "OK" : "database not connected"
    resp.json({
        status: "OK",
        database
    })
    await client.close()
}

export const getPingRoutes = () => {
    const router = Router()
    router.get("/", ping)
    return router
}

