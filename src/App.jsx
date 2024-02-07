import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PacmanGame from './components/PacmanGame'; // Import PacmanGame component
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import SideBar from "./components/SideBar";
import ReceiverBar from "./components/ReceiverBar";
import ParentComponent from "./components/ParentComponent"; 
import ForgetPassword from "./components/ForgetPassword";
import "./App.css";
function App() {
  return (
    <div className='App'>
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/sidebar" element={<SideBar />} />
        <Route path="/receiver" element={<ReceiverBar />} />
        <Route path="/chat" element={<ParentComponent />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/game" element={<PacmanGame />} /> {/* Use PacmanGame component on /game route */}
      </Routes>
    </Router>
    </div>
  );
}

export default App;
