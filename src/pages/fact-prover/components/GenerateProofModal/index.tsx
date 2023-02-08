import { useCallback, useState } from "react";
import { Modal as ChakraModal, ModalOverlay } from "@chakra-ui/react";

import FieldSelection from "./FieldSelection";
import { FullCommittedDocumentData } from "../../../../lib/types";
import { useGenerateDocProofModal } from "../../PatientModalContext";

type GenerateProofModalPhase = "FIELD_SELECTION" | "PROOF_GENERATION";

function GenerateProofModal() {
	const { isOpen, onClose } = useGenerateDocProofModal();
	const [phase, setPhase] = useState<GenerateProofModalPhase>("FIELD_SELECTION");

	const onSubmit = useCallback(
		(selectedFields: boolean[], doc: FullCommittedDocumentData) => {
			console.log("generating proof for fields", selectedFields, doc);
		},
		[]
	);

	return (
		<ChakraModal isOpen={isOpen} onClose={onClose} isCentered>
			<ModalOverlay />
			{phase === "FIELD_SELECTION" ? <FieldSelection onSubmit={onSubmit} /> : <></>}
		</ChakraModal>
	);
}

export default GenerateProofModal;
