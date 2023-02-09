import DocumentList from "../../components/CommittedDocList";

import { useAccount } from "wagmi";
import { gql } from "@apollo/client";
import { GenerateProofModal } from "./components";
import { useCallback, useRef } from "react";
import { CommittedMedicalDocumentHeader } from "../../lib/types";
import {
	GenerateProofModalProvider,
	useGenerateDocProofModal,
} from "./PatientModalContext";

export default function PatientViewContainer() {
	return (
		<GenerateProofModalProvider>
			<PatientView />
		</GenerateProofModalProvider>
	);
}

function PatientView() {
	const { address } = useAccount();
	const { onOpen } = useGenerateDocProofModal();
	const counterRef = useRef<HTMLSpanElement | null>(null);

	const handleCardClick = useCallback(
		(doc: CommittedMedicalDocumentHeader) => {
			// console.log("card clicked", doc.cid);
			onOpen(doc);
		},
		[onOpen]
	);

	const handleListChange = useCallback((count: number) => {
		if (!counterRef.current) return;
		counterRef.current.innerText = count.toString();
	}, []);

	const GET_DOCS_FOR_PATIENT = gql`
		query GetDocsForPatient($address: String!) {
			commitedMedicalDocuments(
				orderDirection: desc
				orderBy: blockTimestamp
				where: { patient: $address }
			) {
				id
				cid
				hash
				patient
				hospital
				fileName
				blockNumber
				blockTimestamp
				transactionHash
			}
		}
	`;

	return (
		<>
			<div
				className="mb-3 font-semibold flex"
				style={{
					fontSize: "0.85rem",
				}}
			>
				<div className="px-2.5 border rounded bg-neutral-100">
					Total docs :{" "}
					<span id="list-counter" ref={counterRef}>
						2
					</span>
				</div>
			</div>

			<DocumentList
				address={address || "0x0"}
				query={GET_DOCS_FOR_PATIENT}
				onClick={handleCardClick}
				onChange={() => handleListChange(3)}
			/>
			<GenerateProofModal />
		</>
	);
}
