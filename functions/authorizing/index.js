import express, { Router } from "express";
import bodyParser from "body-parser";
import passport from "passport";
import cookieParser from "cookie-parser";
import { registerUser } from "./routes";
import config from "../core/config"
import { initAuthentication } from "./service";



const createApp = functionName => {
    const app = express();
    const router = Router();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser())
    app.use(passport.initialize());

    const routerBasePath = `${config.basePath}/${functionName}`;
    router.post("/register", registerUser);

    initAuthentication(app)

    app.use(routerBasePath, router);
    return app;
};

export default createApp;