import React from "react";
import logo from "../assets/logo.png"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

export default function Header() {
    return(
        <header className="flex items-center justify-between pb-[70px]">
            <div id="header-left-panel" className="flex ">
                <img src={logo} alt={"logo"} className="w-[40px]"></img>
            </div>
            <div id="header-left-panel" className="flex gap-6 font-medium">
                <li className="no-underline hover:underline decoration-2 decoration-sky-500 underline-offset-8">Features</li>
                <li className="no-underline hover:underline decoration-2 decoration-sky-500 underline-offset-8">Privacy & safety</li>
            </div>
        </header>
    )
}