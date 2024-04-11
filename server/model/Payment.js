const mongoose = require('mongoose')

const PaymentSchema = new mongoose.Schema({
    name: String,
    date: Date,
    particulars: String,
    amount: Number,
})

const PaymentModel = mongoose.model('Payment', PaymentSchema)
module.exports = PaymentModel