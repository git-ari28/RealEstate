import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import HomePage from './routes/homePage/HomePage';
import ListPage from './routes/listPage/ListPage';

import './App.css';

function App() {
  return (
    <Router>
      <div className="layout">
        <Navbar />
      </div>
      <div className="content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/list" element={<ListPage/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

