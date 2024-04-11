import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ViewPayment() {
    const [payments, setPayments] = useState([]);
    const [filteredPayments, setFilteredPayments] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const filtered = payments.filter(payment =>
            payment.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredPayments(filtered);
    }, [searchTerm, payments]);

    const fetchData = () => {
        axios.get('http://localhost:3001/viewPayments')
          .then(response => {
            const formattedPayments = response.data.map(payment => ({
              ...payment,
              date: formatDate(payment.date)
            }));
            setPayments(formattedPayments);
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

    const deletePayment = (id) => {
        axios.delete(`http://localhost:3001/deletePayment/${id}`)
            .then(response => {
                console.log(response.data.message);
                fetchData(); 
            })
            .catch(error => {
                console.error('Error deleting payment:', error);
            });
    };

    return (
        <div className="flex flex-col items-center h-full w-full mt-24 ">
            <div className="flex flex-col border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600 items-center p-4">
                <h2 className="mb-4 text-stone-600 font-bold uppercase text-md">View Payments</h2>
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
                  <>
                    <table className="border-collapse border" style={{ minWidth: '400px' }}>
                        <thead>
                            <tr className='text-stone-600'>
                                <th className="border border-gray-400 px-4 py-2">Name</th>
                                <th className="border border-gray-400 px-4 py-2">Date</th>
                                <th className="border border-gray-400 px-4 py-2">Particulars</th>
                                <th className="border border-gray-400 px-4 py-2">Amount</th>
                                <th className="border border-gray-400 px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPayments.map((payment) => (
                                <tr key={payment._id} className='text-stone-600'>
                                    <td className="border border-gray-400 px-4 py-2">{payment.name}</td>
                                    <td className="border border-gray-400 px-4 py-2">{payment.date}</td>
                                    <td className="border border-gray-400 px-4 py-2">{payment.particulars}</td>
                                    <td className="border border-gray-400 px-4 py-2">Rs.{payment.amount}/-</td>
                                    <td className="flex flex-col border border-gray-400 px-4 py-2 ">
                                        <Link to={`/payment/?id=${payment._id}`} className='hover:text-black hover:underline'>Edit</Link>
                                        <button className='hover:text-black hover:underline' onClick={() => deletePayment(payment._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Link to="/" className="mb-2 text-black hover:underline my-10">Home</Link>
                  </>
                )}
            </div>
        </div>
    );
}

export default ViewPayment;
