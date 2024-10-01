import React, { useState, useEffect } from "react";
import ProfileHeader from "../components/ProfileHeader";
import searchIcon from "../assets/icons8-search-50.png";
import imageIcon from "../assets/icons8-image-50.png";
import threeDots from "../assets/icons8-3-dots-30.png";

export default function ChatsPage() {
    const [showImageIcon, setShowImageIcon] = useState(true);
    const [contacts, setContacts] = useState([]);
    const [previousTarget, setPreviousTarget] = useState(null);
    const [contactId, setContactId] = useState(null);
    const [contactProfile, setContactProfile] = useState("");
    const [contactUsername, setContactUsername] = useState("");
    const [contactMessages, setContactMessages] = useState([]);
    let [messageText, setMessageText] = useState("");

    /* what do i want to display in the conversation?
    - first check if user is logged in, to handle the possible error
    messages from a conversation, between 2 users
    who are these users? 1->frontend(that we are fetching, "contactId" stores the id)
                                -> how will i use the id in frontend to access backend, so i need to send it somehow
                          2->backend(that we are logged in with -> req.user.session)
    ?how will the route look like
    -> conversation route to first check existing conversation or create a new one
        with:
            - participants [];
            - messages []; 
    -> how is this conversation created? what triggers it?
        - whenever we press Send, BUT it also creates a text, so basically when a text is created
    
    -> when are the conversations going to be display?
        = when we click on an user, we want to display the texts
    --> texts should be fetched with their user relationship, so i dont need to make another route
    */

    // get all contacts
    useEffect(() => {
        const getAllContacts = async () => {
            try {
            const response = await fetch("http://localhost:3000/users/get-all-contacts", {
                credentials: "include",
            });
            const data = await response.json();""
            console.log("getAllContacts:", data);
            setContacts(data);
            } catch (error) {
            console.error("Error getting contacts:", error);
            }
        };

        getAllContacts();
    }, []);

    // fetch contact details
    const getContactDetails = async (userId) => {
        try {
            const contactDetailsResponse = await fetch(`http://localhost:3000/users/${userId}/details`, {
                credentials: "include",
            });
            const contactDetailsData = await contactDetailsResponse.json();
            setContactId(contactDetailsData.user.id);
            setContactProfile(contactDetailsData.user.profile);
            setContactUsername(contactDetailsData.user.username)
            console.log(contactDetailsData);
        } catch (error) {
        console.error("Error fetching contact details", error);
        }
    }

    const sendMessageText = async () => {
        if (messageText === "") {
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/messages/new-message`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: "include",
                body: JSON.stringify({
                    text: messageText,
                }),
            });
            if (!response.ok) {
                console.error("Failed to send message");
            }
            const newMessage = await response.json();
            setContactMessages((prevMessages) => [...prevMessages, newMessage]);
            
            console.log(newMessage)
            setMessageText("");
        } catch (error) {
            console.error("Error in sendMessageText:", error);
        }
    };
    const getConversation = async(id) => {
        try {
            const response = await fetch("http://localhost:3000/messages/conversation", {
                method: "POST",
                headers: {
                    'Content-Type': "application/json" ,
                },
                credentials: "include",
                body: JSON.stringify({
                    userId: id,
                }),
            })
            if(!response.ok) {
                console.error("Failed to fetch conversation")
            }
            const conversation = await response.json();
            console.log("conversation", conversation)
        } catch(error) {
            console.log("Error in getConversation", error)
        }
    }
    return (
        <div>
            <ProfileHeader />
            <div id="chats" className="border border-sky-500 flex max-h-[700px]">
                <div id="chats-left-side" className="pl-2 mr-4 border border-red-500 w-[300px] flex flex-col">
                        <header className="text-2xl font-medium py-2">Chats</header>
                        <div>
                            <img src={searchIcon} className="pt-3 pl-1 pr-1  w-[30px] absolute" />
                            <input type="search" name="search" className="mb-4 pl-8 mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 
                            placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Search Messenger" />
                        </div>
                        <div className="overflow-auto ">
                            <ul>
                                {
                                    
                                    contacts.map((contact) =>
                                            <li key={contact.username} className="cursor-pointer m-2 flex gap-1 items-center" onClick={(e) => {
                                                // fetch selected contact details
                                                getContactDetails(contact.id);
                                                getConversation(contact.id);
                                                //clear form when switching between users
                                                setMessageText("");

                                                // change font weight to bold on selected user
                                                if (previousTarget) {
                                                    previousTarget.style.fontWeight = "normal";
                                                }
                                                e.currentTarget.style.fontWeight = "bold";
                                                setPreviousTarget(e.currentTarget);

                                            }}>
                                                <img src={contact.profile}/>
                                                {contact.username}</li>
                                        
                                    )
                                    
                                }
                            </ul>
                        </div>
                </div>

                <div id="chats-right-side" className="pl-3 flex flex-col border border-green-500 w-full justify-between">
                    <div id="chats-right-side-top" className="flex flex-row items-center">
                        <div className="flex items-center space-x-2 py-2">
                            <img src={contactProfile}/>
                            <div className="text-xl font-medium">{contactUsername}</div>
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
                            value={messageText}
                            onInput={(e) => {
                                setMessageText(e.target.value);
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

                        <button onClick={sendMessageText}>Send</button>
                        
                    </div>
                    
                </div>
                  
            </div>
            
        </div>
    )
}