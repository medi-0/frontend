import { PropsWithChildren } from "react";
import { goerli, polygonMumbai } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { configureChains, createClient, WagmiConfig } from "wagmi";

import "@rainbow-me/rainbowkit/styles.css";
import { infuraProvider } from "wagmi/providers/infura";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { RainbowKitProvider, getDefaultWallets } from "@rainbow-me/rainbowkit";

const { chains, provider, webSocketProvider } = configureChains(
	[goerli, polygonMumbai],
	[
		infuraProvider({
			apiKey: process.env.REACT_APP_INFURA_API || "",
		}),
		publicProvider(),
	]
);

const { connectors } = getDefaultWallets({
	appName: "My RainbowKit App",
	chains,
});

const client = createClient({
	// connectors: [
	// 	new MetaMaskConnector(),
	// 	new InjectedConnector({ chains }),
	// 	// new WalletConnectConnector({
	// 	// 	chains,
	// 	// 	options: {
	// 	// 		qrcode: true,
	// 	// 	},
	// 	// }),
	// ],
	provider,
	connectors,
});

export const WagmiProvider: React.FC<PropsWithChildren> = function ({ children }) {
	return (
		<WagmiConfig client={client}>
			<RainbowKitProvider chains={chains}>{children}</RainbowKitProvider>
		</WagmiConfig>
	);
};
