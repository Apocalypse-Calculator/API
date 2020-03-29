import mongoose from "../database"

const schema = mongoose.Schema({
    email: String,
    displayName: String,
    created: {
        type: Date,
        default: Date.now
    },
    location: {
        city: String,
        country: String
    }
})

const collectionName = "users"

export const User = mongoose.model(collectionName, schema, collectionName)

