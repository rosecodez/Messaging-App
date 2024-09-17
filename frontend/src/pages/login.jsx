import React from "react";
import logo from "../assets/logo.png"
import LoginForm from "../components/login-form";

export default function Login() {
    return (
        <div className="flex flex-col items-center pt-[200px]">
            <a href="/">
                <img src={logo} alt={"logo"} className="w-[80px]"></img>
            </a>
            <p className="text-[30px] pt-10">Connect with your favorite people.</p>
            <LoginForm/>
        </div>
    )
}