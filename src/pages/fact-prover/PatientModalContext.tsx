import {
	createContext,
	PropsWithChildren,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";
import { CIDString } from "web3.storage";
import { useMainModalContext } from "../../providers/MainModalContext";

interface IPatientModalContext {
	state: {
		docCid: CIDString | null;
	};
	open: (cid: CIDString) => void;
	// close: () => void;
}

export const PatientModalContext = createContext<IPatientModalContext>({
	state: { docCid: null },
	open: () => {},
	// close: () => {},
});

export const usePatientModal = function () {
	return useContext(PatientModalContext);
};

export const PatientModalProvider: React.FC<PropsWithChildren> = function ({ children }) {
	const mainModal = useMainModalContext();

	const [cid, setCid] = useState<CIDString | null>(null);

	const openModal = useCallback(
		(cid: CIDString) => {
			setCid(cid);
			console.log("cid asda", cid);

			mainModal.onOpen();
		},
		[mainModal]
	);

	return (
		<PatientModalContext.Provider
			value={{
				state: {
					docCid: cid,
				},
				open: openModal,
				// close: closeModal,
			}}
		>
			{children}
		</PatientModalContext.Provider>
	);
};
