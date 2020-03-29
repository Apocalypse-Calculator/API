import {Router} from "express"

const getEstimations = (req, resp) => {
    resp.json({status: "OK"})
}

export const getEstimationRoutes = () => {
    const router = Router();
    router.get("/:userId", getEstimations)
    return router
}