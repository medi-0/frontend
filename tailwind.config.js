/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx}",
		"./src/components/**/*.{js,ts,jsx,tsx}",
		"./src/*.tsx",
		"./src/lib/hooks/*.tsx",
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Inter", "sans-serif"],
				mono: ["Space Mono", "monospace"],
			},
		},
	},
	plugins: [],
};
