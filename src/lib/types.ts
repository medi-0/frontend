import { CIDString } from "web3.storage";
import { Field } from "./utils";

export interface Doc {
	fileName: string;
	hospitalName: string;
	hospitalAddress: string;
	patientAddress: string;
	fields: Field[];
}

export interface DocWithCID extends Doc {
	cid: CIDString;
}

export interface Hospital {
	name: string;
	description: string;
	isCreated: boolean;
}

// export interface CommittedMedicalDocument {
// 	hospitalAddress: string;
// 	patientAddress: string;
// 	docName: string;
// 	ipfsCid: string;
// 	hash: string;
// }

export enum UserRole {
	PATIENT_ROLE = "PATIENT_ROLE",
	HOSPITAL_ROLE = "HOSPITAL_ROLE",
	UNREGISTERED = "UNREGISTERED",
}

export interface CommittedMedicalDocumentHeader {
	id: string;
	cid: string;
	hash: string;
	patient: string;
	hospital: string;
	fileName: string;
	blockNumber: number;
	blockTimestamp: number;
	transactionHash: string;
}

export type FullCommittedDocumentData = Omit<DocWithCID, "cid"> &
	Omit<CommittedMedicalDocumentHeader, "fileName" | "hospital" | "patient">;

export interface PreparedDocForProving extends FullCommittedDocumentData {
	selectedRows: boolean[];
}

export type DocInclusionProof = Omit<Doc, "fields" | "hospitalName"> &
	Pick<FullCommittedDocumentData, "hash"> & {
		selectedRows: SelectedRowWithProof[];
	};

// export interface DocFieldsInclusionProof extends PreparedDocForProving {
// 	proof: Proof;
// }

export interface SelectedRowWithProof {
	selectedKey: string;
	selectedValue: string;
	proof: Proof;
}

export type Proof = number[];
