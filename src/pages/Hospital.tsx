import React, { useEffect } from "react";
import { useContext } from "react";
import Navbar from "../components/navbar/Navbar";
import { useDisclosure } from "@chakra-ui/react";
// import { MyModal } from "../components/RegistrationModal/MyModal";

export default function Hospital() {
	// const { logIn, toggleLogIn } = React.useContext(UserContext);
	// const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
	//     e.preventDefault();
	//     toggleLogIn!();
	//   };

	return (
		<div>
			<h1>This is Hospital Page</h1>

			{/* <br />
      <button>hospital login</button>
      <br />
      <p>{logIn ? <>you are logged in</> : <>NOT loged in</>}</p>
      <button onClick={handleOnClick}>State</button>
      <Patient /> */}
		</div>
	);
}
