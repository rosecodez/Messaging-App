import React from "react";
import logo from "../assets/logo.png"
import SignupForm from "../components/signup-form";

export default function Signup() {
    return (
        <div className="flex flex-col items-center pt-[200px]">
            <a href="/">
                <img src={logo} alt={"logo"} className="w-[80px]"></img>
            </a>
            <p className="text-[34px] pt-10">Connect with your favorite people.</p>
            <SignupForm/>
        </div>
    )
}