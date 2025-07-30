/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#1693b6',
                    light: '#4fb9d4',
                    dark: '#0e6a85',
                },
                secondary: {
                    DEFAULT: '#30123f',
                    light: '#4c2a63',
                    dark: '#1f0c2a',
                },
                status: {
                    open: '#ef4444',
                    inProgress: '#fbbf24',
                    done: '#1693b6',
                    waiting: '#30123f',
                },
            },
        },
    },
    plugins: [
        require('postcss-import'),
        require('tailwindcss'),
        require('autoprefixer'),
        function ({addBase}) {
            addBase({
                'h3': {fontWeight: '700', fontSize: '1.25rem'},
            })
        }
    ],
}

