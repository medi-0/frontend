import DocumentCardContainer from "./DocumentListCard";

interface ContainerProps {
	items?: any[];
}

function DocumentListContainer({ items = [] }: ContainerProps) {
	return <DocumentList items={items} />;
}

interface Props {
	items: any[];
}

function DocumentList({ items }: Props) {
	return (
		<div className="h-full border flex-1 rounded-md border-slate-400 px-4 py-6 overflow-scroll flex flex-col gap-1">
			<DocumentCardContainer />
			<DocumentCardContainer />
			<DocumentCardContainer />
			<DocumentCardContainer />
			<DocumentCardContainer />
			<DocumentCardContainer />
			<DocumentCardContainer />
			<DocumentCardContainer />
			<DocumentCardContainer />
			<DocumentCardContainer />
			<DocumentCardContainer />
			<DocumentCardContainer />
			<DocumentCardContainer />
			<DocumentCardContainer />
			<DocumentCardContainer />
			<DocumentCardContainer />
			<DocumentCardContainer />
			<DocumentCardContainer />
			<DocumentCardContainer />
			<DocumentCardContainer />
			<DocumentCardContainer />
			<DocumentCardContainer />
			<DocumentCardContainer />
			<DocumentCardContainer />
		</div>
	);
}

export default DocumentListContainer;
