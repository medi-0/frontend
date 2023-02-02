import React from "react";
import { useContext } from "react";
import { UserContext } from "../App";
import Navbar from "../components/navbar/Navbar";
import Patient from "./Patient";



export default function Hospital(){
    const { logIn, toggleLogIn } = React.useContext(UserContext);
    const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        toggleLogIn!();
      };

    return (
        <div>
            <Navbar />
            <h1>This is Hospital Page</h1>
            <br />
            <button>hospital login</button>
            <br />
            <p>{logIn ? <h1>you are logged in</h1> : <h1>NOT loged in</h1>}</p>
            <button onClick={handleOnClick}>State</button>
            <Patient/>
            

        </div>
    )
}