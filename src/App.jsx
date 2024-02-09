// App.jsx
//import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Routes
import axios from "axios";
import { useState } from "react";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import SideBar from "./components/SideBar";
import ReceiverBar from "./components/ReceiverBar";
import ParentComponent from "./components/ParentComponent"; 
import ForgetPassword from "./components/ForgetPassword";
import Profile from "./components/Profile"; 
import Settings from "./components/Settings";
import "./App.css";

function App() {
  const [form, setForm] = useState({});

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("Email", form.Email);
    formData.append("Password", form.Password);
    formData.append("ProfilePic", form.ProfilePic);

    console.log("aaaa");
    await axios.post("https://localhost:7225/Auth/register", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  return (
    <Router>
      <Routes> {/* Wrap your routes with the Routes component */}
        <Route path="/login" element={<LoginForm handleChange={handleChange} onSubmit={onSubmit} />} />
        <Route path="/signup" element={<SignUpForm handleChange={handleChange} onSubmit={onSubmit} />} />
        <Route path="/sidebar" element={<SideBar handleChange={handleChange} onSubmit={onSubmit} />} />
        <Route path="/receiver" element={<ReceiverBar handleChange={handleChange} onSubmit={onSubmit} />} />
        <Route path="/chat" element={<ParentComponent handleChange={handleChange} onSubmit={onSubmit} />} />
        <Route path="/forgetpassword" element={<ForgetPassword handleChange={handleChange} onSubmit={onSubmit} />} />
        <Route path="/profile" element={<Profile handleChange={handleChange} onSubmit={onSubmit} />} />
        <Route path="/settings" element={<Settings handleChange={handleChange} onSubmit={onSubmit} />} />
      </Routes>
    </Router>
  );
}

export default App;
