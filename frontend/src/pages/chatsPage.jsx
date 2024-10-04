import React, { useState, useEffect } from "react";
import ProfileHeader from "../components/ProfileHeader";
import searchIcon from "../assets/icons8-search-50.png";
import imageIcon from "../assets/icons8-image-50.png";
import threeDots from "../assets/icons8-3-dots-30.png";
import { DateTime } from "luxon";

export default function ChatsPage() {
    const [showImageIcon, setShowImageIcon] = useState(true);
    const [contacts, setContacts] = useState([]);
    const [previousTarget, setPreviousTarget] = useState(null);
    const [contactId, setContactId] = useState(null);
    const [contactProfile, setContactProfile] = useState("");
    const [contactUsername, setContactUsername] = useState("");
    const [messages, setMessages] = useState([]);
    const [conversationId, setConversationId] = useState(null);
    const [displayChatRightSide, setDisplayChatRightSide] = useState(false);
    const [participants, setParticipants] = useState([]);
    const [colors, setColors] = useState([]);
    const [convUsers, setConvUsers] = useState([]);

    let [messageText, setMessageText] = useState("");


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
    const getContactDetails = async (userId, conversationId) => {
        try {
            const contactDetailsResponse = await fetch(`http://localhost:3000/users/${userId}/details?conversationId=${conversationId}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: "include",
            });


            if (!contactDetailsResponse.ok) {
                console.error("Error fetching contact details");
                return;
            }
            const contactDetailsData = await contactDetailsResponse.json();

            setContactId(contactDetailsData.user.id);
            setContactProfile(contactDetailsData.user.profile);
            setContactUsername(contactDetailsData.user.username)
            
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
                    conversationId
                }),
            });
            if (!response.ok) {
                console.error("Failed to send message");
            }
            const newMessage = await response.json();

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
            console.log("conversation", conversation);
            console.log("conversation messages", conversation.messages);
            console.log("conversation participants", conversation.participants);

            setConversationId(conversation.id);
            setMessages(conversation.messages);
            setParticipants(conversation.participants);
            
            console.log("conv users", users)
            return conversation
            
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
                                    contacts.map
                                    (
                                        (contact) =>
                                            <li key={contact.id} className="cursor-pointer m-2 flex gap-1 items-center" onClick=
                                            {
                                                async(e) => {
                                                    //clear form when switching between users
                                                    setDisplayChatRightSide(true)
                                                    setMessageText("");

                                                    // change font weight to bold on selected user
                                                    if (previousTarget) {
                                                        previousTarget.style.fontWeight = "normal";
                                                    }
                                                    e.currentTarget.style.fontWeight = "bold";
                                                    setPreviousTarget(e.currentTarget);

                                                    try {
                                                        const conversation = await getConversation(contact.id);
                                                        await getContactDetails(contact.id, conversation.id);
                                                    } catch (error) {
                                                        console.log(error)
                                                    }
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
                        <ul>   

                            {
                                /* - map conversation messages,
                                   - display participant messages left/right with different colours
                                   
                                   - to do: sort messages by sentAt time
                                   - to do: could compare time when message was sent with current time 
                                            to add something like "just now, 2mins ago etc."    */
                            }

                            {messages.map((message) => {
                                let [participantColor1, participantColor2] = '';

                                {
                                    /* you/ logged in user*/
                                }

                                if (participants[1] && message.userId === participants[1].id) {
                                    participantColor1 = participants[1].color;
                                    let formattedDate = DateTime.fromISO(message.sentAt).toLocaleString(DateTime.DATETIME_MED);
                                    return (
                                        <div className="flex flex-col content-start text-wrap gap-1 items-center justify-end">
                                            <p className="text-[13px] self-start">{message.user.username}</p>
                                            <li key={message.id} className="text-white self-start w-min rounded-lg bg-indigo-500 m-2 p-3">
                                                <p>{message.text}</p>
                                            </li>
                                            
                                            <p className="text-[13px] self-start">{formattedDate}</p>
                                        </div>
                                        
                                        
                                    );
                                    
                                {
                                    /* second user*/
                                }
                                
                                } else if (participants[0] && message.userId === participants[0].id) {
                                    participantColor2 = participants[0].color;
                                    let formattedDate = DateTime.fromISO(message.sentAt).toLocaleString(DateTime.DATETIME_MED);
                                    return (
                                        <div className="flex flex-col content-start text-wrap gap-1 items-center justify-start">
                                            <p className="text-[13px] self-end">You</p>
                                            <li key={message.id} className="text-white self-end w-min rounded-lg bg-blue-500 mb-2 p-3">
                                                <p>{message.text}</p>
                                            </li>
                                            <p className="text-[13px] self-end">{formattedDate}</p>
                                        </div>
                                    );
                                }
                            })}
                        </ul>
                    </div>
                    
                    {displayChatRightSide &&
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
                    }
                    
                    
                </div>
                  
            </div>
            
        </div>
    )
}