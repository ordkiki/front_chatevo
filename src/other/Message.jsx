import React, { useState } from 'react';
import { FaInbox, FaStar, FaArchive } from 'react-icons/fa';
import FriendCard from '../components/card/Friend_card';
import image from '/user.jpg';

const Message = () => {
    const categories = [
        { id: 1, name: "Tout", icon: <FaInbox /> },
        { id: 2, name: "Archived", icon: <FaArchive /> },
        { id: 3, name: "Starred", icon: <FaStar /> }
    ];
    
    const [activeTab, setActiveTab] = useState("Tout");
    const [listeAmis, setListeAmis] = useState([
        { id: 1, nom: "Onja", lastMess: "Bonjour...", heure: "20h", image: image },
        { id: 2, nom: "Kiki", lastMess: "Comment ça va ?", heure: "18h", image: image }
    ]);
    
    const [selectedFriend, setSelectedFriend] = useState(null);

    return (
        <div className='flex mt-20 justify-between px-2'>
            {/* Sidebar */}
            <div className='border p-4 w-[20vw] min-h-[90vh] rounded-lg'>
                <h3 className='text-2xl font-bold'>Chats</h3>

                {/* Tabs */}
                <div className='flex justify-between my-4'>
                    {categories.map((category) => (
                        <button 
                            key={category.id}
                            onClick={() => setActiveTab(category.name)}
                            className={`flex items-center gap-2 px-3 py-1 rounded-lg ${
                                activeTab === category.name ? 'bg-blue-500 text-white' : 'bg-gray-100'
                            }`}
                        >
                            {category.icon} {category.name}
                        </button>
                    ))}
                </div>

                {/* Liste des amis */}
                <div className="overflow-y-auto max-h-[75vh]">
                    {listeAmis.length > 0 ? (
                        listeAmis.map((ami) => (
                            <FriendCard
                                key={ami.id}
                                nom={ami.nom}
                                lastMess={ami.lastMess}
                                heure={ami.heure}
                                image={ami.image}
                                onClick={() => setSelectedFriend(ami)} // Mise à jour du chat
                            />
                        ))
                    ) : (
                        <p className="text-gray-500">Aucun message</p>
                    )}
                </div>
            </div>

            {/* Chat Area */}
            <div className='border rounded-lg flex justify-center items-center p-4 w-[78vw] min-h-[90vh]'>
                <div className='w-full h-full p-2'>
                    {selectedFriend ? (
                        <>
                            {/* En-tête du chat */}
                            <div className='w-full h-[100px] flex items-center border px-4'>
                                <img src={selectedFriend.image} alt="" className='size-[70px] mx-4 object-cover rounded-full' />
                                <h3 className='text-xl font-semibold'>{selectedFriend.nom}</h3>
                            </div>

                            {/* Messages statiques */}
                            <div className='p-4 h-[65vh] overflow-y-auto flex flex-col gap-3'>
                                <div className='bg-gray-200 p-3 rounded-lg self-start max-w-[70%]'>
                                    Bonjour {selectedFriend.nom}, comment vas-tu ?
                                </div>
                                <div className='bg-blue-500 text-white p-3 rounded-lg self-end max-w-[70%]'>
                                    Ça va bien, merci ! Et toi ?
                                </div>
                            </div>

                            {/* Zone de saisie */}
                            <div className='border-t p-2 flex'>
                                <input
                                    type="text"
                                    placeholder="Écrire un message..."
                                    className='w-full p-2 border rounded-lg'
                                />
                                <button className='ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg'>
                                    Envoyer
                                </button>
                            </div>
                        </>
                    ) : (
                        <p className='text-gray-500 text-center'>Sélectionnez un chat pour commencer</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Message;
