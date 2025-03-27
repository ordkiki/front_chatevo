import React, { useContext , useState, useEffect } from 'react';
import { FaComments, FaSearch, FaUserFriends, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import { NavbarContext } from '../../context/NavbarContext';

const navigations = [
    { name: "Discussions", icon: <FaComments /> },
    { name: "Amis", icon: <FaUserFriends /> },
    { name: "Paramètres", icon: <FaCog /> }
];

const Navbar = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const { activeTab, setActiveTab } = useContext(NavbarContext);

    if (!activeTab || !setActiveTab) {
        return <div>Erreur : SidebarContext non fourni.</div>;
    }

    // Fonction de déconnexion
    const handleLogout = () => {
        localStorage.removeItem('user');
        console.log('Déconnexion...');
        alert('Vous êtes déconnecté.');
        navigate("/login");
    };

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            try {
                const user = JSON.parse(userData);
                setUserData(user.data.utilisateur);
                console.log("Utilisateur connecté :", user.data.utilisateur.Nom);
            } catch (error) {
                console.error("Erreur lors du parsing des données utilisateur :", error);
            }
        } else {
            console.log("Aucun utilisateur connecté");
            navigate("/login");
        }
    }, [navigate]);

    return (
        <div className='p-4 flex flex-col md:flex-row justify-between items-center w-screen border fixed top-0 left-0 bg-white z-50'>
            {/* Logo et barre de recherche */}
            <div className='flex items-center mb-4 md:mb-0'>
                <h3 className='text-orange-400 font-bold text-xl'>i-tatasika</h3>
                <form action="" className='bg-zinc-50 rounded-lg border flex items-center mx-4' method="get">
                    <input
                        type="text"
                        className='bg-zinc-50 outline-none px-2 py-1 w-32 md:w-48'
                        placeholder='Rechercher...'
                    />
                    <button className='hover:bg-orange-400 transition p-2 rounded-r-lg hover:text-white text-orange-400 text-xl'>
                        <FaSearch />
                    </button>
                </form>
            </div>

            {/* Navigation */}
            <div className='flex space-x-4 md:space-x-6'>
                {navigations.map((nav) => (
                    <div
                        key={nav.name}
                        onClick={() => setActiveTab(nav.name)}
                        className={`cursor-pointer p-2 rounded-lg text-xl ${
                            activeTab === nav.name
                                ? 'bg-orange-400 text-white'
                                : 'text-gray-500 hover:text-orange-400'
                        }`}
                    >
                        {nav.icon}
                    </div>
                ))}
            </div>

            {/* Utilisateur + Dropdown */}
            <div className='relative flex items-center space-x-4 md:space-x-6'>
                {userData && (
                    <div className="relative">
                        <button
                            onClick={() => setShowDropdown(!showDropdown)}
                            className='flex items-center text-gray-700 hover:text-orange-400 transition p-2 rounded-lg text-md font-semibold'
                        >
                            {userData.Nom}
                        </button>

                        {showDropdown && (
                            <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-50">
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-orange-100 flex items-center"
                                >
                                    <FaSignOutAlt className="mr-2" /> Déconnexion
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
