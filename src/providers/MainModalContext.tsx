import { useDisclosure } from "@chakra-ui/hooks";
import { createContext, PropsWithChildren, useContext } from "react";

interface MainModelContextState {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
}

export const ModalContext = createContext<MainModelContextState>({
	isOpen: false,
	onOpen: () => {},
	onClose: () => {},
});

export function useMainModalContext() {
	return useContext(ModalContext);
}

export const ModelContextProvider: React.FC<PropsWithChildren> = function ({ children }) {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<ModalContext.Provider
			value={{
				isOpen,
				onOpen,
				onClose,
			}}
		>
			{children}
		</ModalContext.Provider>
	);
};
