import React, { useState, useEffect } from "react";
import Profile from "../components/profile";

export default function ProfilePage() {
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

  return (
    <div>
      
      <Profile/>
    </div>
  )
}