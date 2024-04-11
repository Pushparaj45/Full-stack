import React, { useState } from 'react';
import Input from '../tag components/Input';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useLocation } from 'react-router-dom';

export default function HandleInvoice() {
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [itemName, setItemName] = useState('');
    const [itemQty, setItemQty] = useState('');
    const [pricePerItem, setPricePerItem] = useState('');
    const [nameWarning, setNameWarning] = useState(false);
    const [dateWarning, setDateWarning] = useState(false);
    const [itemNameWarning, setItemNameWarning] = useState(false);
    const [itemQtyWarning, setItemQtyWarning] = useState(false);
    const [pricePerItemWarning, setPricePerItemWarning] = useState(false);

    const location = useLocation();
    const searchParam = new URLSearchParams(location.search);
    const paramValue = searchParam.get('id');
    const invoiceNumber = uuidv4(); 
    const total = itemQty * pricePerItem;
    const gstRate = 18; //percent
    const gstAmount = calculateGST(total, gstRate).toFixed(2);
    const grandTotal = total + parseFloat(gstAmount);

    function calculateGST(total, gstRate) {
        const gstAmount = total - (total / (1 + gstRate / 100));
        return gstAmount;
    }

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

        if (!itemName.trim()) {
            setItemNameWarning(true);
            isValid = false;
        } else {
            setItemNameWarning(false);
        }

        if (!itemQty.trim() || isNaN(itemQty) || itemQty <= 0) {
            setItemQtyWarning(true);
            isValid = false;
        } else {
            setItemQtyWarning(false);
        }

        if (!pricePerItem.trim() || isNaN(pricePerItem) || pricePerItem <= 0) {
            setPricePerItemWarning(true);
            isValid = false;
        } else {
            setPricePerItemWarning(false);
        }

        if (!isValid) {
            return;
        }


        if (paramValue) {
            axios.post('http://localhost:3001/update', {
                id: paramValue,
                name: name,
                date: date,
                invoiceNumber: invoiceNumber,
                itemName: itemName,
                itemQty: itemQty,
                pricePerItem: pricePerItem,
                total: total,
                gstAmount: gstAmount,
                grandTotal: grandTotal
            })
            .then(result => {
                console.log(result);
                window.location.reload();
                window.location.href = '/viewInvoice';
            })
            .catch(err => console.log(err));
        } else {
            axios.post('http://localhost:3001/save', {
                name: name,
                date: date,
                invoiceNumber: invoiceNumber,
                itemName: itemName,
                itemQty: itemQty,
                pricePerItem: pricePerItem,
                total: total,
                gstAmount: gstAmount,
                grandTotal: grandTotal
            })
            .then(result => {
                console.log(result);
                window.location.reload();
                window.location.href = '/viewInvoice';
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
                <h2 className='flex items-center justify-center uppercase text-stone-600 font-bold mt-4'>record your invoice</h2>
                <div className="flex flex-col w-full p-1 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600 mb-4">
                    <Input label='Name' type='text' placeholder='Client name' value={name} onChange={setName} />
                    {nameWarning && <span className="text-red-500">Please fill out this field.</span>}
                    <Input label='Date' type='date' value={date} onChange={setDate} />
                    {dateWarning && <span className="text-red-500">Please fill out this field.</span>}
                    <Input label='Item name' type='text' value={itemName} onChange={setItemName} />
                    {itemNameWarning && <span className="text-red-500">Please fill out this field.</span>}
                    <Input label='Item Qty' type='number' value={itemQty} onChange={setItemQty} />
                    {itemQtyWarning && <span className="text-red-500">Please fill out this field with a valid number.</span>}
                    <Input label='Price per item' type='text' value={pricePerItem} onChange={setPricePerItem} />
                    {pricePerItemWarning && <span className="text-red-500">Please fill out this field with a valid number.</span>}
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