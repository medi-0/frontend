import cloneDeep from "lodash.clonedeep";
import { useReducer } from "react";
import { Field } from "../../lib/utils";

export enum DocFormActionKind {
	INIT = "INIT",
	ADD_FIELD = "ADD_FIELD",
	REMOVE_FIELD = "REMOVE_FIELD",
	EDIT_KEY_FIELD = "EDIT_KEY_FIELD",
	EDIT_VALUE_FIELD = "EDIT_VALUE_FIELD",
	// SUBMIT = "SUBMIT",
}

// type FieldsSubmitHandler = (data: Field[]) => void;

export interface DocFormAction {
	type: DocFormActionKind;
	payload: {
		[key: string]: string | number | Field[];
	};
}

export interface DocFormState {
	fields: Field[];
}

export const docFormReducer = function (
	state: DocFormState,
	action: DocFormAction
): DocFormState {
	const { type, payload } = action;
	switch (type) {
		case DocFormActionKind.INIT: {
			const { fields } = payload;
			console.log("fields", fields);

			return {
				fields: fields as Field[],
			};
		}

		case DocFormActionKind.EDIT_KEY_FIELD: {
			if (!state.fields) return state;

			const { index, value } = payload;
			const fields = cloneDeep(state.fields);
			fields[index as number].key = value as string;

			return {
				...state,
				fields,
			};
		}

		case DocFormActionKind.EDIT_VALUE_FIELD: {
			if (!state.fields) return state;

			const { index, value } = payload;
			const fields = cloneDeep(state.fields);
			fields[index as number].value = value as string;

			return {
				...state,
				fields,
			};
		}

		case DocFormActionKind.ADD_FIELD: {
			if (!state.fields) return state;

			const { key, value } = payload;
			const fields = cloneDeep(state.fields);
			fields.push({ key: key as string, value: value as string });

			return {
				...state,
				fields,
			};
		}

		case DocFormActionKind.REMOVE_FIELD: {
			if (!state.fields) return state;

			const { index } = payload;
			const fields = cloneDeep(state.fields);
			fields.splice(index as number, 1);

			return {
				...state,
				fields,
			};
		}

		default:
			return state;
	}
};
