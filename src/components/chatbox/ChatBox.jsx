import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000"); // Connexion au serveur Socket.IO

const Chat = () => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Écoute les messages entrants
        socket.on("receive_message", (data) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        });

        return () => {
            socket.disconnect(); // Déconnexion propre lors du démontage du composant
        };
    }, []);

    const sendMessage = () => {
        if (message.trim() !== "") {
            socket.emit("send_message", message);
            setMessage(""); // Réinitialiser l'input après l'envoi
        }
    };

    return (
        <div className="p-4 border w-[50vw] mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-4">Chat en Temps Réel</h2>
            <div className="border p-4 h-[300px] overflow-y-auto mb-4">
                {messages.map((msg, index) => (
                    <div key={index} className="p-2 bg-gray-200 rounded-lg mb-2">
                        {msg}
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tape un message..."
                className="border p-2 w-[80%] rounded-lg"
            />
            <button onClick={sendMessage} className="ml-2 bg-blue-500 text-white p-2 rounded-lg">
                Envoyer
            </button>
        </div>
    );
};

export default Chat;
