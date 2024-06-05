/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT")

module.exports = withMT({
  mode: 'jit',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/**/*.{js,jsx,ts,tsx}"
  ],
  important:"#root",
  theme: {
    extend: {
      fontFamily: {
        FuturaMdBt :['FuturaMdBt', 'sans'],
        FutuBd : ['FutuBd', 'sans']
        
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),

  ],
 
})

