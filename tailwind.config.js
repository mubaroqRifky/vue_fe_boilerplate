/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        colors: {
            primary: "#00dc82",
            primaryDark: "#00bc74",
            primaryLight: "#d3ffee",

            primaryTransparent: "#00dc8263",
            primaryOutline: "#5affbbba",

            secondary: "#4ba58c",
            secondaryDark: "#00a375",
            secondaryLight: "#63c2a7",

            secondaryTransparent: "#4ba58ca3",
            secondaryOutline: "#0caa7ea3",

            black: "#000",
            white: "#ffffff",
            whiteTransparent: "#ffffff82",
            gray: "#DADADA",
            softGray: "#f3f3f3",
            lightGray: "#c9c9c9",
            darkGray: "#64748b",

            danger: "#ff3a3a",
            dangerOutline: "#de48486b",
            warning: "#FBBC05",
            orange: "#EE632C",
            red: "#FF0000",
            success: "#2299DC",
            transparent: "#00000085",
            clear: "#00000000",

            "blue-light": "#8AC1E9",
            "green-dark": "#138968c2",
            "green-soft": "#8AE9DD",
            "green-light": "#A1E976",
            "orange-light": "#FFC178",
            "red-light": "#FFEAEA",
            "gray-dark": "#273444",
        },
        fontFamily: {
            sans: ["Product Sans Medium", "Open Sans", "sans-serif"],
        },
        extend: {
            spacing: {
                "3xl": "25rem",
                "4xl": "30rem",
                "5xl": "34.375rem",
                "6xl": "40rem",
                "7xl": "60rem",
                "8xl": "96rem",
                "9xl": "128rem",
            },
            borderRadius: {
                "4xl": "2rem",
            },
            gridRow: {
                "span-10": "span 10 / span 10",
                "span-7": "span 7 / span 7",
            },
        },
        screens: {
            xs: "425px",
            sm: "640px",
            md: "768px",
            lg: "1024px",
            xl: "1280px",
            "2xl": "1536px",
        },
    },
    plugins: [],
};
