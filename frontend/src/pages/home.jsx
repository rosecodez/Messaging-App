import React from "react";

export default function Home () {
    return(
        <div>
            <div className="flex items-center">
                <div id="home-left-panel" className="align-left pr-[150px]">
                    <p id="headerp" className="text-[70px] font-bold leading-[75px] pb-[50px]">Hang out anytime, anywhere</p>
                    <p className="text-[18px] mb-[10px] text-[#595959]">Messaging app makes it easy and fun to stay close to your favorite people.</p>
                    <div>
                        <a href="/signup">
                            <button className='mt-6 bg-blue-500 hover:bg-indigo-600 text-white font-bold mb-2 py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Create account</button>
                        </a>
                        <p className="text-[12px] text-[#59599]">By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use.</p>

                    </div>
                </div>
                <div id="home-right-panel">
                    <p className="bg-slate-300 w-[400px] h-[500px] flex items-center justify-center">Image placeholder</p>
                </div>
            </div>
        </div>
        
    )
}
