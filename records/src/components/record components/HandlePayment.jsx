import React, { useState } from 'react';
import Input from '../tag components/Input';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

export default function HandlePayment() {
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [particulars, setParticulars] = useState('');
    const [amount, setAmount] = useState('');
    const [nameWarning, setNameWarning] = useState(false);
    const [dateWarning, setDateWarning] = useState(false);
    const [particularsWarning, setParticularsWarning] = useState(false);
    const [amountWarning, setAmountWarning] = useState(false);

    const location = useLocation();
    const searchParam = new URLSearchParams(location.search);
    const paramValueP = searchParam.get('id');

    function handleSave() {
        let isValid = true;

        if (!name.trim()) {
            setNameWarning(true);
            isValid = false;
        } else {
            setNameWarning(false);
        }

        if (!date.trim()) {
            setDateWarning(true);
            isValid = false;
        } else {
            setDateWarning(false);
        }

        if (!particulars.trim()) {
            setParticularsWarning(true);
            isValid = false;
        } else {
            setParticularsWarning(false);
        }

        if (!amount.trim() || isNaN(amount) || amount <= 0) {
            setAmountWarning(true);
            isValid = false;
        } else {
            setAmountWarning(false);
        }

        if (!isValid) {
            return;
        }

        if (paramValueP) {
            axios.post('http://localhost:3001/updatePayment', {
                id: paramValueP, 
                name: name,
                date: date,
                particulars: particulars,
                amount: amount
            })
            .then(result => {
                console.log(result);
                window.location.reload();
                window.location.href = '/viewPayments';
            })
            .catch(err => console.log(err));
        } else {
            axios.post('http://localhost:3001/payment', {
                name: name,
                date: date,
                particulars: particulars,
                amount: amount,
            })
            .then(result => {
                console.log(result);
                window.location.reload();
                window.location.href = '/viewPayments';
            })
            .catch(err => console.log(err));
        }
    }

    function handleCancel() {
        window.location.href = '/';
    }

    return (
        <div className="w-[35rem] mt-16 ml-80">
            <menu className="flex flex-col item-center justify-center gap-4 my-4 px-4 bg-stone-200">
                <h2 className='flex items-center justify-center uppercase text-stone-600 font-bold mt-4'>record your payment</h2>
                <div className="flex flex-col w-full p-1 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600 mb-4">
                    <Input label='Name' type='text' placeholder='Client name' value={name} onChange={setName} />
                    {nameWarning && <span className="text-red-500">Please fill out this field.</span>}
                    <Input label='Date' type='date' value={date} onChange={setDate} />
                    {dateWarning && <span className="text-red-500">Please fill out this field.</span>}
                    <Input label='Particulars' type='text' value={particulars} onChange={setParticulars} />
                    {particularsWarning && <span className="text-red-500">Please fill out this field.</span>}
                    <Input label='Amount' type='number' value={amount} onChange={setAmount} />
                    {amountWarning && <span className="text-red-500">Please fill out this field with a valid number.</span>}
                </div>
                <div className="flex flex-row justify-center my-4">
                    <li>
                        <button className="px-6 py-2 text-stone-800 hover:text-stone-40 " onClick={handleCancel}>Cancel</button>
                    </li>
                    <li>
                        <button onClick={handleSave} className="px-6 py-2 rounded-md bg-stone-700 text-stone-50 hover:bg-stone-950">Save</button>
                    </li>
                </div>
            </menu>
        </div>
    );
}