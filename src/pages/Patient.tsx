import React from "react";
import { useContext } from "react";
import { UserContext } from "../App";
import Navbar from "../components/navbar/Navbar";

export default function Patient() {
  // const context = useContext(UserContext);
  const { logIn, toggleLogIn } = React.useContext(UserContext);

  return (
    <div>
      <Navbar />
      <h1>This is patient page</h1>
      <p>{logIn ? <h1>you are logged in</h1> : <h1>NOT loged in</h1>}</p>
      {/* {context} */}
    </div>
  );
}
