import passport from "passport"
import passportJWT from "passport-jwt"
import config from "../../../config"
import { UserRepository } from "../../../storage"

const { jwtSecret } = config;
const { Strategy: JWTStrategy } = passportJWT;

const verifyCallback = async (req, jwtPayload, cb) => {
    try {
        const user = await UserRepository.getUserById(jwtPayload.data._id)
        return cb(null, user)
    } catch (err) {
        return cb(err)
    }
}

const strategy = () => {
    const options = {
        jwtFromRequest: req => req.cookies.jwt,
        secretOrKey: jwtSecret,
        passReqToCallback: true
    }
    passport.use(new JWTStrategy(options, verifyCallback))
}

export { strategy }