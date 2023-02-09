import axios from "axios";

const BASE_SERVER_URL = "https://medi0backendrusty.spicybuilds.xyz";

export interface GenerateCommitmentAndProofRequest {
	row_titles: string[];
	row_contents: string[];
	row_selectors: number[];
}

export function generateDocCommitment(data: GenerateCommitmentAndProofRequest) {
	return axios.post<{
		commitment: string;
	}>(`${BASE_SERVER_URL}/generate-commitment`, data);
}

export function generateProof(data: GenerateCommitmentAndProofRequest) {
	return axios.post(`${BASE_SERVER_URL}/generate-proof`, data);
}

export interface ProofVerificationRequest {
	proof: number[];
	row_title: string;
	row_content: string;
	commitment: string;
}

export function verifyProof(data: ProofVerificationRequest) {
	return axios.post(`${BASE_SERVER_URL}/verify-proof`, data);
}
