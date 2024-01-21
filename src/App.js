import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login_Page from './components/Login_Page';
import CreateGif from './components/CreateGif'; 

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login_Page />} />
          <Route path="/CreateGif" element={<CreateGif />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
