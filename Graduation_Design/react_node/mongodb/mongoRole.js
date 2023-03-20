const mongoose = require("mongoose")

let schema = new mongoose.Schema(
    {
        roleAccount: String,
        rolePassword: String,
        roleAbout: String,
        roleDate: Date
    }
)

module.exports = mongoose.model("mongoRole", schema)