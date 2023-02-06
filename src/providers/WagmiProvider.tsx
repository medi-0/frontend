import { PropsWithChildren } from "react";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { goerli, polygonMumbai } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";

import { RainbowKitProvider, getDefaultWallets } from "@rainbow-me/rainbowkit";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { infuraProvider } from "wagmi/providers/infura";
import "@rainbow-me/rainbowkit/styles.css";

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
	autoConnect: true,
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
	connectors,
	provider,
	webSocketProvider,
});

export const WagmiProvider: React.FC<PropsWithChildren> = function ({ children }) {
	return <WagmiConfig client={client}>
		<RainbowKitProvider chains={chains}>

		{children}
		</RainbowKitProvider>
		</WagmiConfig>;
};
