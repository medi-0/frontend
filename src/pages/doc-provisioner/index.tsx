import Button from "../../components/Button";
import MenuBar from "../../components/MenuBar";
import DocumentList from "../../components/DocumentList";
import { ReactComponent as UploadSvg } from "../../lib/assets/svg/upload.svg";
import { useMainModelContext } from "../../providers/MainModalContext";

function DocProvisionerContainer() {
	return <DocProvisioner />;
}

function DocProvisioner() {
	const modalContext = useMainModelContext();

	return (
		<div
			className="px-8 pt-5 pb-7 h-screen grid"
			style={{ gridTemplateRows: "min-content 1fr" }}
		>
			<MenuBar />
			<div className="max-w-screen-xl w-full mx-auto h-full gap-5 overflow-clip relative">
				<DocumentList />
				<Button onClick={modalContext.onOpen} icon={UploadSvg} text="Upload" />
			</div>
		</div>
	);
}

export default DocProvisionerContainer;
