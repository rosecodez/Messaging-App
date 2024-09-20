import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [username, setUsername] = useState('');
  const [image, setImage] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3000/users/profile`,  {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
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
        setImage(data.user.profile)
        setLoading(false);
        console.log("Profile data:", data);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, [navigate]);
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-row items-center gap-2">
      <h2 className="text-2xl bold">Welcome, {username}!</h2>
      <img src={image}></img>
    </div>
  );
}
