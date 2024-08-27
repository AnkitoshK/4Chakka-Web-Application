import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './Pages/Home/Home';
import Services from './Pages/Services/Services';
import AboutUs from './Pages/About/AboutUs';
import ContactUs from './Pages/ContactUs/ContactUs';
import Feedback from './Pages/Feedback/Feedback';
import Admin from './Pages/Admin/Admin';
import Footer from './components/Footer/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contactUs" element={<ContactUs />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
          <ToastContainer />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
