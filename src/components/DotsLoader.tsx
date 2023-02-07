import { useCallback, useEffect, useRef, useState } from "react";

interface Props {
	text?: string;
	speed?: number;
	maxDotCount?: number;
}

export default function DotsLoader({ text, speed = 500, maxDotCount = 3 }: Props) {
	const textRef = useRef<HTMLSpanElement | null>(null);
	const [totalDots, setTotalDots] = useState<number>(maxDotCount);

	const onChange = useCallback(() => {
		setTotalDots((prev) => {
			// console.log("dots2", prev);
			if (prev === maxDotCount) return 0;
			return prev + 1;
		});
	}, []);

	useEffect(() => {
		console.log("dots", totalDots);
		if (!textRef.current) return;

		textRef.current.textContent = text + ".".repeat(totalDots);
	}, [totalDots]);

	useEffect(() => {
		setInterval(onChange, speed);
	}, []);

	return (
		<span ref={textRef}>
			{/* {text}
			{".".repeat(totalDots)} */}
		</span>
	);
}
