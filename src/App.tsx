import MainProvider from "./providers";
import DocProvisionerPage from "./pages/doc-provisioner";
import Modal from "./pages/doc-provisioner/components/DocModal";

function App() {
	return (
		<div className="App font-sans">
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
