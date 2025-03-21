import Navbar from "@/Components/Navbar";
import Header from "@/Components/Header";
import LiveChat from "@/Components/LiveChat";

import React, { createContext, useContext } from "react";

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

const LandingLayout = ({ children, user }) => {
  return (
    <GlobalContext.Provider value={{ user }}>
      <div>
        <Header />
        <Navbar user={user} />
        <div>{children}</div>
        <LiveChat />
      </div>
    </GlobalContext.Provider>
  );
};

export default LandingLayout;
