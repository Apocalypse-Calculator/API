import {Router} from "express"



const addStockLevels = (req, resp) => {
    resp.json({route: "update"})
}

const listStocks = (req, resp) => {
    resp.json({route: "stocks"})
}


export const createStocksRoutes = () => {
    const router = Router()

    router.post("/", addStockLevels)
    router.get("/:id", listStocks)

    return router
}