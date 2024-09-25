import React, { useState, useEffect } from "react";
import ProfileHeader from "../components/ProfileHeader";
import searchIcon from "../assets/icons8-search-50.png";
import imageIcon from "../assets/icons8-image-50.png";
import threeDots from "../assets/icons8-3-dots-30.png";

export default function ChatsPage() {
    const [showImageIcon, setShowImageIcon] = useState(true);

    return (
        <div>
            <ProfileHeader />
            <div id="chats" className="border border-sky-500 flex max-h-[700px]">
                <div id="chats-left-side" className="border border-red-500 w-[300px] flex flex-col">
                        <header className="text-2xl font-medium pb-2">Chats</header>
                        <div>
                            <img src={searchIcon} className="pt-2 pl-1 pr-1  w-[30px] absolute" />
                            <input type="search" name="search" className="mb-4 pl-8 mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 
                            placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Search Messenger" />
                        </div>
                        <div className="overflow-auto ">
                            <div>Users</div>
                            <div>Users</div>
                            <div>Users</div>
                            <div>Users</div>
                            <div>Users</div>
                            <div>Users</div>
                            <div>Users</div>
                            <div>Users</div>
                            <div>Users</div>
                            <div>Users</div>
                            <div>Users</div>
                            <div>Users</div>
                            <div>Users</div>
                            <div>Users</div>
                            <div>Users</div>
                            <div>Users</div>
                            <div>Users</div>
                            <div>Users</div>
                            <div>Users</div>
                            <div>Users</div>
                            <div>Users</div>
                            <div>Users</div>
                            <div>Users</div>
                            <div>Users</div>
                            <div>Users</div>
                            <div>Users</div>
                            <div>Users</div>
                            <div>Users</div>
                            <div>Users</div>
                            <div>Users</div>
                            <div>Users</div>
                            <div>Users</div>
                        </div>
                </div>

                <div id="chats-right-side" className="pl-3 flex flex-col border border-green-500 w-full justify-between">
                    <div id="chats-right-side-top" className="flex flex-row items-center">
                        <div className="flex items-center space-x-2 pb-2">
                            <div>Logo</div>
                            <div className="text-xl font-medium">User</div>
                        </div>
                        <img src={threeDots} className="ml-auto pb-2 w-[23px]" />
                    </div>

                    <div id="chats-main" className="overflow-auto">
                        <div>Text</div>
                        <div>Text</div>
                        <div>Text</div>
                        <div>Text</div>
                        <div>Text</div>
                        <div>Text</div>
                        <div>Text</div>
                        <div>Text</div><div>Text</div>
                        <div>Text</div>
                        <div>Text</div>
                        <div>Text</div><div>Text</div>
                        <div>Text</div>
                        <div>Text</div>
                        <div>Text</div><div>Text</div>
                        <div>Text</div>
                        <div>Text</div>
                        <div>Text</div><div>Text</div>
                        <div>Text</div>
                        <div>Text</div>
                        <div>Text</div><div>Text</div>
                        <div>Text</div>
                        <div>Text</div>
                        <div>Text</div><div>Text</div>
                        <div>Text</div>
                        <div>Text</div>
                        <div>Text</div>
                    </div>
                    <div id="chats-right-side-bottom" className="flex flex-row space-x-2 items-center">
                        {showImageIcon && (
                            <img src={imageIcon} className="w-[32px]" />
                        )}

                        {
                            /* when selected, hide img button insert,
                            input container box will stretch, become bigger if the user adds more characters */
                        }

                        <textarea
                            name="text"
                            onInput={(e) => {
                                if (e.target.value === '') {
                                    e.target.style.height = '30px'
                                    setShowImageIcon(true);
                                } else {
                                    e.target.style.height = 'auto';
                                    e.target.style.height = `${e.target.scrollHeight}px`;
                                    setShowImageIcon(false);
                                }
                            }}
                            className="max-h-[88px] h-[30px] w-full px-3 py-1 bg-white border shadow-sm border-slate-300 
                                placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 
                                block rounded-md sm:text-sm focus:ring-1 overflow-auto resize-none"
                            placeholder="Aa"
                        ></textarea>

                        <button>Send</button>
                        
                    </div>
                </div>
                  
            </div>
            
        </div>
    )
}