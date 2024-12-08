// tailwind.config.js
import { nextui } from '@nextui-org/react'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    // ...
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'img-clara': "url('/src/assets/fundo.png')",  // Imagem do fundo claro
        'img-escuro': "url('/src/assets/bgEscuro.png')",  // Imagem do fundo escuro
        'fundo-claro': "url('/src/assets/back.svg')",
        'fundo-escuro': "url('/src/assets/fundoBlack.png')"
      },
      images: {

        'logoClara': "url('/src/assets/logoBranca.png')",
        'logoEscura':  "url('/src/assets/logo.png')"

      },
    },
  },
  darkMode: "class",
  plugins: [nextui()]
}