import { CIDString } from "web3.storage";
import { Field } from "./utils";

export interface Doc {
	docName: string;
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
