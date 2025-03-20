import React, { useContext } from 'react';
import { FaComments,FaSearch ,FaUserFriends, FaCog } from 'react-icons/fa';
import { NavbarContext } from '../../context/NavbarContext'; // Vérifie bien la casse du fichier

const navigations = [
    { name: "Discussions", icon: <FaComments /> },
    { name: "Amis", icon: <FaUserFriends /> },
    { name: "Starred", icon: <FaCog /> }
];

const Sidebar = () => {
    const { activeTab, setActiveTab } = useContext(NavbarContext);

    if (!activeTab || !setActiveTab) {
        return <div>Erreur : SidebarContext non fourni.</div>; // Vérification anti-erreur
    }

    return (
        
        <div className='p-4 flex h-fit justify-between w-screen border fixed top-0 left-0 '>
            <div className='flex items-center'>
                <h3 className='text-orange-400 font-bold'>i-tatasika</h3>
                <form action="" className='bg-zinc-50 rounded-lg border flex items-center mx-4' method="get">
                    <input type="text" className='bg-zinc-50 outline-none px-2' placeholder='rechercher...' name="" id="" />
                    <button className='hover:bg-orange-400 transition p-2 rounded-r-lg hover:text-white text-orange-400 text-xl'><FaSearch></FaSearch></button>
                </form>
            </div>
            <div className='flex '>
            {navigations.map((nav) => (
                <div
                    key={nav.name}
                    onClick={() => setActiveTab(nav.name)}
                    className={`mx-10 text-xl cursor-pointer p-2 rounded-lg ${activeTab === nav.name ? 'bg-white text-orange-400' : 'hover:text-gray-300'}`}
                >

                     {nav.icon}
                 </div>
         ))}
            </div>
        </div>
    );
};

export default Sidebar;
