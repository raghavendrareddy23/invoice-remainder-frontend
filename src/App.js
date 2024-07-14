import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Navbar from "./components/Header";
import InvoiceDashboard from "./pages/InvoiceDashboard";
import CreateInvoice from "./components/InvoiceForm";

const App = () => {
  const isLoggedIn = sessionStorage.getItem('UserId');

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" exact element={<Login />} />
        {/* Protect routes based on authentication status */}
        {isLoggedIn ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/invoice-dashboard" element={<InvoiceDashboard />} />
            <Route path="/create-invoice" element={<CreateInvoice />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
