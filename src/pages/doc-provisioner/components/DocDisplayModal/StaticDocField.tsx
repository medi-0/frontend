export default function StaticDocField({
	entryKey,
	entryValue,
}: {
	entryKey: string;
	entryValue: string;
}) {
	return (
		<div className="flex gap-2.5 items-stretch rounded-md">
			<input
				disabled
				type="text"
				className="border border-zinc-400 p-2 text-sm rounded-md flex-[3] pointer-events-none"
				defaultValue={entryKey}
			/>
			<input
				disabled
				type="text"
				className="border border-zinc-400 p-2 text-sm rounded-md flex-[6] pointer-events-none"
				defaultValue={entryValue}
			/>
		</div>
	);
}
