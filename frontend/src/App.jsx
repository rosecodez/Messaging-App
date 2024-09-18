import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home'
import Login from "./pages/login"
import Signup from './pages/signup';
import Profile from './components/profile';
import Header from './components/header';
import './App.css'

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/signup' element={<Signup/>}/>
                <Route path='/profile' element={<Profile/>}/>
            </Routes>
        </Router>
    )
}

export default App
