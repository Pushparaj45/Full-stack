import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../src/components/ui components/Home';
import Sidebar from '../src/components/ui components/Sidebar';
import HandleInvoice from '../src/components/record components/HandleInvoice';
import ViewInvoice from '../src/components/view components/ViewInvoice';
import HandleReceipt from '../src/components/record components/HandleReceipt';
import ViewReceipt from '../src/components/view components/ViewReceipt';
import HandlePayment from '../src/components/record components/HandlePayment';
import ViewPayment from './components/view components/ViewPayment.jsx';

function App() {
  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/invoice" element={<HandleInvoice />} />
          <Route path="/viewInvoice" element={<ViewInvoice />} />
          <Route path="/receipt" element={<HandleReceipt />} />
          <Route path="/viewReceipt" element={<ViewReceipt />} />
          <Route path="/payment/" element={<HandlePayment />} />
          <Route path="/viewPayments" element={<ViewPayment />} />
        </Routes>
      </div>
    </Router>
  );
}


export default App;
