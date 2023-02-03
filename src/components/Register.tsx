import { useMediCoreContract } from "../lib/hooks/useMediCoreContract";

export function Register() {
	const { contract } = useMediCoreContract();

	return (
		<div>
			<button
				onClick={() => {
					if (!contract) return;
					contract?.registerAsHospital(
						"Goofy Ahh Hospital",
						"Now this is goofy ahh looking hospital"
					);
				}}
			>
				register as hospital
			</button>
			<button
				onClick={() => {
					if (!contract) return;
					contract?.registerAsPatient();
				}}
			>
				As patient
			</button>
		</div>
	);
}
