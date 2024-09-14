import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home'
import Header from './components/header';
import './App.css'

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home/>}/>
            </Routes>
        </Router>
    )
}

export default App
