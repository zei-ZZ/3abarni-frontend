import { useState } from "react";
import UIImage from "../assets/images/UI.png"; 
import LogoImage from "../assets/images/logo.png"; 
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from 'react-router-dom';
import "../styles/ForgetPassword.css"; 
import ImageA from "../assets/images/pngegg copie 2.png"


const ForgetPassword = () => {
  const [form, setForm] = useState({
    email: "",
  });

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Add your form submission logic here
    try {
      const response = await axiosInstance.post("/Auth/recoverAccount", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Form submitted:", response.data);
    } catch (err) {
      console.error("error: ", err);
    }
  };

  return (

    <div className="bg-white justify-center flex h-screen w-screen relative">
        
        
            <div className="flex-shrink-0 w-1/4 ">
            {/* Left Section */}
                

                    <div className="relative w-[200px] h-[150px] top-[70%] left-[12%] transform translate-x-[-50%]">

                    <div className="left-0 bg-[#ffcc00a6] border-black absolute w-[300px] h-[270px] top-0 border-[5px] border-solid" />
                        
                            <img
                                className="absolute w-[200px] h-[200px] top-[30px] left-[60px] object-cover"
                                alt="Pngegg" src={ImageA}
                            />
                    </div>
               
            </div>

            <div className="flex-shrink-0 w-2/4 ">
            {/* Middle Section (Largest) */}
                <img className="absolute w-[200px] h-[100px] top-[130px] left-[42%]" alt="Group" src="https://c.animaapp.com/nReCHFyN/img/group-16.svg"/>
                <h3 className="absolute top-[250px] w-[650px] left-[380px] [font-family:'Lexend_Exa',Helvetica] font-bold text-black text-[40px] text-center tracking-[0] leading-[normal]">
                    Recover my account!    
                </h3>
                
                <p className="absolute w-[600px] top-[320px] left-[430px] [font-family:'Lexend_Exa',Helvetica] font-extralight text-black text-[20px] tracking-[0] leading-[normal]">
                Having an identity crisis? you can recover your PacChat account using your email address
                </p>
                <div className="mb-5 absolute w-[500px] top-[390px] left-[470px]">
                <label htmlFor="email" className="block mb-2 text-s font-medium text-black dark:text-white" >
                Recover using your email address
                 </label>
                    <input
                            type="text" id="email" name="email" value={form.email} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@example.com" required />
                <div class="grid grid-cols-2 divide-x-0">
                    <div>
                    <button
                        type="submit"
                        className="group h-11 px-12 border-1 border-gray-100 rounded-2xl transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100 bg-black text-white font-semibold mt-6">
                        Account Login
                    </button>
                    </div>
                    <div className="top-[550px] ">
                    <a onClick={() => navigate("/login")}  className=" ml-10 text-sm font-medium text-primary-600 hover:underline dark:text-primary-500 cursor-pointer [font-family:'Lexend_Exa',Helvetica] font-medium text-black text-[15px] text-center tracking-[0] leading-[normal]" >
                    Return to login
                  </a>
                    </div>
                </div>
                
                </div>

         </div>
            <div className="flex-shrink-0 w-1/4">
            {/* Right Section */}
                    <div className="absolute w-[200px] h-[150px] top-[-100px] left-[1195px] transform translate-x-[-50%">
                <div className="relative w-[310px] h-[293px] top-[66px]">
                <div className="left-[10px] bg-black border-[#ffcc00] absolute w-[300px] h-[293px] top-0 border-[5px] border-solid" />
                <img
                    className="absolute w-[245px] h-[249px] top-[34px] left-0 object-cover"
                    alt="Ui"
                    src="https://c.animaapp.com/nReCHFyN/img/ui-2@2x.png"
                />
                </div>
            </div>
            </div>
    </div>

  );
};

export default ForgetPassword;