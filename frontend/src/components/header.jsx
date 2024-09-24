import React, { useState } from "react";
import logo from "../assets/logo.png"
import { useEffect } from "react";
export default function Header() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    
    useEffect(() => {
      const checkAuth = async () => {
        try {
          const response = await fetch("http://localhost:3000/check-authentication", {
            credentials: "include",
          });
          const data = await response.json();
          console.log("Auth Data:", data);

          if (data.isAuthenticated) {
            setIsAuthenticated(true);
            setUser(data.user);
          } else {
            setIsAuthenticated(false);
          }
        } catch (error) {
          console.error("Error checking authentication:", error);
        }
      };

      checkAuth();
    }, []);

    console.log(isAuthenticated);
    
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
                
                <a href="/privacy" className="text-black no-underline hover:underline decoration-2 decoration-sky-500 underline-offset-8">
                  <li>Privacy & safety</li>
                </a>

                {isAuthenticated && (
                  <a href="/profile" className="text-black no-underline hover:underline decoration-2 decoration-sky-500 underline-offset-8">
                  <li>Profile</li>
                </a>
                )}
            </div>

        </header>
    )
}