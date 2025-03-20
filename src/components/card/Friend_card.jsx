import React from 'react';
import { FaCircle } from 'react-icons/fa';

const FriendCard = ({ nom, lastMess, heure, image, onClick }) => {
    return (
        <div 
            className='flex items-center p-3 rounded-lg hover:bg-gray-200 transition cursor-pointer' 
            onClick={onClick} // Ajout du onClick
        >
            {/* Avatar */}
            <div className='relative w-12 h-12 rounded-full bg-orange-400 flex items-center justify-center'>
                <img src={image} alt="User" className='w-full h-full rounded-full object-cover' />
                <FaCircle className='absolute bottom-0 right-0 text-green-500' size={12} />
            </div>

            {/* Infos utilisateur */}
            <div className='ml-3 flex-grow'>
                <h3 className='text-md font-semibold'>{nom}</h3>
                <p className='text-sm text-gray-500'>{lastMess}</p>
            </div>

            {/* Heure */}
            <span className='text-xs text-gray-400'>{heure}</span>
        </div>
    );
};

export default FriendCard;
