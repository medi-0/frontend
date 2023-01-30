import { ChakraProvider } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { MainModelContextProvider } from "./MainModalContext";

const MainProvider: React.FC<PropsWithChildren> = function ({ children }) {
	return (
		<ChakraProvider>
			<MainModelContextProvider>{children}</MainModelContextProvider>
		</ChakraProvider>
	);
};

export default MainProvider;
