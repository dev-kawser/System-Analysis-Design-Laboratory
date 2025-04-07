/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{js,jsx,tsx,ts}"],
    theme: {
        extend: {
            colors: {
                primary: '#263238',
                secondary: '#23B123',
                blackVariant: '#011621', // Note: camelCase is more common in JS
                offwhite: '#F0F0F0',
                silver: '#C0C0C0'
            },
        },
    },
    plugins: [],
}
