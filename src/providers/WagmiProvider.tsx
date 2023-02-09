import { PropsWithChildren } from "react";
import { goerli, polygonMumbai } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { configureChains, createClient, WagmiConfig } from "wagmi";

import "@rainbow-me/rainbowkit/styles.css";
import { infuraProvider } from "wagmi/providers/infura";
import { RainbowKitProvider, getDefaultWallets } from "@rainbow-me/rainbowkit";

const { chains, provider } = configureChains(
	[
		goerli,
		//  polygonMumbai
	],
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
