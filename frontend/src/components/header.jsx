import React from "react";
import logo from "../assets/logo.png"

export default function Header() {
    return(
        <header className="flex flex-row items-center justify-between pb-[70px]">
            <div id="header-left-panel" className="flex ">
                <a href="/">
                    <img src={logo} alt={"logo"} className="w-[40px]"></img>
                </a>
            </div>

            <div id="header-left-panel" className="flex gap-6 font-medium">
                <a href="/features" className="text-black no-underline hover:underline decoration-2 decoration-sky-500 underline-offset-8">
                    <li>Features</li>
                </a>
                
                <a href="privacy" className="text-black no-underline hover:underline decoration-2 decoration-sky-500 underline-offset-8">
                    <li>Privacy & safety</li>
                </a>
            </div>

        </header>
    )
}