import {
	ModalOverlay,
	ModalContent,
	ModalCloseButton,
	Modal as ChakraModal,
} from "@chakra-ui/react";
import EditableForm from "./EditableForm";
import { useMainModalContext } from "../../../../providers/ModalProvider";
import { Field, fieldsFromJSON } from "../../../../lib/utils";
import { useCallback } from "react";
import PdfUploadForm from "./PdfUploadForm";
import { useState } from "react";
import { useDocCommitment } from "../../../../lib/hooks/useDocCommitment";
import { CommitmentProgress } from "./CommitmentProgress";
import { useUser } from "../../../../providers/UserProvider";

type ModalPhase = "UPLOAD" | "SUBMISSION" | "COMMITMENT";

export default function DocSubmissionModalContainer() {
	const mainModal = useMainModalContext();

	return (
		<ChakraModal isOpen={mainModal.isOpen} onClose={mainModal.onClose} isCentered>
			<ModalOverlay />
			<DocSubmissionModal />
		</ChakraModal>
	);
}

function DocSubmissionModal() {
	const [fields, setFields] = useState<Field[]>([]);
	const [phase, setPhase] = useState<ModalPhase>("UPLOAD");

	const { account, role } = useUser();
	const { upload, commitment } = useDocCommitment();

	const handlePdfUploadFormSubmit = useCallback(async function (processedText: string) {
		let f = fieldsFromJSON(processedText);
		// only select the first 10 fields
		if (f.length > 10) {
			f = f.slice(0, 10);
		}
		setFields(f);
		setPhase("SUBMISSION");
	}, []);

	const handleDocSubmit = useCallback(
		async (docName: string, patientAddress: string, fields: Field[]) => {
			setPhase("COMMITMENT");

			const arr = [...fields];
			if (fields.length < 10) {
				const emptyFields = 10 - fields.length;

				for (let i = 0; i < emptyFields; i++) {
					arr.push({
						key: "-",
						value: "-",
					});
				}
			}

			commitment.commit({
				fields: arr,
				patientAddress,
				fileName: docName,
				hospitalAddress: account.address || "",
				hospitalName: role.hospital?.name || "",
			});
		},
		[commitment, account.address, role.hospital]
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
