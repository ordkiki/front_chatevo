import React from 'react';
import { FaCircle } from 'react-icons/fa';

const FriendCard = () => {
    return (
        <div className='flex items-center p-3  rounded-lg  hover:bg-gray-200 transition'>
            {/* Avatar */}
            <div className='relative w-12 h-12 rounded-full bg-blue-700 flex items-center justify-center text-white'>
                <img src="" alt="User" className='w-full h-full rounded-full object-cover' />
                <FaCircle className='absolute bottom-0 right-0 text-green-500' size={12} />
            </div>

            {/* Infos utilisateur */}
            <div className='ml-3 flex-grow'>
                <h3 className='text-md font-semibold'>Vladimir Poutine</h3>
                <p className='text-sm text-gray-500'>Opération Cake 2...</p>
            </div>

            {/* Heure */}
            <span className='text-xs text-gray-400'>20h</span>
        </div>
    );
};

export default FriendCard;
