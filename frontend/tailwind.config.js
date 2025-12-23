/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html", // If you are using Vite, include this.
    "./src/**/*.{js,jsx,ts,tsx}", // Scan all files in the src folder.
  ],
  theme: {
    extend: {}, // Add customizations here if needed
  },
  plugins: [], // Add plugins here if needed
};
