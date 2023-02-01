import { Configuration, OpenAIApi } from "openai";

export async function processText(text: string): Promise<{
	respText: string;
	respStatus: boolean;
}> {
	const openai = new OpenAIApi(
		new Configuration({
			apiKey: process.env.NEXT_PUBLIC_OPENAI_API,
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
	console.log(response.data.choices[0].text);

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

export function parseJSON(jsonString: string): Field[] {
	const json = JSON.parse(jsonString);
	const result: Field[] = [];
	json.forEach((obj: any) => {
		result.push({ key: obj.key, value: obj.value });
	});
	return result;
}

export function humanFileSize(size: number) {
	const i = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
	return (size / Math.pow(1024, i)).toFixed(2) + " " + ["B", "kB", "MB", "GB", "TB"][i];
}
