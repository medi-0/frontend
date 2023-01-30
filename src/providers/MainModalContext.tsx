import { useDisclosure } from "@chakra-ui/hooks";
import { createContext, PropsWithChildren, useContext } from "react";

interface MainModelContextState {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
}

export const MainModalContext = createContext<MainModelContextState>({
	isOpen: false,
	onOpen: () => {},
	onClose: () => {},
});

export function useMainModelContext() {
	return useContext(MainModalContext);
}

export const MainModelContextProvider: React.FC<PropsWithChildren> = function ({
	children,
}) {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<MainModalContext.Provider
			value={{
				isOpen,
				onOpen,
				onClose,
			}}
		>
			{children}
		</MainModalContext.Provider>
	);
};
