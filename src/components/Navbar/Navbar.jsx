import React, { useContext } from 'react';
import { FaComments, FaSearch, FaUserFriends, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { NavbarContext } from '../../context/NavbarContext'; // Vérifie bien la casse du fichier

const navigations = [
    { name: "Discussions", icon: <FaComments /> },
    { name: "Amis", icon: <FaUserFriends /> },
    { name: "Paramètres", icon: <FaCog /> }
];

const Navbar = () => {
    const { activeTab, setActiveTab } = useContext(NavbarContext);

    if (!activeTab || !setActiveTab) {
        return <div>Erreur : SidebarContext non fourni.</div>; // Vérification anti-erreur
    }

    // Fonction de déconnexion
    const handleLogout = () => {
        // Ajoutez ici la logique de déconnexion (par exemple, supprimer le token, rediriger, etc.)
        console.log('Déconnexion...');
        alert('Vous êtes déconnecté.');
    };

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
            {/* Navigation et bouton de déconnexion */}
            <div className='flex items-center space-x-4 md:space-x-6'>
                {/* Icônes de navigation */}
                

                {/* Bouton de déconnexion */}
                <button
                    onClick={handleLogout}
                    className='flex items-center text-gray-500 hover:text-orange-400 transition p-2 rounded-lg text-xl'
                >
                    <FaSignOutAlt />
                    <span className='ml-2 hidden md:inline'>Déconnexion</span>
                </button>
            </div>
        </div>
    );
};

export default Navbar;