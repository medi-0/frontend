import axios from "axios";

const SERVER_URL = "https://medi0backendrusty.spicybuilds.xyz/";

interface GenerateCommitmentAndProofRequest {
	rowTitles: string[];
	rowContents: string[];
	rowSelectors: number[];
}

export function generateDocCommitment(data: GenerateCommitmentAndProofRequest) {
	return axios.post(SERVER_URL, data);
}

export function generateProof(data: GenerateCommitmentAndProofRequest) {
	return axios.post(SERVER_URL, data);
}

interface ProofVerificationRequest {
	proof: number[];
	row_title: string;
	row_content: string;
	commitment: string;
}

export function verifyProof(data: ProofVerificationRequest) {
	return axios.post(SERVER_URL, data);
}
