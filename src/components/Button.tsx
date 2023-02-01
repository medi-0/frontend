interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
	text?: string;
}

export default function Button({ icon: Icon, text, className, ...props }: Props) {
	const btnClasses = `group/button absolute right-5 bottom-5 bg-zinc-400 flex p-3 rounded-full shadow-lg text-white ${
		className ? className : ""
	}`;
	const textClasses = `hidden group-hover/button:block ${text ? "px-6" : ""}`;

	return (
		<button className={btnClasses} {...props} type="button">
			<Icon />
			<div className={textClasses}>{text}</div>
		</button>
	);
}
