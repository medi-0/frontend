import { createContext, PropsWithChildren, useContext, useState } from "react";
import { Field } from "../../../../lib/utils";

interface ModalStateContext {
	docFields: Field[] | null;
	setDocFields: (fields: Field[]) => void;
}

export const ModalStateContext = createContext<ModalStateContext>({
	docFields: null,
	setDocFields: () => {},
});

export const useModalState = function () {
	return useContext(ModalStateContext);
};

// should probably use useReducer
export const ModalStateProvider: React.FC<PropsWithChildren> = function ({ children }) {
	const [fields, setFields] = useState<Field[] | null>(null);

	return (
		<ModalStateContext.Provider
			value={{
				docFields: fields,
				setDocFields: setFields,
			}}
		>
			{children}
		</ModalStateContext.Provider>
	);
};
