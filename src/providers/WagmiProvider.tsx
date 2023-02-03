import { PropsWithChildren } from "react";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { goerli, polygonMumbai } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";

import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { infuraProvider } from "wagmi/providers/infura";

const { chains, provider, webSocketProvider } = configureChains(
	[goerli, polygonMumbai],
	[
		infuraProvider({
			apiKey: process.env.REACT_APP_INFURA_API || "",
		}),
		publicProvider(),
	]
);

const client = createClient({
	autoConnect: true,
	connectors: [
		new MetaMaskConnector(),
		new InjectedConnector({ chains }),
		// new WalletConnectConnector({
		// 	chains,
		// 	options: {
		// 		qrcode: true,
		// 	},
		// }),
	],
	provider,
	webSocketProvider,
});

export const WagmiProvider: React.FC<PropsWithChildren> = function ({ children }) {
	return <WagmiConfig client={client}>{children}</WagmiConfig>;
};
