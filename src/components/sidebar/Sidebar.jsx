import React, { useContext } from 'react';
import { FaComments, FaUserFriends, FaCog } from 'react-icons/fa';
import { SidebarContext } from '../../context/SidebarContext'; // Vérifie bien la casse du fichier

const navigations = [
    { name: "Discussions", icon: <FaComments /> },
    { name: "Amis", icon: <FaUserFriends /> },
    { name: "Starred", icon: <FaCog /> }
];

const Sidebar = () => {
    const { activeTab, setActiveTab } = useContext(SidebarContext);

    if (!activeTab || !setActiveTab) {
        return <div>Erreur : SidebarContext non fourni.</div>; // Vérification anti-erreur
    }

    return (
        <div className='w-[5vw] md:w-[5vw] bg-purple-600 text-white h-[95vh] p-4 flex flex-col items-center space-y-6 rounded-3xl m-4'>
            {navigations.map((nav) => (
                <div
                    key={nav.name}
                    onClick={() => setActiveTab(nav.name)}
                    className={`cursor-pointer p-2 rounded-lg ${activeTab === nav.name ? 'bg-white text-purple-600' : 'hover:text-gray-300'}`}
                >
                    {nav.icon}
                </div>
            ))}
        </div>
    );
};

export default Sidebar;
