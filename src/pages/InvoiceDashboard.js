import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InvoiceList from '../components/InvoiceList';

const InvoiceDashboard = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchInvoices = async () => {
    setLoading(true);
    try {
      const userId = sessionStorage.getItem('UserId');
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/invoice`, {
        params: { userId },
      });
      setInvoices(response.data);
    } catch (error) {
      console.error('Error fetching invoices:', error);
      toast.error('Failed to fetch invoices. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const handleSendNotification = async (invoiceId) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/webhook/receive`, { invoiceId });
    //   toast.success('Notification sent successfully!');
    } catch (error) {
      console.error('Error sending notification:', error);
      toast.error('Failed to send notification. Please try again later.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Invoice Dashboard</h1>

      {loading && <div className="text-center">Loading...</div>}

      {!loading && (
        <InvoiceList invoices={invoices} handleSendNotification={handleSendNotification} />
      )}
      <ToastContainer />
    </div>
  );
};

export default InvoiceDashboard;
