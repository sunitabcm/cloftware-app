/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./App.{js,jsx,ts,tsx}",
		"./app/**/*.{js,jsx,ts,tsx}",
		"./component/**/*.{js,jsx,ts,tsx}",
		"./src/**/*.{js,jsx,ts,tsx}",
	],
	theme: {
		colors: {
			'primary': '#535353',
			'menubg': '#E1E1E1',
			'lightgrey': '#999999',
			'offwhite': '#F6F6F6',
			'light': '#fff',
			'body': '#2A2D32',
			'error': '#FE0A0A',
			'secondary': '#FF6F1B',
			'gold': '#FEC532',
			'success': '#10B981',
			'magenta': '#9747FF',
			'disabled': '#CCCCCC',
		}
	},
	plugins: [
	],
}

