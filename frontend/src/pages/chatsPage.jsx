import React, { useState, useEffect } from "react";
import ProfileHeader from "../components/ProfileHeader";

export default function ChatsPage() {

    return (
        <div>
            <ProfileHeader />
            <div id="chats-left-side">
                <div>
                    <h3>Chats</h3>
                    <div>Search Messenger</div>
                </div>
            </div>
            <div id="chats-right-side">
                <div id="chats-right-side-top">
                    <div>User</div>
                    <div>Info</div>
                </div>
                <div id="chats-main">
                    <div>Conversation</div>
                </div>
                <div id="chats-right-side-bottom">
                    <div>Image</div>
                    <div>Aa</div>
                    <div>Image</div>
                </div>
            </div>
        </div>
    )
}