/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        './index.html',
        './src/**/*.{vue,js,ts,jsx,tsx}',
        'node_modules/flowbite-vue/**/*.{js,jsx,ts,tsx}',
        'node_modules/flowbite/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                accent: '#5865f2',
                'off-white': '#f6f6f6',
                'little-grey': '#292929',
                'not-black': '#1d1d1d',
            },
            fontFamily: {
                body: 'Roboto, sans-serif',
                display: 'Ginto Nord, sans-serif',
            },
            animation: {
                'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
        },
    },
    plugins: [require('flowbite/plugin'), require('@tailwindcss/typography')],
};
