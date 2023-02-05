import { ChakraProvider } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { GraphQLProvider } from "./GraphQLProvider";
import { ModelContextProvider } from "./MainModalContext";
import { WagmiProvider } from "./WagmiProvider";

const MainProvider: React.FC<PropsWithChildren> = function ({ children }) {
	return (
		<ChakraProvider>
			<GraphQLProvider>
				<WagmiProvider>
					<ModelContextProvider>{children}</ModelContextProvider>
				</WagmiProvider>
			</GraphQLProvider>
		</ChakraProvider>
	);
};

export default MainProvider;
