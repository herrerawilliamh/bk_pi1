const mongoose = require("mongoose");
const messageCollection = "messages";
const messageSchema = new mongoose.Schema({
    username: { type: String, max: 50, require: true},
    message: { type: String, max: 200, require: true}
})
const messageModel = mongoose.model(messageCollection, messageSchema)

module.exports = { messageModel }