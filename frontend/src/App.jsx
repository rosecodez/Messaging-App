import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/homePage'
import Login from "./pages/loginPage"
import Signup from './pages/signupPage';
import ProfilePage from './pages/profilePage';
import ChatsPage from './pages/chatsPage';
import './App.css'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/signup' element={<Signup/>}/>
                <Route path='/logout' element={<Home/>}/>
                <Route path='/profile' element={<ProfilePage/>}/>
                <Route path='/chats' element={<ChatsPage/>}/>
                
            </Routes>
        </Router>
    )
}

export default App
