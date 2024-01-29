import React from 'react';
import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';

const App = () => {
  return (
    <div>
       <Router>
          <Routes>
             <Route path="/" element={<Signup />} />
             <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
       </Router>
    </div>
  );
}

export default App;
