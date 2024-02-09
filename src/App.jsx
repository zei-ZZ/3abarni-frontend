// App.jsx
//import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Routes
import axios from "axios";
import { useState } from "react";
import "./App.css";
import RouterComponent from "./routes/index";

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
    <RouterComponent />
  </Router>
  );
}

export default App;
