import axios from "axios";
import { Field } from ".";

const PDF_BASE_SERVER_URL = "https://medi0backend.spicybuilds.xyz";

type KeyValuePair = string[];

export interface CreatePdfRequest {
	title: string;
	text: string;
	headers: string[];
	rows: KeyValuePair[];
}

export function convertFieldArrayToTuple(fields: Field[]): KeyValuePair[] {
	console.log("fields", fields);
	const arr = [];
	for (let i = 0; i < fields.length; i++) {
		arr.push([fields[i].key, fields[i].value]);
	}
	return arr;
}

export async function createPdf(data: CreatePdfRequest): Promise<string> {
	try {
		const { status } = await axios.post(`${PDF_BASE_SERVER_URL}/createpdf`, data);
		if (status === 200) {
			return `${PDF_BASE_SERVER_URL}/pdfs/${data.title}.pdf`;
		} else
			throw new Error(
				"Something happened. Unable to create the PDF your requested"
			);
	} catch (e) {
		throw e;
	}
}

export interface CreateQrData {
	filename: string;
	text: string;
	data: string;
}

export async function createQrData(data: CreateQrData) {
	try {
		const { status } = await axios.post(`${PDF_BASE_SERVER_URL}/createqrpdf`, data);
		if (status === 200) {
			return `${PDF_BASE_SERVER_URL}/qrs/${data.filename}.png`;
		} else
			throw new Error(
				"Something happened. Unable to create the QR for the proof you requested."
			);
	} catch (e) {
		throw e;
	}
}
