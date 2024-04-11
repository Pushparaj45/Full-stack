import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../tag components/Button';

export default function Sidebar() {
  return (
    <aside className="flex flex-col w-1/3 px-8 py-16 my-8 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
      <h2 className="mb-08 font-bold uppercase md-text-xl text-stone-200">record your data</h2>
      <hr />
      <div className="mt-2">
        <Button title='Home' linkTo="/" />
        <Button title='Record Invoice' linkTo="/invoice" />
        <Button title='View Invoice' linkTo="/viewInvoice" />
        <Button title='Record Receipt' linkTo="/receipt" />
        <Button title='View Receipt' linkTo="/viewReceipt" />
        <Button title='Record Payment' linkTo="/payment" />
        <Button title='View Payment' linkTo="/viewPayments" />
        
      </div>
    </aside>
  );
}
