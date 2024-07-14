import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      window.open(`${process.env.REACT_APP_API_URL}/auth/google`, "_self");
      // await new Promise((resolve) => setTimeout(resolve, 100)); 
      await getUser();
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred during login. Please try again later.');
      setLoading(false);
    }
  };

  const getUser = async (setLoading) => {
  
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/auth/login/success`, {
        withCredentials: true,
      });
  
      console.log("Response:", response.data);
  
      if (response.status === 200) {
        const { user } = response.data;
  
        if (user) {
          sessionStorage.setItem("UserId", user._id);
          sessionStorage.setItem("Username", JSON.stringify(user.name));
          toast.success("User logged in successfully!");
          navigate("/");
        } else {
          toast.error("User data not found.");
        }
      } else {
        toast.error(response.data.message || "Failed to log in User");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-b from-blue-400 to-cyan-500">
      <div className="max-w-xl w-full mx-auto p-6 bg-white rounded-lg shadow-xl text-center">
        <h2 className="text-4xl font-bold mb-4 text-green-700">User Login</h2>
        <button
          type="button"
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ml-4"
          onClick={handleGoogleLogin}
        >
          {loading ? (
            <TailSpin className="animate-spin h-5 w-5 mr-3 inline-block" />
          ) : (
            "Google Login"
          )}
        </button>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
