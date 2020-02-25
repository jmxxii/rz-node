'use strict'
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let UserSchema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email_id: { type: String, unique: true ,required: true },
    username: { type: String, unique: true ,required: true },
    password: { type: String, required: true },
    is_active: { type: Boolean, required: true, default: true } 
})

UserSchema.methods.generateJwtToken = function() {
     const jwtToken = jwt.sign({ _id: this._id, username: this.username }, "JWT_SECRET");
     return jwtToken;
}

module.exports = mongoose.model("UserModel", UserSchema);