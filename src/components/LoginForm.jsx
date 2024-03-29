import { useState } from "react";
import UIImage from "../assets/images/pngegg (1).png";
import LogoImage from "../assets/images/logo.png";
import "../styles/SignUpForm.css";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { theme, Modal, Box, Typography, Button } from './MaterialUIConfig'



const LoginForm = () => {
  const [form, setForm] = useState({
    Email: "",
    Password: "",
  });

  const backend_url = import.meta.env.VITE_BackendURL;

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  const [isModalOpen, setModalOpen] = useState(false);

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Add your form submission logic here
    try {
      const response = await axiosInstance.post("/Auth/login", form);
      console.log("Form submitted:", response.data);
      //const { token } = response.data;
      window.localStorage.setItem('token', response.data);
      navigate("/chat");
    } catch (err) {
      console.error("error: ", err);
      setModalOpen(true);
      if (err.response && err.response.status === 401) {
        navigate("/forgetpassword");
      }
    }
  };
  const handleCloseModal = () => {
    // Close the modal
    setModalOpen(false);
  };


  return (
    <div className="flex h-screen w-screen ">
      {/* left side with form */}



      <div
        className="flex-shrink-0 w-2/3 bg-light p-8 overflow-y-auto relative"
        style={{ padding: "5rem" }}
      >
        {/* Logo */}
        <img src={LogoImage} alt="Logo" className="mb-8 logo" />

        {/* Form container */}
        <div>
          <div className="welcome-text p-4 font-black">
            Hello!
            <br />{" "}
            <span className="font-extralight" style={{ color: "#FFD700" }}>
              Good to see you again!{" "}
            </span>
          </div>
          <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
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
                id="email"
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
                id="password"
                name="Password"
                value={form.Password}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="********"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-black dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-black dark:ring-offset-gray-800"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label className="text-black dark:text-gray-300">
                    Remember me
                  </label>
                </div>
              </div>
              <a
                onClick={() => navigate("/forgetpassword")}
                className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500 cursor-pointer"
              >
                Forgot password?
              </a>
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="group h-11 px-12 border-1 border-gray-100 rounded-2xl transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100 bg-black text-white font-semibold mt-6"
            >
              Account Login
            </button>
            <div className="mt-10 text-gray-600 text-left sm:-mb-10">
                <p>Not a member? <a
                  onClick={() => navigate("/signup")}
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500 cursor-pointer"
                >
                  Sign up NOW!!
                </a>
                </p>
              </div>
            {/* Sign-up options */}
            <div className="mt-16 grid space-y-4">
              <button className="group h-12 px-6 border-1 border-gray-300 rounded-2xl transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100">
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
              <button className="group h-12 px-6 border-1 border-gray-300 rounded-2xl transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100">
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
          </form>
          <div className="mt-10 text-gray-600 text-center sm:-mb-10">
            <p className="text-xs">
              By proceeding, you agree to our{" "}
              <a href="#" className="underline">
                {" "}
                Terms of Use{" "}
              </a>{" "}
              and confirm you have read our{" "}
              <a href="#" className="underline">
                {" "}
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
        </div>
      </div>
      {/* right side with UI image */}
      <div className="flex-shrink-0 w-1/3 bg-yellow-400">
        {/* Your UI picture goes here */}
        <img
          src={UIImage}
          alt="UI"
          className="w-full h-full object-cover transform scale-x-[-1] "
          style={{ objectPosition: "right" }}
        />
      </div>
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
          <Typography id="modal-modal-title" variant="h5" sx={{ fontWeight: 'bold', color: "black" }} component="h2">
            Oops!!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Connexion error ! Please retry after confirming your email <strong>{form.Email}</strong>
          </Typography>
          <Button onClick={handleCloseModal}
            variant="contained"
            color="primary"
            sx={{
              mt: 2, width: '100%', paddingTop: '11px', fontSize: '1rem',
              paddingBottom: '12px', textTransform: 'none', backgroundColor: "black",
              color: '#fff', marginLeft: 'auto', marginRight: 'auto',
            }}>
            Gottcha
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default LoginForm;
