import {
	createContext,
	PropsWithChildren,
	useCallback,
	useContext,
	useState,
} from "react";
import { CommittedMedicalDocumentHeader } from "../../lib/types";
import { useMainModalContext } from "../../providers/ModalProvider";

interface IGenerateProofModalContext {
	doc: CommittedMedicalDocumentHeader | null;
	isOpen: boolean;
	onClose: () => void;
	onOpen: (doc: CommittedMedicalDocumentHeader) => void;
}

export const GenerateProofModalContext = createContext<IGenerateProofModalContext>({
	doc: null,
	isOpen: false,
	onOpen: () => {},
	onClose: () => {},
});

export const useGenerateDocProofModal = function () {
	return useContext(GenerateProofModalContext);
};

export const GenerateProofModalProvider: React.FC<PropsWithChildren> = function ({
	children,
}) {
	const { isOpen, onClose, onOpen } = useMainModalContext();
	const [doc, setDoc] = useState<CommittedMedicalDocumentHeader | null>(null);

	const handleOpen = useCallback(
		(doc: CommittedMedicalDocumentHeader) => {
			setDoc(doc);
			onOpen();
		},
		[onOpen]
	);

	return (
		<GenerateProofModalContext.Provider
			value={{
				doc,
				isOpen,
				onClose,
				onOpen: handleOpen,
			}}
		>
			{children}
		</GenerateProofModalContext.Provider>
	);
};
