import joi from "@hapi/joi"
import { utils } from "./service"
import { UserRepository, getConnection } from "../core/storage"

const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
    display_name: joi.string(),
    location: joi.object({
        city: joi.string(),
        country: joi.string()
    })
})

export const registerUser = async (req, resp) => {
    const { body } = req;
    await getConnection()
    try {
        const { value, error } = schema.validate(body, { abortEarly: false })
        if (error) {
            const errors = error.details.map(detail => detail.message)
            resp.status(422)
            resp.json({
                errors
            })
        } else {
            const { email, password, display_name: displayName, location } = value
            const user = await UserRepository.createUser({
                email,
                password: await utils.hashPassword(password),
                displayName,
                location
            })

            if (user.error) {
                resp.status(422)
                resp.json({ error: user.error })
            } else {
                const { _id: id, confirmationSentAt, confirmedAt } = user
                resp.status(201)
                resp.json({ email, id, confirmationSentAt, confirmedAt, location, displayName })
            }
        }
    } catch (err) {
        console.log(err)
        resp.status(500)
    }
}