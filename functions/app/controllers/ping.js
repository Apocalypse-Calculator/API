import {Router} from "express"


const branch = process.env.BRANCH || "dev"
const head = process.env.HEAD || "dev"
const commit = process.env.COMMIT_REF || "dev"


const ping = (req, resp) => {
    resp.json({
        status: "OK",
        revision: {
            branch,
            head,
            commit
        }
    })
}

export const getPingRoutes = () => {
    const router = Router()
    router.get("/", ping)
    return router
}

