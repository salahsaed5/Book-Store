/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			backgroundImage: {
				"custom-gradient":
					"linear-gradient(78.43deg, #e5c9c9 -27.34%, #FCECEC 89.92%)",
			},
			colors: {
				main: "#393280",
				secondary: "#ED553B",
			},
			fontFamily: {
				Inter: ["'Inter'", "sans-serif"],
				Manrope: ["'Manrope'", "sans-serif"],
			},
			spacing: {
				"screen-minus-top-and-nav": "calc(100vh - 50px - 80px)",
			},
		},
	},
	plugins: [],
};
