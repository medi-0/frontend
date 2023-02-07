import {
	useState,
	useContext,
	useCallback,
	createContext,
	PropsWithChildren,
} from "react";
import { CIDString } from "web3.storage";

interface IDocDisplayModalContext {
	cid: CIDString | null;
	isOpen: boolean;
	onClose: () => void;
	onOpen: (cid: CIDString) => void;
}

export const DocDisplayModalContext = createContext<IDocDisplayModalContext>({
	cid: null,
	isOpen: false,
	onOpen: () => {},
	onClose: () => {},
});

export function useDocDisplayModal() {
	return useContext(DocDisplayModalContext);
}

export const DocDisplayModalProvider: React.FC<PropsWithChildren> = function ({
	children,
}) {
	const [isOpen, setIsOpen] = useState(false);
	const [cid, setCid] = useState<CIDString | null>(null);

	const onOpen = useCallback((cid: CIDString) => {
		setCid(cid);
		setIsOpen(true);
	}, []);
	const onClose = useCallback(() => setIsOpen(false), []);

	return (
		<DocDisplayModalContext.Provider
			value={{
				cid,
				isOpen,
				onOpen,
				onClose,
			}}
		>
			{children}
		</DocDisplayModalContext.Provider>
	);
};
