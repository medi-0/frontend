export default function MenuBar() {
	//  fetch state here
	//  have button logic here

	const buttonOnClick = () => {
		alert("sign out button ");
	};

	return (
		<div className="flex justify-between px-4 py-2 border border-slate-400 rounded-md mb-6">
			<div className="font-bold text-lg">Medi0</div>
			<button className="border text-xs px-3" onClick={buttonOnClick}>
				sign out
			</button>
		</div>
	);
}
