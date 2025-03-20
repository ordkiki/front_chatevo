import { createContext, useState } from "react";

export const SidebarContext = createContext(null);

export const SidebarProvider = ({ children }) => {
    const [activeTab, setActiveTab] = useState("Discussions");

    return (
        <SidebarContext.Provider value={{ activeTab, setActiveTab }}>
            {children}
        </SidebarContext.Provider>
    );
};
