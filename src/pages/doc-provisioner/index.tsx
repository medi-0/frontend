import DocumentList from "../../components/CommittedDocList";
import UploadInitButton from "../../components/UploadInitButton";

import { useAccount } from "wagmi";
import { gql } from "@apollo/client";
import { Modal } from "./components";
import { useCallback, useRef } from "react";
import { CommittedMedicalDocumentHeader } from "../../lib/types";
import { useMainModalContext } from "../../providers/MainModalContext";

function DocProvisionerView() {
	const { address } = useAccount();
	const counterRef = useRef<HTMLSpanElement | null>(null);

	const modalContext = useMainModalContext();

	const handleCardClick = useCallback((doc: CommittedMedicalDocumentHeader) => {
		console.log("card clicked", doc.cid);
	}, []);

	const handleListChange = useCallback((count: number) => {
		if (!counterRef.current) return;
		counterRef.current.innerText = count.toString();
	}, []);

	const GET_DOCS_FROM_HOSPITAL = gql`
		query GetDocsFromHospital($address: String!) {
			commitedMedicalDocuments(
				orderDirection: desc
				orderBy: blockTimestamp
				where: { hospital: $address }
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
						3
					</span>
				</div>
			</div>

			<DocumentList
				address={address || "0x0"}
				query={GET_DOCS_FROM_HOSPITAL}
				onClick={handleCardClick}
				onChange={() => handleListChange(3)}
			/>
			<UploadInitButton onClick={modalContext.onOpen} />
			<Modal />
		</>
	);
}

export default DocProvisionerView;
