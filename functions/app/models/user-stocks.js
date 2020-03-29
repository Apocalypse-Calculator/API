import mongoose from "../database"
import {User} from "./user"

const {Schema} = mongoose

const schema = Schema({
    user: {
        type: Schema.Types.ObjectId, ref: User.collection.name
    },
    created: {
        type: Date,
        default: Date.now
    },
    stocks: {}
})

const collectionName = "user_stocks"

export const UserStocks = mongoose.model(collectionName, schema, collectionName)
