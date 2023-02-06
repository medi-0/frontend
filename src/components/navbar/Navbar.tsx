import { useNavigate } from "react-router-dom";
import { ConnectButton } from "@rainbow-me/rainbowkit";

function Navbar() {
	const navigate = useNavigate();

	return (
		<div className="flex justify-between items-center px-20 py-4">
			<div>
				<button
					onClick={() => navigate("/")}
					className="text-[#396AEB] text-2xl font-extrabold font-sans"
				>
					MediZero
				</button>
			</div>

			<div className="flex items-center">
				<button
					onClick={() => navigate("/Verifier")}
					className="text-xl font-bold text-[#396AEB] mr-8 hover:underline"
				>
					Verify
				</button>

				<ConnectButton showBalance={false} />
			</div>
		</div>
	);
}

export default Navbar;
