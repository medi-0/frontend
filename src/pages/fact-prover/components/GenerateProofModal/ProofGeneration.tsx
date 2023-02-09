import { Button, ModalCloseButton, ModalContent, Spinner } from "@chakra-ui/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDocUploadIpfs } from "../../../../lib/hooks/useDocUploadIpfs";
import { DocInclusionProof, PreparedDocForProving } from "../../../../lib/types";
import {
	digestMessage,
	extractFieldsFromSelected,
	prepareFieldsForHashing,
	truncateHexWithEllipsis,
} from "../../../../lib/utils";
import { generateInclusionProofForSelectedFields } from "../../../../lib/utils/fileHasher";
import { convertFieldArrayToTuple, createPdf } from "../../../../lib/utils/pdf";

interface ProofGenerationProps {
	preparedDoc: PreparedDocForProving | null;
	// onSubmit: (proof: DocFieldsInclusionProof) => void;
}

export function ProofGeneration({ preparedDoc }: ProofGenerationProps) {
	const [inclusionProof, setInclusionProof] = useState<DocInclusionProof | null>(null);
	const [generateProofIsError, setGenerateProofIsError] = useState(false);
	const [generateProofIsLoading, setGenerateProofIsLoading] = useState(false);

	const pdfDownloadRef = useRef<HTMLAnchorElement | null>(null);
	const [pdfLink, setPdfLink] = useState<string | null>(null);
	// const [isPdfDownloable, setPdfIsDownloadable] = useState(false);

	const {
		cid,
		upload,
		isError: uploadIsError,
		isLoading: uploadIsLoading,
	} = useDocUploadIpfs();

	useEffect(() => {
		if (!preparedDoc) return;
		setGenerateProofIsLoading(true);
		console.log("prepared doc", preparedDoc);
		const [titles, contents] = prepareFieldsForHashing(preparedDoc.fields);
		generateInclusionProofForSelectedFields(
			titles,
			contents,
			preparedDoc.selectedRows
		)
			.then((value) => {
				setInclusionProof({
					hash: preparedDoc.hash,
					fileName: preparedDoc.fileName,
					hospitalAddress: preparedDoc.hospitalAddress,
					patientAddress: preparedDoc.patientAddress,
					selectedRows: value,
				});
			})
			.catch((e) => setGenerateProofIsError(true))
			.finally(() => setGenerateProofIsLoading(false));
	}, [preparedDoc]);

	useEffect(() => {
		console.log("proof", inclusionProof);
		if (!inclusionProof) return;
		// upload to ipfs
		upload(
			inclusionProof,
			`medi0-artifact-proof_${inclusionProof.fileName}_${inclusionProof.hash}`
		).then((cid) => {
			if (!cid) return;
			console.log("proof cid ", cid);
		});
	}, [inclusionProof]);

	const onGeneratePdfClick = useCallback(async () => {
		if (!preparedDoc) return;

		try {
			const docId = await digestMessage(
				`${preparedDoc.hash}${preparedDoc.selectedRows.length}${preparedDoc.selectedRows[0]}`
			);
			// console.log("id", docId);
			const docName = `${preparedDoc.fileName}_${docId}`;
			const a = extractFieldsFromSelected(
				preparedDoc.fields,
				preparedDoc.selectedRows
			);
			// console.log("a", docName, a);
			const body = {
				title: docName,
				text: `Hospital Name: ${preparedDoc.hospitalName}\nHospital Address: ${preparedDoc.hospitalAddress}\nPatient: ${preparedDoc.patientAddress}\nOrignal Document Hash: ${preparedDoc.hash}`,
				headers: ["Key", "Value"],
				rows: convertFieldArrayToTuple(a),
			};
			console.log("body crete pdf", body);
			const link = await createPdf(body);
			// setPdfLink(link);
			// setPdfIsDownloadable(true);
			if (!pdfDownloadRef.current) return;
			pdfDownloadRef.current.setAttribute("href", link);
			pdfDownloadRef.current.setAttribute("download", docName);
			pdfDownloadRef.current.click();
		} catch (e) {
			console.error("error when generating zero pdf", e);
		}
	}, [preparedDoc]);

	useEffect(() => {});

	return (
		<ModalContent
			margin="2rem"
			w="900px"
			maxW="1000px"
			h="230px"
			maxH="600px"
			borderRadius="2xl"
			display="flex"
			paddingX="2rem"
			paddingTop="2rem"
			paddingBottom="1rem"
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
			<div className="flex flex-col h-full">
				{generateProofIsLoading ? (
					<div className="flex gap-7">
						<div className="italic text-neutral-600">
							Generating the proof. This might take some time...
						</div>
						<Spinner />
					</div>
				) : cid ? (
					<div className="flex flex-col h-full">
						<div className="flex-1 items-center justify-center">
							<div>Proof successfully generated.</div>
							<div>
								Here is the IPFS link for the proof :{" "}
								<a
									target="_blank"
									rel="noreferrer"
									href={`https://${cid}.ipfs.w3s.link/`}
									className="italic hover:underline"
								>
									{truncateHexWithEllipsis(cid)}
								</a>
							</div>
						</div>

						<div className="flex gap-2 flex-1">
							<Button className="flex-1" onClick={onGeneratePdfClick}>
								Generate PDF
							</Button>
							<Button className="flex-1">Generate QR code</Button>

							<a ref={pdfDownloadRef} hidden download></a>
							{/* <a ref={pdfDownloadRef} hidden download></a> */}
						</div>
					</div>
				) : (
					<></>
				)}
			</div>
		</ModalContent>
	);
}
