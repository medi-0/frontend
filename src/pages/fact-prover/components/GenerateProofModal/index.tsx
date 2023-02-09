import { useCallback, useState } from "react";
import { Modal as ChakraModal, ModalOverlay } from "@chakra-ui/react";

import FieldSelection from "./FieldSelection";
import {
	FullCommittedDocumentData,
	PreparedDocForProving,
	Proof,
} from "../../../../lib/types";
import { useGenerateDocProofModal } from "../../PatientModalContext";
import { generateProofForRow } from "../../../../lib/utils/fileHasher";
import { prepareFieldsForHashing } from "../../../../lib/utils";
import { ProofGeneration } from "./ProofGeneration";

type GenerateProofModalPhase = "FIELD_SELECTION" | "PROOF_GENERATION";

function GenerateProofModal() {
	const { isOpen, onClose } = useGenerateDocProofModal();
	const [phase, setPhase] = useState<GenerateProofModalPhase>("FIELD_SELECTION");

	const [preparedDataForProof, setPreparedDataForProof] =
		useState<PreparedDocForProving | null>(null);

	const onSelectedFieldsSubmit = useCallback(
		async (selectedFields: boolean[], doc: FullCommittedDocumentData) => {
			console.log("generating proof for fields", selectedFields, doc);

			setPreparedDataForProof({
				...doc,
				selectedRows: selectedFields,
			});

			setPhase("PROOF_GENERATION");
		},
		[]
	);

	return (
		<ChakraModal isOpen={isOpen} onClose={onClose} isCentered>
			<ModalOverlay />
			{phase === "FIELD_SELECTION" ? (
				<FieldSelection onSubmit={onSelectedFieldsSubmit} />
			) : phase === "PROOF_GENERATION" ? (
				<ProofGeneration preparedDoc={preparedDataForProof} />
			) : (
				<></>
			)}
		</ChakraModal>
	);
}

export default GenerateProofModal;
