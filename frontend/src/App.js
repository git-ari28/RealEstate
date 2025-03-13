import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import HomePage from './routes/homePage/HomePage';
import ListPage from './routes/listPage/ListPage';
import SinglePage from './routes/singlePage/SinglePage';
import ProfilePage from './routes/ProfilePage/ProfilePage';
import Register from "./components/auth/Register"
import './App.css';
import Login from './components/auth/Login';
import ProfilePageUpdate from './components/profileUpdate/ProfilePageUpdate';
import NewPostPage from './components/newPostPage/Newpostpage';

function App() {
  return (
    <Router>
      <div className="layout">
        <Navbar />
      </div>
      <div className="content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/list" element={<ListPage/>}/>
          <Route path="/:id" element={<SinglePage/>}/>
          <Route path="/profile" element={<ProfilePage/>}/>
          <Route path="/profile/update" element={<ProfilePageUpdate/>}/>
          <Route path="/addpost" element={<NewPostPage/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

