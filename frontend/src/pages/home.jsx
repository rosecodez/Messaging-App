import React from "react";

export default function Home () {
    return(
        <div className="flex items-center">
            <div id="home-left-panel align-left">
                <p id="headerp" className="text-[70px] font-bold leading-[75px] pb-[50px]">Hang out anytime, anywhere</p>
                <p className="text-[18px] mb-[10px] text-[#595959]">Messaging app makes it easy and fun to stay close to your favorite people.</p>
                <div>
                    <button className="bg-blue-400 hover:bg-indigo-500 mb-[10px]">Create account</button>
                    <p className="text-[12px] text-[#59599]">By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use.</p>
                    <p className="pt-[50px]">Already have an account?</p>
                    <button className="bg-blue-400 hover:bg-indigo-500">Log in</button>
                </div>
            </div>
            <div id="home-right-panel">
                <p className="bg-slate-300 w-[400px] h-[500px] flex items-center justify-center">Image placeholder</p>
            </div>
        </div>
    )
}
