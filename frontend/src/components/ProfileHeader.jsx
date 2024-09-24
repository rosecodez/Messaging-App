import React from "react";

export default function ProfileHeader() {
    const handleLogout = async () => {
        try {
          const response = await fetch("http://localhost:3000/users/log-out", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: 'include',
          });
          if (!response.ok) {
            throw new Error("Logout request failed");
          }
          navigate("/login");
        } catch (error) {
          console.error("Error logging out:", error.message);
        }
    }

    return(
        <header className="flex flex-row items-center justify-between pb-[70px]">
            <div id="header-left-panel" className="flex gap-2">
                <a href="/profile" className="text-black no-underline hover:underline decoration-2 decoration-sky-500 underline-offset-8">
                Profile
                </a>

                <a href="/chats" className="text-black no-underline hover:underline decoration-2 decoration-sky-500 underline-offset-8">
                Chats
                </a>
            </div>

            <div id="header-left-panel" className="flex gap-6 font-medium">
                <a href="/logout" onClick={handleLogout} className="text-black no-underline hover:underline decoration-2 decoration-sky-500 underline-offset-8">
                Log out
                </a>
            </div>
        </header>
    )
}