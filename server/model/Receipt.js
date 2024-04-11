const mongoose = require('mongoose')

const ReceiptSchema = new mongoose.Schema({
    name: String,
    date: Date,
    particulars: String,
    amount: Number,
})

const ReceiptModel = mongoose.model('Receipt', ReceiptSchema)
module.exports = ReceiptModel