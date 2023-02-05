import MainProvider from "./providers";
import HospitalView from "./pages/doc-provisioner";
import PatientView from "./pages/fact-prover";
import MenuBar from "./components/MenuBar";
import { useAccount } from "wagmi";
import { useUserRole } from "./lib/hooks/useUserRole";
import { UserRole } from "./lib/types";

function App() {
	const { role } = useUserRole();
	const { isConnected } = useAccount();

	return (
		<div
			style={{ gridTemplateRows: "min-content 1fr" }}
			className="px-10 pt-5 pb-10 font-san h-screen grid gap-6"
		>
			<MenuBar />
			<div className="overflow-clip h-full">
				{isConnected ? (
					role === UserRole.HOSPITAL_ROLE ? (
						<div className="w-full h-full p-4 pt-3 rounded-lg border-2 border-[#432366] overflow-clip relative">
							<HospitalView />
						</div>
					) : role === UserRole.PATIENT_ROLE ? (
						<div className="w-full h-full p-4 pt-3 rounded-lg border-2 border-[#432366] overflow-clip relative">
							<PatientView />
						</div>
					) : null
				) : (
					<div className="h-full flex items-center justify-center text-neutral-400">
						Not logged in.
					</div>
				)}
			</div>
		</div>
	);
}

function AppWithContext() {
	return (
		<MainProvider>
			<App />
		</MainProvider>
	);
}

export default AppWithContext;
