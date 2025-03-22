import React, { useState, useEffect } from 'react';
import { FaInbox, FaStar, FaArchive } from 'react-icons/fa';
import FriendCard from '../components/card/Friend_card';
import { io } from 'socket.io-client';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const apiUrl = import.meta.env.VITE_API_URL;


const Message = () => {
    const navigate = useNavigate();
    const [userConnected, setUserConnected] = useState(null);
    const [activeTab, setActiveTab] = useState("Tout");
    const [selectedFriend, setSelectedFriend] = useState(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);
    const [listeAmis, setListeAmis] = useState([]);

    const categories = [
        { id: 1, name: "Tout", icon: <FaInbox /> },
        { id: 2, name: "Archived", icon: <FaArchive /> },
        { id: 3, name: "Starred", icon: <FaStar /> }
    ];


    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            try {
                const user = JSON.parse(userData);
                setUserConnected(user.data.utilisateur);
                // console.log("Utilisateur connecté :", user);
            } catch (error) {
                console.error("Erreur lors du parsing des données utilisateur :", error);
            }
        } else {
            console.log("Aucun utilisateur connecté");
            navigate("/login");
        }
    }, [navigate]);
    // Charger la liste des utilisateurs
    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const res = await axios.get(`${apiUrl}/utilisateurs/listes`);
                console.log("Données reçues :", res.data.data); // Vérifiez les données reçues
                setListeAmis(res.data.data);
            } catch (error) {
                console.error("Erreur lors du chargement des utilisateurs :", error);
            }
        };

        fetchFriends();
    }, []);

    // Initialiser socket.io
    useEffect(() => {
        const newSocket = io(`${apiUrl}`);
        setSocket(newSocket);

        return () => newSocket.disconnect();
    }, []);

    // Écoute des messages entrants
    useEffect(() => {
        if (socket) {
            socket.on('receiveMessage', (newMessage) => {
                setMessages((prevMessages) => [...prevMessages, newMessage]);
            });
        }
    }, [socket]);

    // Charger les messages quand on sélectionne un ami
    useEffect(() => {
        const fetchMessages = async () => {
            if (!selectedFriend) return;
            try {
                const res = await axios.get(`${apiUrl}/messages/${selectedFriend.id}`);
                setMessages(res.data);
            } catch (err) {
                console.error("Erreur chargement messages :", err);
            }
        };

        fetchMessages();
    }, [selectedFriend]);

    // Envoyer un message
    const sendMessage = () => {
        if (message.trim() && selectedFriend && socket) {
            const newMessage = {
                sender: 'Vous',
                content: message,
                timestamp: new Date().toLocaleTimeString(),
            };

            socket.emit('sendMessage', {
                chatId: selectedFriend.id,
                message: newMessage,
            });

            setMessages((prevMessages) => [...prevMessages, newMessage]);
            setMessage('');
        }
    };

    return (
        <div className='flex flex-col lg:flex-row mt-20 justify-between px-2'>
            {/* Sidebar */}
            <div className='border p-4 w-full lg:w-[20vw] min-h-[90vh] rounded-lg'>
                <h3 className='text-2xl font-bold'>Chats</h3>

                {/* Tabs */}
                <div className='flex flex-col md:flex-row justify-between my-4'>
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setActiveTab(category.name)}
                            className={`flex items-center gap-2 px-3 py-1 rounded-lg ${
                                activeTab === category.name ? 'bg-orange-400 text-white' : 'bg-gray-100'
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
                                key={ami.Id}
                                nom={ami.Nom}
                                contenu={ami.Email || '...'}
                                heure={ami.heure || '00:00'}
                                image={ami.Avatar || '/user.jpg'}
                                onClick={() => setSelectedFriend(ami)}
                            />
                        ))
                    ) : (
                        <p className="text-gray-500">Aucun ami trouvé</p>
                    )}
                </div>
            </div>

            {/* Chat Area */}
            <div className='border rounded-lg flex justify-center items-center p-4 w-full lg:w-[78vw] min-h-[90vh] mt-4 lg:mt-0'>
                <div className='w-full h-full p-2'>
                    {selectedFriend ? (
                        <>
                            {/* En-tête du chat */}
                            <div className='w-full h-[100px] flex items-center border px-4'>
                                <img src={selectedFriend.Avatar || '/user.jpg'} alt="" className='size-[70px] mx-4 object-cover rounded-full' />
                                <h3 className='text-xl font-semibold'>{selectedFriend.Nom}</h3>
                            </div>

                            {/* Messages */}
                            <div className='bg-slate-50 p-4 h-[65vh] overflow-y-auto flex flex-col gap-3'>
                                {messages.map((msg, index) => (
                                    <div
                                        key={index}
                                        className={`p-3 rounded-lg max-w-full md:max-w-[70%] ${
                                            msg.sender === 'Vous' ? 'bg-orange-400 text-white self-end' : 'bg-gray-200 self-start'
                                        }`}
                                    >
                                        {msg.content}
                                        <span className='block text-xs text-gray-500 mt-1'>{msg.timestamp}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Zone de saisie */}
                            <div className='border-t p-2 flex'>
                                <input
                                    type="text"
                                    placeholder="Écrire un message..."
                                    className='w-full p-2 border rounded-lg'
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                                />
                                <button
                                    className='ml-2 bg-purple-400 text-white px-4 py-2 rounded-lg'
                                    onClick={sendMessage}
                                >
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