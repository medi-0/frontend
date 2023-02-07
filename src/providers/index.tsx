import { ChakraProvider } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { GraphQLProvider } from "./GraphQLProvider";
import { ModelContextProvider } from "./ModalProvider";
import { UserProvider } from "./UserProvider";
import { WagmiProvider } from "./WagmiProvider";

const MainProvider: React.FC<PropsWithChildren> = function ({ children }) {
	return (
		<ChakraProvider>
			<GraphQLProvider>
				<WagmiProvider>
					<UserProvider>
						<ModelContextProvider>{children}</ModelContextProvider>
					</UserProvider>
				</WagmiProvider>
			</GraphQLProvider>
		</ChakraProvider>
	);
};

export default MainProvider;
