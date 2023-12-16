// App.jsx
import axios from "axios";
import  { useState } from "react";
import SignUpForm from "./components/SignUpForm";
import "./App.css"; // Import a separate CSS file for styling

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
    await axios.post("https://localhost:7225/api/Auth/register", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  return (
    <div id ="root" >
      <SignUpForm
        form={form}
        handleChange={handleChange}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default App;
