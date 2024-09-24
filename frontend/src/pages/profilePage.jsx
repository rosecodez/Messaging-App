import React, { useState, useEffect } from "react";
import Profile from "../components/profile";
import ProfileHeader from "../components/ProfileHeader";

export default function ProfilePage() {

  return (
    <div>
      <ProfileHeader/>
      <Profile/>
    </div>
  )
}