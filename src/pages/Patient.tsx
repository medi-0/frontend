import React from "react";
import { useContext } from "react";
import { UserContext } from "../App";
import Navbar from "../components/navbar/Navbar";

export default function Patient() {
  // const context = useContext(UserContext);
  const { logIn, toggleLogIn } = React.useContext(UserContext);

  return (
    <div>
      <h1>This is patient page</h1>
      <p>{logIn ? <>you are logged in</> : <>NOT loged in</>}</p>
      {/* {context} */}
    </div>
  );
}
