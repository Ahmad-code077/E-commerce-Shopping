/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      maxWidth: {
        'screen-2xl': '1400px',
        'custom-1200': '1200px',
        'custom-900': '900px',
      },
      colors: {
        // Adjusted color scheme
        primary: '#001D3D', // Navy Blue
        'primary-dark': '#001029', // A deeper, richer navy for hover states
        secondary: '#003566', // Blue Complement
        'secondary-dark': '#002651', // Darker shade for secondary elements
        boldColor: '#FFD700', // Gold for attention-grabbing elements

        darkCharcoal: '#333333', // Neutral dark for text
        'darkCharcoal-dark': '#1F1F1F', // An even darker neutral for contrast
        'primary-light': '#f4e5ec', // Light pinkish
        'primary-light-dark': '#e8d0da', // Slightly deeper for hover effects
        'text-dark': '#0f172a', // Dark readable gray
        'text-dark-muted': '#0d1525', // Subtle variation for inactive elements
      },
    },
  },
  plugins: [],
};
