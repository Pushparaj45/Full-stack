const mongoose = require('mongoose')

const InvoiceSchema = new mongoose.Schema({
        name: String,
        date: Date,
        invoiceNumber: String,
        itemName: String,
        itemQty: Number,
        pricePerItem: Number,
        total: Number,
        gstAmount: Number,
        grandTotal: Number,
})

const InvoiceModel = mongoose.model('Invoice', InvoiceSchema)
module.exports = InvoiceModel