import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';

export default function Profile() {
  const { register, handleSubmit } = useForm();
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
  
  function showModal() {
    const profileModal = document.getElementById('profileModal');
    profileModal.classList.remove('hidden');
  }

  function hideModal() {
    const profileModal = document.getElementById('profileModal');
    profileModal.classList.add('hidden');
  }
  
  const onSubmit = async (data) => {3
    let profilePicture = document.getElementById("profilePicture");
    const file = profilePicture.files[0]; 
    console.log(file)

    const formData = new FormData();
    formData.append('file', file);
    console.log(formData)

    try {
      const response = await fetch("http://localhost:3000/users/update-profile-picture", {
        method: "POST",
        body: formData,
        credentials: "include",
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
      const uploadData = await response.json();
      console.log("Upload successful:", uploadData);
      hideModal();
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-col gap-2">

      <h2 className="text-2xl bold border-b-4 border-b-grey-500">Your profile</h2>
      <h2 className="text-2xl bold pt-8">{username}</h2>
      
      <div>
        <img src={image} className="pb-3 w-[40px]"></img>
          <a href="/update-profile-picture" className="mt-6 bg-blue-500 hover:bg-indigo-600 text-white font-bold mb-2 py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            update profile picture
          </a>
        <button onClick={showModal}>Update profile picture</button>

        <div id="profileModal" className="hidden pt-6">
          <form id="UpdateProfilePicture" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2" method="POST" encType="multipart/form-data" action="">
            <div className="flex flex-row gap-4">
              <label htmlFor="profilePicture">Choose a profile picture:</label>
              <input type="file" {...register("image")} id="profilePicture" name="file" accept="image/png, image/jpeg" required/>
            </div>
            <div className="flex flex-row gap-2">
              <button type="button" className="mt-6 bg-red-500 hover:bg-indigo-600 text-white font-bold mb-2 py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={hideModal}>Cancel</button>
              <button type="submit" className="mt-6 bg-blue-500 hover:bg-indigo-600 text-white font-bold mb-2 py-2 px-4 rounded focus:outline-none focus:shadow-outline">Update</button>
            </div>
          </form>
        </div>
      </div>

    </div>
  );
}
