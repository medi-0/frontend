import axios from "axios";
import { Configuration, OpenAIApi } from "openai";

export async function processText(text: string): Promise<{
	respText: string;
	respStatus: boolean;
}> {
	const openai = new OpenAIApi(
		new Configuration({
			apiKey: process.env.REACT_APP_NEXT_PUBLIC_OPENAI_API,
		})
	);
	// Limit the size of the text to 2048 characters
	text = text.slice(0, 513);
	const response = await openai.createCompletion({
		model: "text-davinci-003",
		// prompt:
		//   'Generate a JSON output in the structure of [{"key":key,"value": value}] for the identified fields \n' +
		//   text,
		prompt:
			'Generate a JSON output in the structure of [{"key":key,"value": value}] for the identified fields where the key values are:\n- name\n- date of birth\n- treatments\n- medicines\n- allergies\n- x-ray results\n- hostpital admission\n- hostpital discharge\n- lifestyle\n\'' +
			text +
			"/##",
		temperature: 0.7,
		max_tokens: 512,
		top_p: 1,
		best_of: 5,
		frequency_penalty: 0,
		presence_penalty: 0,
		stop: ["/##"],
	});

	if (
		response.status !== 200 ||
		response.data.choices[0].text === "" ||
		response.data.choices[0].text === undefined
	) {
		return {
			respText: "Error",
			respStatus: false,
		};
	}
	return {
		respText: response.data.choices[0].text,
		respStatus: true,
	};
}

export interface Field {
	key: string;
	value: string;
}

export function fieldsFromJSON(jsonString: string): Field[] {
	const json = JSON.parse(jsonString);
	const result: Field[] = [];
	json.forEach((obj: any) => {
		result.push({ key: obj.key, value: obj.value });
	});
	return result;
}

export function humanFileSize(size: number) {
	const i = size === 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
	return (size / Math.pow(1024, i)).toFixed(2) + " " + ["B", "kB", "MB", "GB", "TB"][i];
}

export function truncateHexWithEllipsis(hexString: string | `0x${string}`) {
	const len = hexString.length;
	if (len < 11) return hexString;
	return hexString.substring(0, 6) + "..." + hexString.substring(len - 6, len - 1);
}

export async function parsePdf(file: File) {
	const formData = new FormData();
	formData.append("file", file as Blob);

	try {
		const res = await axios.post<{ data: string }>(
			"https://medi0backend.spicybuilds.xyz/processpdf",
			formData,
			{
				headers: {
					"Content-Type": "multipart/form-data",
				},
			}
		);

		return res.data.data;
	} catch (e) {
		throw e;
	}
}

export function prepareFieldsForHashing(fields: Field[]) {
	const keys = [];
	const values = [];

	for (let i = 0; i < 10; i++) {
		let currentKey = "-";
		let currentValue = "-";

		if (fields[i]) {
			currentKey = fields[i].value;
			currentValue = fields[i].key;
		}

		keys.push(currentKey);
		values.push(currentValue);
	}

	return [keys, values];
}

export function extractFieldsFromSelected(fields: Field[], selected: boolean[]) {
	const selectedFields = [];
	for (let i = 0; i < fields.length; i++) {
		if (selected[i]) selectedFields.push(fields[i]);
	}
	return selectedFields;
}

export function convertBoolToNumberArray(arr: boolean[]) {
	return arr.map((i) => (i ? 1 : 0));
}

export function bufferToHex(buffer: ArrayBuffer) {
	var s = "",
		h = "0123456789ABCDEF";
	new Uint8Array(buffer).forEach((v) => {
		s += h[v >> 4] + h[v & 15];
	});
	return s;
}

export async function digestMessage(message: string) {
	const encoder = new TextEncoder();
	const data = encoder.encode(message);
	return bufferToHex(data);
}
