import React, { useState } from "react";
import { FaPhone, FaVideo, FaPaperclip, FaSearch, FaPaperPlane } from "react-icons/fa";

const ChatBox = ({ user }) => {
    const [messages, setMessages] = useState([
        { sender: "me", text: "Salut ! Comment vas-tu ?", time: "10:30 AM" },
        { sender: "other", text: "Je vais bien, et toi ?", time: "10:31 AM" },
    ]);
    const [newMessage, setNewMessage] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    const sendMessage = () => {
        if (newMessage.trim() !== "") {
            setMessages([...messages, { sender: "me", text: newMessage, time: "10:32 AM" }]);
            setNewMessage("");
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-lg">
            {/* Header */}
            <div className="flex items-center justify-between bg-purple-600 text-white p-4 rounded-t-lg">
                <h2 className="text-lg font-semibold">{user.name}</h2>
                <div className="flex space-x-4">
                    <FaPhone className="cursor-pointer hover:text-gray-200" size={20} />
                    <FaVideo className="cursor-pointer hover:text-gray-200" size={20} />
                </div>
            </div>

            {/* Barre de recherche */}
            <div className="p-2 bg-gray-100 flex items-center space-x-2">
                <FaSearch className="text-gray-400" />
                <input
                    type="text"
                    placeholder="Rechercher un message..."
                    className="w-full p-2 outline-none bg-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Messages */}
            <div className="h-[50vh] overflow-y-auto p-4 space-y-3">
                {messages
                    .filter((msg) => msg.text.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map((msg, index) => (
                        <div
                            key={index}
                            className={`flex ${
                                msg.sender === "me" ? "justify-end" : "justify-start"
                            }`}
                        >
                            <div
                                className={`max-w-xs p-3 rounded-lg ${
                                    msg.sender === "me"
                                        ? "bg-purple-500 text-white"
                                        : "bg-gray-200 text-black"
                                }`}
                            >
                                <p>{msg.text}</p>
                                <span className="text-xs text-gray-300">{msg.time}</span>
                            </div>
                        </div>
                    ))}
            </div>

            {/* Zone d'écriture */}
            <div className="flex items-center p-3 border-t">
                <label htmlFor="file-upload" className="cursor-pointer">
                    <FaPaperclip size={20} className="text-gray-500" />
                </label>
                <input type="file" id="file-upload" className="hidden" />
                <input
                    type="text"
                    placeholder="Écrire un message..."
                    className="w-full p-2 outline-none border rounded-lg mx-2"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                />
                <button onClick={sendMessage} className="bg-purple-600 text-white p-2 rounded-lg">
                    <FaPaperPlane size={20} />
                </button>
            </div>
        </div>
    );
};

export default ChatBox;
