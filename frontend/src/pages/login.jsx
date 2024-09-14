import React from "react";
import logo from "../assets/logo.png"

export default function Login() {
    return (
        <div className="flex flex-col items-center">
            <a href="/">
                <img src={logo} alt={"logo"} className="w-[40px]"></img>
            </a>
            <p>Connect with your favorite people.</p>
        </div>
    )
}