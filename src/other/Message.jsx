import React, { useState } from 'react';
import { FaInbox, FaStar, FaArchive } from 'react-icons/fa';
import FriendCard from '../components/card/Friend_card'
import Sidebar from '../components/sidebar/Sidebar'
import ChatBox from '../components/chatbox/ChatBox';

const Message = () => {
    const categories = [
        { name: "Tout", icon: <FaInbox /> },
        { name: "Archived", icon: <FaArchive /> },
        { name: "Starred", icon: <FaStar /> }
    ];
    const [activeTab, setActiveTab] = useState("Tout");

    return (
        <div className='flex justify-between bg-gray-100 min-h-screen'>
            <div className='flex'>
                <div className='flex flex-col  p-4 w-[18vw]'>
                    <h1 className='font-semibold text-2xl mb-4'>Messages</h1>

                    {/* Tabs de filtres */}
                    <ul className="p-4 font-semibold  flex justify-between w-[18vw]">
                        {categories.map((category) => (
                            <li key={category.name}>
                                <button
                                    className={`flex items-center space-x-2 px-3 py-2 rounded ${activeTab === category.name ? "bg-blue-600 text-white" : "hover:bg-gray-200"
                                        }`}
                                    onClick={() => setActiveTab(category.name)}
                                >
                                    {category.icon} <span>{category.name}</span>
                                </button>
                            </li>
                        ))}
                    </ul>


                    {/* Liste des groupes */}
                    <h3 className='mt-6 text-xl font-semibold'>Groupes</h3>
                    <div className='overflow-auto max-h-40 w-[18vw] space-y-2'>
                        <FriendCard />
                        <FriendCard />
                        <FriendCard />
                    </div>

                    {/* Liste des messages personnels */}
                    <h3 className='mt-6 text-xl font-semibold'>Personnel</h3>
                    <div className='overflow-auto max-h-60 space-y-2 w-[18vw]'>
                        <FriendCard />
                        <FriendCard />
                        <FriendCard />
                        <FriendCard />
                        <FriendCard />
                    </div>
                </div>
            </div>

            <div className="p-4 w-[50vw]">
                <ChatBox user={{ name: "Jean Dupont" }} />
            </div>
            
        </div>
    );
};

export default Message;
