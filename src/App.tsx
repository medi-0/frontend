import MainProvider from "./providers";
import DocProvisionerPage from "./pages/doc-provisioner";
import { Modal } from "./pages/doc-provisioner/components";
// import { Modal } from "./pages/fact-prover/components";

function App() {
	return (
		<div className="App font-sans h-80">
			<DocProvisionerPage />
			<Modal />
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
