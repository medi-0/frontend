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
import { useDocCommitment } from "../../../../lib/hooks/useDocCommitment";
import { Doc } from "../../../../lib/types";
import { CommitmentProgress } from "./CommitmentProgress";

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
			<ModalCloseButton
				height="min-content"
				backgroundColor="#df57a7"
				borderRadius="2rem"
				className="shadow-lg"
				width="4rem"
				padding="0.2rem 1rem"
			>
				<span className="font-bold text-white">close</span>
			</ModalCloseButton>

			{phase === "SUBMISSION" ? (
				<EditableForm initialFields={fields} onSubmit={handleDocSubmit} />
			) : phase === "UPLOAD" ? (
				<PdfUploadForm onSubmit={handlePdfUploadFormSubmit} />
			) : (
				<CommitmentProgress
					ipfsData={upload.cid}
					ipfsIsError={upload.isError}
					ipfsIsLoading={upload.isLoading}
					commitmentData={commitment.receipt}
					commitmentIsError={commitment.isError}
					commitmentIsLoading={commitment.isLoading}
				/>
			)}
		</ModalContent>
	);
}
