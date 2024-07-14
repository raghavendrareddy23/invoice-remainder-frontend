import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const InvoiceList = ({ invoices, handleSendNotification }) => {
  const notifySuccess = () => {
    toast.success("Notification sent successfully!");
  };

  const notifyError = () => {
    toast.error("Failed to send notification. Please try again later.");
  };

  const handleNotificationClick = async (invoiceId) => {
    try {
      await handleSendNotification(invoiceId);
      notifySuccess();
    } catch (error) {
      console.error("Error sending notification:", error);
      notifyError();
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Invoices</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        {invoices.map((invoice) => (
          <div key={invoice._id} className="bg-gray-200 rounded-lg p-4">
            <p className="text-lg font-semibold mb-2">
              Invoice for {invoice.recipientName}
            </p>
            <div className="flex justify-between mb-2">
              <p className="font-bold">Amount:</p>
              <p>₹{invoice.amount}</p>
            </div>
            <div className="flex justify-between mb-2">
              <p className="font-bold">Due Date:</p>
              <p>{new Date(invoice.dueDate).toLocaleDateString()}</p>
            </div>
            <div className="flex justify-between mb-2">
              <p className="font-bold">Recipient Email:</p>
              <p>{invoice.recipient}</p>
            </div>
            <button
              onClick={() => handleNotificationClick(invoice._id)}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
            >
              Send Email Reminder
            </button>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default InvoiceList;
