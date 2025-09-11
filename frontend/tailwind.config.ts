import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            keyframes: {
                slideIn: {
                    "0%": { opacity: "0", transform: "translateY(20px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
            },
            animation: {
                slideIn: "slideIn 0.6s forwards",
                slideIn200: "slideIn 0.6s 0.2s forwards",
                slideIn400: "slideIn 0.6s 0.4s forwards",
            },
        },
    },
    plugins: [],
};

export default config;
