const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const InvoiceModel = require('./model/Invoice')
const PaymentModel = require('./model/Payment')
const ReceiptModel = require('./model/Receipt')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/Records')

app.post('/save', (req, res) =>{
    const name = req.body.name;
    const date = req.body.date;
    const invoiceNumber = req.body.invoiceNumber;
    const itemName = req.body.itemName;
    const itemQty = req.body.itemQty;
    const pricePerItem = req.body.pricePerItem;
    const total = req.body.total;
    const gstAmount = req.body.gstAmount;
    const grandTotal = req.body.grandTotal;

    InvoiceModel.create({
        name: name,
        date: date,
        invoiceNumber: invoiceNumber,
        itemName: itemName,
        itemQty: itemQty,
        pricePerItem: pricePerItem,
        total: total,
        gstAmount: gstAmount,
        grandTotal: grandTotal,
    }).then(result => res.json(result))
    .catch(err => console.log(err))
})

app.post('/update', (req, res) =>{
    const id = req.body.id;
    const name = req.body.name;
    const date = req.body.date;
    const invoiceNumber = req.body.invoiceNumber;
    const itemName = req.body.itemName;
    const itemQty = req.body.itemQty;
    const pricePerItem = req.body.pricePerItem;
    const total = req.body.total;
    const gstAmount = req.body.gstAmount;
    const grandTotal = req.body.grandTotal;

    InvoiceModel.findOneAndUpdate(
        {_id: id },
{
    '$set':        {
        name: name,
        date: date,
        invoiceNumber: invoiceNumber,
        itemName: itemName,
        itemQty: itemQty,
        pricePerItem: pricePerItem,
        total: total,
        gstAmount: gstAmount,
        grandTotal: grandTotal,
    }
}).then(result => res.json(result))
    .catch(err => console.log(err))
})

app.get('/get', (req,res)=>{
    InvoiceModel.find()
    .then(result => res.json(result))
    .catch(err => err.json(err))
})

app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
  
    InvoiceModel.findByIdAndDelete(id)
      .then(result => {
        if (result) {
          res.json({ message: 'Invoice deleted successfully' });
        } else {
          res.status(404).json({ error: 'Invoice not found' });
        }
      })
      .catch(err => console.error(err));
  });

app.post('/payment', (req, res) =>{
    const name = req.body.name;
    const date = req.body.date;
    const particulars = req.body.particulars
    const amount = req.body.amount
    PaymentModel.create({
        name: name,
        date: date,
        particulars: particulars,
        amount: amount,
    }).then(result => res.json(result))
    .catch(err => err.json(err))
})


app.post('/updatePayment', (req, res) =>{
    const id = req.body.id;
    const name = req.body.name;
    const date = req.body.date;
    const particulars = req.body.particulars
    const amount = req.body.amount;

    PaymentModel.findOneAndUpdate(
        {_id: id },
{
    '$set':        {
        name: name,
        date: date,
        particulars: particulars,
        amount: amount,
    }
}).then(result => res.json(result))
    .catch(err => console.log(err))
})

app.get('/viewPayments', (req,res)=>{
    PaymentModel.find()
    .then(result => res.json(result))
    .catch(err => err.json(err))
})

app.delete('/deletePayment/:id', (req, res) => {
    const { id } = req.params;
  
    PaymentModel.findByIdAndDelete(id)
      .then(result => {
        if (result) {
          res.json({ message: 'Invoice deleted successfully' });
        } else {
          res.status(404).json({ error: 'Invoice not found' });
        }
      })
      .catch(err => console.error(err));
  });

app.post('/receipt', (req, res) =>{
    const name = req.body.name;
    const date = req.body.date;
    const particulars = req.body.particulars
    const amount = req.body.amount
    ReceiptModel.create({
        name: name,
        date: date,
        particulars: particulars,
        amount: amount,
    }).then(result => res.json(result))
    .catch(err => err.json(err))
})

app.post('/updateReceipt', (req, res) =>{
    const id = req.body.id;
    const name = req.body.name;
    const date = req.body.date;
    const particulars = req.body.particulars
    const amount = req.body.amount;

    ReceiptModel.findOneAndUpdate(
        {_id: id },
{
    '$set':        {
        name: name,
        date: date,
        particulars: particulars,
        amount: amount,
    }
}).then(result => res.json(result))
    .catch(err => console.log(err))
})

app.get('/viewReceipt', (req,res)=>{
    ReceiptModel.find()
    .then(result => res.json(result))
    .catch(err => err.json(err))
})

app.delete('/deleteReceipt/:id', (req, res) => {
    const { id } = req.params;
  
    ReceiptModel.findByIdAndDelete(id)
      .then(result => {
        if (result) {
          res.json({ message: 'Invoice deleted successfully' });
        } else {
          res.status(404).json({ error: 'Invoice not found' });
        }
      })
      .catch(err => console.error(err));
  });


  app.get('/countPayment', (req, res) => {
    PaymentModel.countDocuments()
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

app.get('/countReceipt', (req, res) => {
    ReceiptModel.countDocuments()
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

app.get('/countInvoice', (req, res) => {
    InvoiceModel.countDocuments()
        .then(result => res.json(result))
        .catch(err => res.json(err));
});


app.get('/Sales', (req, res) => {
    InvoiceModel.aggregate([
        {
            $group: {
                _id: null,
                grandTotal: { $sum: "$grandTotal" }
            }
        }
    ])
    .then(result => res.json(result))
    .catch(err => res.status(500).json({ error: err.message }));
});

app.get('/Expense', (req, res) => {
    PaymentModel.aggregate([
        {
            $group: {
                _id: null,
                paymentAmount: { $sum: "$amount" }
            }
        }
    ])
    .then(result => res.json(result))
    .catch(err => res.status(500).json({ error: err.message }));
});

app.get('/CashFlow', (req, res) => {
    ReceiptModel.aggregate([
        {
         $group:{
         _id: null,
          receiptAmount: { $sum: "$amount" }
         }
        }
        ])
       .then(result => { return res.json(result)})
    .catch(err => res.status(500).json({ error: err.message }));
});


app.listen(3001, () =>{
    console.log('server is running')
})