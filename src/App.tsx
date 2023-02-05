import React, { useContext, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Landing from "./pages/Landing";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Verifier from "./pages/Verifier";
import Hospital from "./pages/Hospital";
import Patient from "./pages/Patient";
import { createContext } from "react";
import Navbar from "./components/navbar/Navbar";
import MainProvider from "./providers";


interface UserContextState {
  logIn: boolean;
  toggleLogIn?:()=> void;
}

const defaultState = {
  logIn: false,
};

export const UserContext = createContext<UserContextState>(defaultState);

// export function useUserContext() {
//   return useContext(UserContext);
// }


function App() {

  const [logIn,setLogIn] = React.useState(defaultState.logIn)

  const toggleLogIn = () =>{
    setLogIn(!logIn)
  };
 
  return (
    <UserContext.Provider 
    value={{
      logIn,
      toggleLogIn,
      }}>
        
      <BrowserRouter>
        <main>
          <Navbar/>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="Verifier" element={<Verifier />} />
            <Route path="Hospital" element={<Hospital />} />
            <Route path="Patient" element={<Patient />} />
          </Routes>
        </main>
      </BrowserRouter>
      </UserContext.Provider>
  );
}

function AppWithContext() {
	return (
    
		<MainProvider>
			<App />
		</MainProvider>
	);
}

export default AppWithContext;
