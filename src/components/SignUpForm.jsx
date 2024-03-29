import { useState } from "react";
import { theme, Modal, Box, Typography, Button } from './MaterialUIConfig';
import UIImage from "../assets/images/UI.png"; // Import the UI image
import LogoImage from "../assets/images/logo.png"; // Import the logo image
import "../styles/SignUpForm.css"; // Import the component-specific CSS file
import axiosInstance from "../utils/axiosInstance";

const SignUpForm = () => {

  const [form, setForm] = useState({
    Username: "",
    lastName: "",
    Email: "",
    Password: "",
    PasswordConfirmation: "",
  });

  const [isModalOpen, setModalOpen] = useState(false);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Add your form submission logic here
    try {
      const response = await axiosInstance.post("/Auth/register", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Form submitted:", response.data);
      setModalOpen(true);
    } catch (err) {
      console.error("error: ", err);
    }
  };

  const handleCloseModal = () => {
    // Close the modal
    setModalOpen(false);
  };

  return (
    <div className="flex h-screen w-screen ">
      {/* Left side with UI image */}
      <div className="flex-shrink-0 w-1/2 bg-black">
        {/* Your UI picture goes here */}
        <img src={UIImage} alt="UI" className="w-full h-full object-cover" />
      </div>

      {/* Right side with form */}

      <div
        className="flex-shrink-0 w-1/2 bg-light p-8 overflow-y-auto relative"
        style={{ padding: "5rem" }}
      >
        {/* Logo
         */}
        {/* Logo */}
        <img src={LogoImage} alt="Logo" className="mb-8 logo" />

        {/* Form container */}
        <div>
          <div className="welcome-text">
            Welcome!
            <br />{" "}
            <span style={{ color: "#FFD700" }}>
              Chatting here is a-maze-ing!{" "}
            </span>
          </div>
          <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
            <div className="flex space-x-4">
              {/* First Name */}
              <div className="mb-5 flex-1">
                <label
                  htmlFor="Username"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="Username"
                  name="Username"
                  value={form.Username}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=" Username"
                  required
                />
              </div>

              {/* Last Name */}
              <div className="mb-5 flex-1">
                <label
                  htmlFor="lastName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Last Name"
                  required
                />
              </div>
            </div>

            {/* Email Address */}
            <div className="mb-5">
              <label
                htmlFor="Email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email Address
              </label>
              <input
                type="text"
                id="Email"
                name="Email"
                value={form.Email}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="john.doe@example.com"
                required
              />
            </div>

            {/* Password */}
            <div className="mb-5">
              <label
                htmlFor="Password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                type="password"
                id="Password"
                name="Password"
                value={form.Password}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="********"
                required
              />
            </div>

            {/* Confirm Password */}
            <div className="mb-5">
              <label
                htmlFor="PasswordConfirmation"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="PasswordConfirmation"
                name="PasswordConfirmation"
                value={form.PasswordConfirmation}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="********"
                required
              />
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100 bg-yellow-500 text-black"
              style={{ backgroundColor: "#FFD700", color: "#000000" }}
            >
              Sign Up
            </button>

            {/* Sign-up options */}
            <div className="mt-16 grid space-y-4">
              <button className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100">
                <div className="relative flex items-center space-x-4 justify-center">
                  <img
                    src="https://tailus.io/sources/blocks/social/preview/images/google.svg"
                    className="absolute left-0 w-5"
                    alt="google logo"
                  />
                  <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">
                    Continue with Google
                  </span>
                </div>
              </button>
              <button className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100">
                <div className="relative flex items-center space-x-4 justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="absolute left-0 w-5 text-gray-700"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.20-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                  </svg>
                  <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">
                    Continue with Github
                  </span>
                </div>
              </button>
            </div>

            <div className="mt-32 space-y-4 text-gray-600 text-center sm:-mb-8">
              <p className="text-xs">
                By proceeding, you agree to our{" "}
                <a href="#" className="underline">
                  Terms of Use
                </a>{" "}
                and confirm you have read our{" "}
                <a href="#" className="underline">
                  Privacy and Cookie Statement
                </a>
                .
              </p>
              <p className="text-xs">
                This site is protected by reCAPTCHA and the{" "}
                <a href="#" className="underline">
                  Google Privacy Policy
                </a>{" "}
                and{" "}
                <a href="#" className="underline">
                  Terms of Service
                </a>{" "}
                apply.
              </p>
            </div>
          </form>
        </div>
      </div>
      {/* Modal */}
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            width: 500,
            backgroundColor: "white",
            border: "2px solid #000",
            borderTop: '7px solid #FFD700',
            borderRadius: '12px',
            boxShadow: 24,
            p: 4,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: 'center',
          }}
        >
          <Typography id="modal-modal-title" variant="h5" sx={{ fontWeight: 'bold', color : "black" }} component="h2">
            Confirm your email
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Hi {form.Username}!
             Please confirm your email address by clicking the link sent to <strong>{form.Email}</strong>
          </Typography>
          <Button onClick={handleCloseModal} 
          variant="contained" 
          color="primary" 
          sx={{ mt: 2, width: '100%', paddingTop: '11px', fontSize: '1rem', 
          paddingBottom: '12px', textTransform: 'none', backgroundColor: "black", 
          color: '#fff', marginLeft: 'auto', marginRight: 'auto',}}>
            I've Confirmed My Email
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default SignUpForm;