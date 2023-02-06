import MenuBar from "../components/MenuBar";
import { UserRole } from "../lib/types";
import PatientView from "./fact-prover";
import HospitalView from "./doc-provisioner";
import { useUser } from "../providers/UserProvider";

export default function UserSpecificView() {
	const {
		role: { type },
	} = useUser();

	return (
		<div
			style={{ gridTemplateRows: "min-content 1fr" }}
			className="px-10 pt-5 pb-10 font-san h-screen grid gap-6"
		>
			<MenuBar />
			<div className="overflow-clip h-full">
				{type === UserRole.HOSPITAL_ROLE ? (
					<div className="w-full h-full p-4 pt-3 rounded-lg border-2 border-[#432366] overflow-clip relative">
						<HospitalView />
					</div>
				) : type === UserRole.PATIENT_ROLE ? (
					<div className="w-full h-full p-4 pt-3 rounded-lg border-2 border-[#432366] overflow-clip relative">
						<PatientView />
					</div>
				) : (
					<div>you are not registered bruh?</div>
				)}
			</div>
		</div>
	);
}
