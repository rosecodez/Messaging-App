import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [username, setUsername] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3000/users/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      credentials: "include",
    })
      .then(response => {
        if (!response.ok) {
          if (response.status === 401) {
            navigate("/login");
          }
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        setUsername(data.user.username); 
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, [navigate]);

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
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2 className="pt-5 text-2xl bold font-mono">Welcome, {username}!</h2>
      <div id="profile-links" className="flex flex-row gap-2">
      <button onClick={handleLogout} className="logout-button">
        Log out
      </button>
      </div>
    </div>
  );
}
