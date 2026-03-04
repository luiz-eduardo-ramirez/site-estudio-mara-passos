import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        mara: {
          orange: "#FF6600", // Laranja vibrante das imagens
          dark: "#080808",   // Fundo preto principal
          gray: "#141414",   // Fundo de cards/seções secundárias
          text: "#E5E5E5",   // Texto claro de fácil leitura
        }
      },
    },
  },
  plugins: [],
};
export default config;