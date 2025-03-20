import { createContext, useState } from "react";

export const NavbarContext = createContext(null);

export const NavbarProvider = ({ children }) => {
    const [activeTab, setActiveTab] = useState("Discussions");

    return (
        <NavbarContext.Provider value={{ activeTab, setActiveTab }}>
            {children}
        </NavbarContext.Provider>
    );
};
