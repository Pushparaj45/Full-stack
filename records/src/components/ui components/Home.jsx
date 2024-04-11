import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [countInvoice, setCountInvoice] = useState(0);
  const [receiptCount, setReceiptCount] = useState(0);
  const [paymentCount, setPaymentCount] = useState(0);
  const [sales, setSales] = useState(0);
  const [expense, setExpense] = useState(0);
  const [cashFlow, setCashFlow] = useState(0);


  const cashInHand = expense - cashFlow;

  useEffect(() => {
    fetchData('countInvoice', setCountInvoice);
    fetchData('countReceipt', setReceiptCount);
    fetchData('countPayment', setPaymentCount);
    fetchSales();
    fetchExpense();
    fetchCashFlow();
}, []);

const fetchData = (endpoint, setter) => {
  axios.get(`http://localhost:3001/${endpoint}`)
      .then(response => {
          const count = response.data;
          setter(count);
      })
      .catch(error => {
          console.error(`Error fetching ${endpoint} count:`, error);
      });
};

const fetchSales = () => {
  axios.get(`http://localhost:3001/Sales`)
    .then(response => {
      const total = response.data[0].grandTotal.toFixed(2); 
      setSales(total);
    })
    .catch(error => {
      console.error('Error fetching:', error);
    });
};

const fetchExpense = () => {
  axios.get(`http://localhost:3001/Expense`)
    .then(response => {
      const totalP = response.data[0].paymentAmount; 
      setExpense(totalP);
    })
    .catch(error => {
      console.error('Error fetching:', error);
    });
};

const fetchCashFlow = () => {
  axios.get(`http://localhost:3001/CashFlow`)
    .then(response => {
      console.log(response);
      const totalR = response.data[0].receiptAmount; 
      setCashFlow(totalR);
    })
    .catch(error => {
      console.error('Error fetching:', error);
    });
};

  return (
    <div className="flex mt-24 items-center flex-grow flex-col">
      <h1 className="text-2xl">Welcome Admin!</h1>

      <div className='flex flex-col mx-4 mt-16 border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600 items-center p-4'>
      <h2 className="mb-4 text-stone-600 font-bold uppercase text-md" >Your Dashboard</h2>
      <table className="border-collapse border " style={{ minWidth: '400px' }}>
                        <thead>
                            <tr className='text-stone-600'>
                            <th className="border border-gray-400 px-4 py-2">Invoice Records</th>
                                <th className="border border-gray-400 px-4 py-2">Receipt Records</th>
                                <th className="border border-gray-400 px-4 py-2">Invoice Number</th>
                                <th className="border border-gray-400 px-4 py-2">Sales</th>
                                <th className="border border-gray-400 px-4 py-2">Expense</th>
                                <th className="border border-gray-400 px-4 py-2">Cash Flow In</th>
                                <th className="border border-gray-400 px-4 py-2">Cash In Hand</th>
                            </tr>
                        </thead>
                        <tbody>
                        <tr className='text-stone-600'>
                        <td className="border border-gray-400 px-4 py-2">{countInvoice}</td>
                                    <td className="border border-gray-400 px-4 py-2">{receiptCount}</td>
                                    <td className="border border-gray-400 px-4 py-2">{paymentCount}</td>
                                    <td className="border border-gray-400 px-4 py-2">{sales}</td>
                                    <td className="border border-gray-400 px-4 py-2">{cashFlow}</td>
                                    <td className="border border-gray-400 px-4 py-2">{expense}</td>
                                    <td className="border border-gray-400 px-4 py-2">{cashInHand}</td>
                                </tr>
                                </tbody>
                    </table>
      </div>

    </div>
  );
}
