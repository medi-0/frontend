import { Badge, Button, ModalCloseButton, ModalContent, Spinner } from "@chakra-ui/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDocUploadIpfs } from "../../../../lib/hooks/useDocUploadIpfs";
import { DocInclusionProof, PreparedDocForProving } from "../../../../lib/types";
import { ReactComponent as OpenLinkIcon } from "../../../../lib/assets/svg/open-link.svg";
import {
	digestMessage,
	extractFieldsFromSelected,
	generateIpfsLink,
	prepareFieldsForHashing,
} from "../../../../lib/utils";
import { generateInclusionProofForSelectedFields } from "../../../../lib/utils/fileHasher";
import {
	convertFieldArrayToTuple,
	createPdf,
	createQrData,
} from "../../../../lib/utils/pdf";

interface ProofGenerationProps {
	preparedDoc: PreparedDocForProving | null;
}

export function ProofGeneration({ preparedDoc }: ProofGenerationProps) {
	const [inclusionProof, setInclusionProof] = useState<DocInclusionProof | null>(null);
	const [generateProofIsError, setGenerateProofIsError] = useState(false);
	const [generateProofIsLoading, setGenerateProofIsLoading] = useState(false);

	const [pdfLink, setPdfLink] = useState<string | null>(null);

	const pdfDownloadRef = useRef<HTMLAnchorElement | null>(null);
	const qrDownloadRef = useRef<HTMLAnchorElement | null>(null);

	const {
		cid,
		upload,
		// isError: uploadIsError,
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
		if (!preparedDoc || !cid) return;

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
				text: `Hospital Name: ${preparedDoc.hospitalName}\nHospital Address: ${
					preparedDoc.hospitalAddress
				}\nPatient: ${preparedDoc.patientAddress}\nOrignal Document Hash: ${
					preparedDoc.hash
				}\nProof IPFS Link: ${generateIpfsLink(cid)}`,
				headers: ["Key", "Value"],
				rows: convertFieldArrayToTuple(a),
			};
			console.log("body crete pdf", body);
			const link = await createPdf(body);

			setPdfLink(link);

			if (!pdfDownloadRef.current) return;
			pdfDownloadRef.current.setAttribute("href", link);
			pdfDownloadRef.current.setAttribute("download", docName);
			pdfDownloadRef.current.click();
		} catch (e) {
			console.error("error when generating zero pdf", e);
		}
	}, [preparedDoc, cid]);

	const onGenerateQrClick = useCallback(async () => {
		if (!preparedDoc || !cid || !pdfLink) return;

		try {
			const qrId = await digestMessage(
				`${preparedDoc.hash}${preparedDoc.selectedRows.length}${preparedDoc.selectedRows[0]}`
			);
			const qrName = `${preparedDoc.fileName}_${qrId}`;
			const req = {
				filename: qrName,
				text: `Proof for document: ${pdfLink}`,
				data: generateIpfsLink(cid),
			};

			const link = await createQrData(req);

			if (!qrDownloadRef.current) return;
			qrDownloadRef.current.setAttribute("href", link);
			qrDownloadRef.current.setAttribute("download", qrName);
			qrDownloadRef.current.click();
		} catch (e) {}
	}, [preparedDoc, cid, pdfLink]);

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
					<div className="flex items-center justify-center gap-7 h-full">
						<div className="italic text-neutral-600 font-sans">
							Generating the proof. This might take some time...
						</div>
						<Spinner />
					</div>
				) : cid ? (
					<div className="flex flex-col h-full">
						<div className="flex flex-1 flex-col items-center justify-center">
							<div className="font-semibold mb-2">
								Proof successfully generated and uploaded to IPFS.
							</div>
							<div className="">
								<div className="flex gap-3.5 items-center flex-1">
									<Badge
										variant="solid"
										colorScheme="cyan"
										borderRadius="0.3rem"
										paddingX="0.5rem"
										paddingY="0.08rem"
									>
										IPFS
									</Badge>

									<div className="text-neutral-600 text-xs italic font-mono flex">
										{cid ? (
											<div className="flex hover:underline items-center">
												<a
													target="_blank"
													rel="noreferrer"
													href={`https://${cid}.ipfs.w3s.link/`}
													className="w-[200px] whitespace-nowrap overflow-hidden text-ellipsis"
												>
													{cid}
												</a>
												<OpenLinkIcon height="12px" />
											</div>
										) : (
											"--"
										)}
									</div>
								</div>
							</div>
						</div>

						<div className="flex gap-2">
							<Button
								className="flex-1 font-sans"
								rounded="full"
								colorScheme="pink"
								onClick={onGeneratePdfClick}
							>
								Generate PDF
							</Button>
							<Button
								className="flex-1 font-sans"
								rounded="full"
								isDisabled={pdfLink ? false : true}
								onClick={onGenerateQrClick}
							>
								Generate QR code for proof
							</Button>

							<a target="_blank" ref={pdfDownloadRef} hidden download></a>
							<a target="_blank" ref={qrDownloadRef} hidden download></a>
						</div>
					</div>
				) : uploadIsLoading ? (
					<div className="flex items-center justify-center gap-7 h-full">
						<div className="italic text-neutral-600 font-sans">
							Uploading the proof to IPFS.
						</div>
						<Spinner />
					</div>
				) : (
					<div className="flex items-center justify-center gap-7 h-full">
						<div className="italic text-neutral-600 font-sans">
							In progress...
						</div>
					</div>
				)}
			</div>
		</ModalContent>
	);
}
