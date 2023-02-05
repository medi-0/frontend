import { useCallback } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { truncateHexWithEllipsis } from "../lib/utils";

export default function MenuBar() {
	const { connect } = useConnect();
	const { disconnect } = useDisconnect();
	const { address, isConnected } = useAccount();

	const handleButtonOnClick = useCallback(() => {
		if (isConnected) disconnect();
		connect({
			connector: new InjectedConnector(),
		});
	}, [connect]);

	const handleConnectedButtonMouseOver: React.MouseEventHandler<HTMLButtonElement> =
		useCallback(
			(e) => {
				if (isConnected && address) e.currentTarget.innerText = "Sign Out";
			},
			[isConnected, address]
		);

	const handleConnectedButtonMouseOut: React.MouseEventHandler<HTMLButtonElement> =
		useCallback(
			(e) => {
				if (isConnected && address)
					e.currentTarget.innerText = truncateHexWithEllipsis(address);
			},
			[isConnected, address]
		);

	return (
		<div className="flex w-full h-[50px] gap-[0.6rem]">
			<div
				className="px-6 flex justify-between items-center rounded-lg mb-6 flex-1 h-full"
				style={{
					background: "linear-gradient(90deg, #AB64F5 0.02%, #FB76C3 99.98%)",
					boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
				}}
			>
				<div className="font-bold text-lg text-white font-mono">Medi0</div>
			</div>

			<div
				className="rounded-lg bg-neutral-800 text-white text-sm font-mono flex w-[186px] hover:bg-neutral-700 transition-colors duration-150 ease-in-out"
				style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
			>
				{isConnected ? (
					<button
						className="flex-1"
						onClick={handleButtonOnClick}
						onMouseOut={handleConnectedButtonMouseOut}
						onMouseOver={handleConnectedButtonMouseOver}
					>
						{truncateHexWithEllipsis(address || "0x0")}
					</button>
				) : (
					<button className="flex-1" onClick={handleButtonOnClick}>
						Connect
					</button>
				)}
			</div>
		</div>
	);
}
