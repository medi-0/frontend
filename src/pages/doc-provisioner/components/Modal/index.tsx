import {
	Modal as ChakraModal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
} from "@chakra-ui/react";
import EditableForm from "./EditableForm";
import usePdfUploader from "../../../../lib/hooks/useFileUploader";
import { useMainModelContext } from "../../../../providers/MainModalContext";
import { ModalStateProvider, useModalState } from "./ModalStateContext";
import { Field, parseJSON, processText } from "../../../../lib/utils";
import { useCallback } from "react";
import PdfUploadForm from "./PdfUploadForm";

function Modal() {
	const mainModal = useMainModelContext();
	const { docFields, setDocFields } = useModalState();

	const handlePdfUploadFormSubmit = useCallback(async function (text: string) {
		console.log("pdf upload submit", text);
		// const { respText } = await processText(text);
		// setDocFields(parseJSON(respText));
		setDocFields([]);
	}, []);

	const handleEditableFormSubmit = useCallback((data: Field[]) => {
		console.log("editable form submit", data);
	}, []);

	return (
		<ChakraModal isOpen={mainModal.isOpen} onClose={mainModal.onClose} isCentered>
			<ModalOverlay />
			<ModalContent
				margin="2rem"
				w="1000px"
				minW="600px"
				maxW="1000px"
				minH="400px"
				maxH="600px"
				borderRadius="2xl"
				display="flex"
			>
				<ModalHeader paddingBottom="0.5rem">Document Provisioning</ModalHeader>
				<ModalCloseButton />
				{docFields ? (
					<EditableForm
						defaultFields={docFields}
						onSubmit={handleEditableFormSubmit}
					/>
				) : (
					<PdfUploadForm onSubmit={handlePdfUploadFormSubmit} />
				)}
			</ModalContent>
		</ChakraModal>
	);
}

function ModalWithContext() {
	return (
		<ModalStateProvider>
			<Modal />
		</ModalStateProvider>
	);
}

export default ModalWithContext;
