// App.jsx
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from "axios";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import SideBar from "./components/SideBar";
import ReceiverBar from "./components/ReceiverBar";
import ParentComponent from "./components/ParentComponent"; 
import ForgetPassword from "./components/ForgetPassword";
import  PacmanGame  from "./components/PacmanGame"; // Imported Pacman component
import "./App.css";
import ChatInterface from './components/ChatInterface';

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
      <Routes>
        <Route path="/login" element={<LoginForm handleChange={handleChange} onSubmit={onSubmit} />} />
        <Route path="/signup" element={<SignUpForm handleChange={handleChange} onSubmit={onSubmit} />} />
        <Route path="/sidebar" element={<SideBar handleChange={handleChange} onSubmit={onSubmit} />} />
        <Route path="/receiver" element={<ReceiverBar handleChange={handleChange} onSubmit={onSubmit} />} />
        <Route path="/chat" element={<ParentComponent handleChange={handleChange} onSubmit={onSubmit} />} />
        <Route path="/game" element={<PacmanGame />} /> {/* Added route for the game page */}
        <Route path="/test" element={<ChatInterface selectedContact={"ef16797c-2f24-4b52-b494-11c47e10745b"} handleChange={handleChange} onSubmit={onSubmit} />} />
        <Route path="/forgetpassword" element={<ForgetPassword handleChange={handleChange} onSubmit={onSubmit} />} />
      </Routes>
    </Router>
  );
}

export default App;
