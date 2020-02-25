'use strict'
const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let PrizeSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image_url: { type: String, required: true },
    quantity: { type: Number, required: true }
})

module.exports = mongoose.model("PrizeModel", PrizeSchema);