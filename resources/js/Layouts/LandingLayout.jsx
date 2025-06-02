import Navbar from "@/Components/Navbar";
import Header from "@/Components/Header";
import LiveChat from "@/Components/LiveChat";
import Footer from "@/Components/Footer"; // Pastikan kapitalisasi benar

import React, { createContext, useContext } from "react";

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

const LandingLayout = ({ children, user }) => {
    return (
        <GlobalContext.Provider value={{ user }}>
            {/* Gunakan flex layout untuk sticky footer */}
            <div className="min-h-screen flex flex-col">
                <Header />
                <Navbar user={user} />

                {/* Konten utama yang bisa grow untuk mendorong footer */}
                <main className="flex-grow">{children}</main>

                <LiveChat />
                <Footer />
            </div>
        </GlobalContext.Provider>
    );
};

export default LandingLayout;
