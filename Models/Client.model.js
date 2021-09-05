const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ClientSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
    },
    messages: {
        type: String,
        required: true,
    }
})

const Client = mongoose.model('client', ClientSchema)
module.exports = Client