const mongoose = require("mongoose");

const naijaSchema = new mongoose.Schema({
    name: String,
    states: [
        {
            name: String,
            lgas: [String],
            metadata: mongoose.Schema.Types.Mixed
        }
    ]
})

const NaijaData = mongoose.model("NaijaData", naijaSchema);
module.exports = NaijaData;