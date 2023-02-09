import {
	useState,
	useContext,
	useCallback,
	createContext,
	PropsWithChildren,
} from "react";
import { CommittedMedicalDocumentHeader } from "../../../lib/types";

interface IDocDisplayModalContext {
	doc: CommittedMedicalDocumentHeader | null;
	isOpen: boolean;
	onClose: () => void;
	onOpen: (doc: CommittedMedicalDocumentHeader) => void;
}

export const DocDisplayModalContext = createContext<IDocDisplayModalContext>({
	doc: null,
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
	const [doc, setDoc] = useState<CommittedMedicalDocumentHeader | null>(null);

	const onOpen = useCallback((doc: CommittedMedicalDocumentHeader) => {
		setDoc(doc);
		setIsOpen(true);
	}, []);
	const onClose = useCallback(() => setIsOpen(false), []);

	return (
		<DocDisplayModalContext.Provider
			value={{
				doc,
				isOpen,
				onOpen,
				onClose,
			}}
		>
			{children}
		</DocDisplayModalContext.Provider>
	);
};
