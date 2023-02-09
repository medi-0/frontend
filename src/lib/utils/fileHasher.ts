import axios from "axios";
import { SelectedRowWithProof } from "../types";

const PROOF_BASE_SERVER_URL = "https://medi0backendrusty.spicybuilds.xyz";

export interface GenerateCommitmentAndProofRequest {
	row_titles: string[];
	row_contents: string[];
	row_selectors: number[];
}

export function generateDocCommitment(data: GenerateCommitmentAndProofRequest) {
	return axios.post<{
		commitment: string;
	}>(`${PROOF_BASE_SERVER_URL}/generate-commitment`, data);
}

export function generateProofForRow(data: GenerateCommitmentAndProofRequest) {
	return axios.post<{ proof: number[] }>(
		`${PROOF_BASE_SERVER_URL}/generate-proof`,
		data
	);
}

export interface ProofVerificationRequest {
	proof: number[];
	row_title: string;
	row_content: string;
	commitment: string;
}

export function verifyProof(data: ProofVerificationRequest) {
	return axios.post(`${PROOF_BASE_SERVER_URL}/verify-proof`, data);
}

export async function generateInclusionProofForSelectedFields(
	rowTitles: string[],
	rowContents: string[],
	selectedRows: boolean[]
) {
	const selectedRowProof: SelectedRowWithProof[] = [];

	for (let i = 0; i < selectedRows.length; i++) {
		if (!selectedRows[i]) continue;

		const selected = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		selected[i] = 1;

		try {
			const {
				data: { proof },
			} = await generateProofForRow({
				row_titles: rowTitles,
				row_contents: rowContents,
				row_selectors: selected,
			});

			selectedRowProof.push({
				selectedKey: rowTitles[i],
				selectedValue: rowContents[i],
				proof,
			});
		} catch (e) {
			throw e;
		}
	}

	return selectedRowProof;
}
