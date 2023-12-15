// App.jsx
import axios from "axios";
import  { useState } from "react";
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
    <div className="app-container">
      {/* Existing content, if any */}
      <div>
        <h1>Your Existing App Content</h1>
      </div>

      {/* Registration Form Component */}
      <form className="registration-form" onSubmit={onSubmit}>
        <label>Email:</label>
        <input
          type="text"
          name="Email"
          value={form.Email || ""}
          onChange={handleChange}
        />

        <label>Password:</label>
        <input
          type="password"
          name="Password"
          value={form.Password || ""}
          onChange={handleChange}
        />

        {/* input an image */}
        <label>Profile Picture:</label>
        <input
          type="file"
          name="ProfilePic"
          onChange={(e) => setForm({ ...form, ProfilePic: e.target.files[0] })}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
