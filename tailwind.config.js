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
                    open: {
                        DEFAULT: '#1693B6',
                        light: '#5BB9D4',
                        dark: '#0B5C75',
                    },
                    inProgress: {
                        DEFAULT: '#06336C',
                        light: '#3F6FA1',
                        dark: '#021A36',
                    },
                    done:{
                        DEFAULT: '#30123F',
                        light: '#5A3A6A',
                        dark: '#1A0824',
                    },
                    waiting: {
                        DEFAULT: '#D0207D',
                        light: '#E85CA4',
                        dark: '#7A0F49',
                    },
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

