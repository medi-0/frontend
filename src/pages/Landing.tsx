import { UserRole } from "../lib/types";
import { useEffect, useState } from "react";
import img from "../lib/assets/picture/eth.png";
import Navbar from "../components/navbar/Navbar";
import { useUser } from "../providers/UserProvider";
import RegistrationModal from "../components/RegistrationModal/Registration";

// 1. if it is connected
// 2. read from the contract
// 3. if the address is not registered open the registration Modal
// 4. if the address is registered as a Hospital, navigate to the hospital page
// 5. if the address is registered as a Patient, navigate to the patient page

export default function Landing() {
	const {
		role: { type },
		account: { isConnected },
	} = useUser();
	const [isRegister, setIsRegister] = useState(false);

	useEffect(() => {
		if (isConnected && type === UserRole.UNREGISTERED) setIsRegister(true);
	}, [isConnected, type]);

	return (
		<>
			<Navbar />
			<div>
				<div className="h-[800px] flex items-center justify-around px-32">
					<div>
						<h1 className="font-black text-transparent text-7xl bg-clip-text bg-gradient-to-r from-purple-500 to-orange-300">
							Protect your privacy <br />
							at all cost with <br />
							Zk Form
						</h1>
						<br />
						<h1 className="text-[#81AFDD] font-bold text-lg">
							Share the information that you want safely by <br />
							using Zero Knowledge Proof
						</h1>

						<br />

						{isRegister ? <RegistrationModal /> : <></>}
					</div>

					<div>
						<h1>
							<img className="" src={img} alt="" width={700} height={700} />
						</h1>
					</div>
				</div>
			</div>
		</>
	);
}
