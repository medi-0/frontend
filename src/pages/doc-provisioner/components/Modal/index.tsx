import {
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	Modal as ChakraModal,
} from "@chakra-ui/react";
import EditableForm from "./EditableForm";
import { useMainModalContext } from "../../../../providers/MainModalContext";
import { Field, fieldsFromJSON } from "../../../../lib/utils";
import { useCallback } from "react";
import PdfUploadForm from "./PdfUploadForm";
import { useState } from "react";
import { useDocUploadIpfs } from "../../../../lib/hooks/useDocUploadIpfs";
import { DocCommitment } from "./DocUploadIpfs";
import { useDocCommitment } from "../../../../lib/hooks/useDocCommitment";
import { Doc } from "../../../../lib/types";

type ModalPhase = "UPLOAD" | "SUBMISSION" | "COMMITMENT";

export default function ModalContainer() {
	const mainModal = useMainModalContext();

	return (
		<ChakraModal isOpen={mainModal.isOpen} onClose={mainModal.onClose} isCentered>
			<ModalOverlay />
			<Modal />
		</ChakraModal>
	);
}

function Modal() {
	const [fields, setFields] = useState<Field[]>([]);
	const [phase, setPhase] = useState<ModalPhase>("UPLOAD");

	const { upload, commitment } = useDocCommitment();
	// const { upload, isLoading, cid, isError } = useDocUploadIpfs();

	const handlePdfUploadFormSubmit = useCallback(async function (processedText: string) {
		setFields(fieldsFromJSON(processedText));
		setPhase("SUBMISSION");
	}, []);

	const handleDocSubmit = useCallback(
		async (docName: string, patientAddress: string, fields: Field[]) => {
			setPhase("COMMITMENT");

			commitment.commit({
				docName,
				patientAddress,
				hospitalName: "Hospital Banting",
				hospitalAddress: "0x12415213132",
				fields,
			});
		},
		[]
	);

	return (
		<ModalContent
			margin="2rem"
			minW="600px"
			w="1000px"
			maxW="1000px"
			minH="170px"
			maxH="1000px"
			borderRadius="2xl"
			display="flex"
			paddingTop="2rem"
			paddingX="1rem"
		>
			{/* <ModalHeader paddingBottom="0.5rem">Document Provisioning</ModalHeader> */}
			<div className="absolute top-[-25px] right-[-25px] bg-white">
				<ModalCloseButton
					backgroundColor="#cecece"
					borderRadius="50px"
					className="shadow-lg"
				/>
			</div>

			{phase === "SUBMISSION" ? (
				<EditableForm initialFields={fields} onSubmit={handleDocSubmit} />
			) : phase === "UPLOAD" ? (
				<PdfUploadForm onSubmit={handlePdfUploadFormSubmit} />
			) : (
				// <DocCommitment commitment={commitment} upload={upload} />
				<></>
			)}
			{/* <button
				onClick={() =>
					handleDocCommit("test filename", "0x1231123123", [
						{
							key: "this is a key",
							value: "this is a value",
						},
					])
				}
			>
				send
			</button> */}
		</ModalContent>
	);
}
