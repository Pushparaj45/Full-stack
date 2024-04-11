import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ViewInvoice() {
    const [invoices, setInvoices] = useState([]);
    const [filteredInvoices, setFilteredInvoices] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const filtered = invoices.filter(invoice =>
            invoice.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredInvoices(filtered);
    }, [searchTerm, invoices]);

    const fetchData = () => {
        axios.get('http://localhost:3001/get')
            .then(response => {
                const formattedInvoices = response.data.map(invoice => ({
                    ...invoice,
                    date: formatDate(invoice.date)
                }));
                setInvoices(formattedInvoices);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setError(error.message);
                setLoading(false);
            });
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { timeZone: 'UTC' });
    };

    const deleteInvoice = (id) => {
        axios.delete(`http://localhost:3001/delete/${id}`)
            .then(response => {
                console.log(response.data.message);
                fetchData();
            })
            .catch(error => {
                console.error('Error deleting invoice:', error);
            });
    };

    return (
        <div className="flex flex-col items-center justify-normal mt-24 h-full w-full ">
            <div className="flex flex-col mx-4 border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600 items-center p-4">
                <h2 className="mb-4 text-stone-600 font-bold uppercase text-md">View Invoices</h2>
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border border-gray-400 px-4 py-2 mb-4"
                />
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error}</p>}
                {!loading && !error && (
                    <table className="border-collapse border" style={{ minWidth: '400px' }}>
                        <thead>
                            <tr className='text-stone-600'>
                                <th className="border border-gray-400 px-4 py-2">Name</th>
                                <th className="border border-gray-400 px-4 py-2">Date</th>
                                <th className="border border-gray-400 px-4 py-2">Invoice Number</th>
                                <th className="border border-gray-400 px-4 py-2">Item name</th>
                                <th className="border border-gray-400 px-4 py-2">Qty</th>
                                <th className="border border-gray-400 px-4 py-2">Price/Item</th>
                                <th className="border border-gray-400 px-4 py-2">Total</th>
                                <th className="border border-gray-400 px-4 py-2">GST Amount</th>
                                <th className="border border-gray-400 px-4 py-2">Grand Total</th>
                                <th className="border border-gray-400 px-4 py-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredInvoices.map((invoice) => (
                                <tr key={invoice._id} className='text-stone-600'>
                                    <td className="border border-gray-400 px-4 py-2">{invoice.name}</td>
                                    <td className="border border-gray-400 px-4 py-2">{invoice.date}</td>
                                    <td className="border border-gray-400 px-4 py-2">{invoice.invoiceNumber}</td>
                                    <td className="border border-gray-400 px-4 py-2">{invoice.itemName}</td>
                                    <td className="border border-gray-400 px-4 py-2">{invoice.itemQty}</td>
                                    <td className="border border-gray-400 px-4 py-2">Rs.{invoice.pricePerItem}/-</td>
                                    <td className="border border-gray-400 px-4 py-2">Rs.{invoice.total}/-</td>
                                    <td className="border border-gray-400 px-4 py-2">Rs.{invoice.gstAmount}/-</td>
                                    <td className="border border-gray-400 px-4 py-2">Rs.{invoice.grandTotal}/-</td>
                                    <td className="flex flex-col border border-gray-400 px-4 py-2 ">
                                        <button className='hover:text-black hover:underline' onClick={() => window.location.href = `http://localhost:5173/invoice?id=${invoice._id}`}>Edit</button>
                                        <button className='hover:text-black hover:underline' onClick={() => deleteInvoice(invoice._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                <Link to="/" className="mb-2 text-black hover:underline my-10">Home</Link>
            </div>
        </div>
    );
}

export default ViewInvoice;
