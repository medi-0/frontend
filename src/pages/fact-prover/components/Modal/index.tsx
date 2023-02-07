import {
	Modal as ChakraModal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	Spinner,
} from "@chakra-ui/react";
import { useCallback, useEffect } from "react";
import { useDocFetchIpfs } from "../../../../lib/hooks/useDocFetchIpfs";
import { Field } from "../../../../lib/utils";
import { useMainModalContext } from "../../../../providers/ModalProvider";
import { usePatientModal } from "../../PatientModalContext";
import SelectableForm from "./SelectableForm";

function ModalContainer() {
	// const { close } = usePatientModal();
	const mainModal = useMainModalContext();

	return (
		<ChakraModal isOpen={mainModal.isOpen} onClose={mainModal.onClose} isCentered>
			<ModalOverlay />
			<Modal />
		</ChakraModal>
	);
}

function Modal() {
	const {
		state: { docCid },
	} = usePatientModal();

	// useEffect(() => {
	// 	console.log("cid ", docCid);
	// }, [docCid]);

	const { docs, isLoading, isError, fetchFiles } = useDocFetchIpfs();

	useEffect(() => {
		if (!docCid) return;
		fetchFiles(docCid);
	}, [docCid]);

	const handleFormSubmit = useCallback((data: Field[]) => {
		console.log("generating proof for fields", data);
	}, []);

	return (
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
			<ModalHeader paddingBottom="0.5rem">Title</ModalHeader>
			<ModalCloseButton />

			{isLoading ? (
				<div className="flex-1 flex items-center justify-center">
					<Spinner />
				</div>
			) : docs && docs[0] ? (
				<SelectableForm doc={docs[0]} onSubmit={handleFormSubmit} />
			) : isLoading ? (
				<div>loading</div>
			) : (
				<div>no doc found</div>
			)}
		</ModalContent>
	);
}

export default ModalContainer;
