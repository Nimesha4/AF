import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Countries from './components/Countries';
import CountryDetails from './components/CountryDetails';
import Login from './components/Login';
import Register from './components/Register ';
import About from './components/About';
import Contact from './components/Contact';
import Gallery from './components/Gallery';
import Home from './components/Home';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/countries" element={<Countries />} />
        <Route path="/components/CountryDetails" element={<CountryDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> 
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
