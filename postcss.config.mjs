const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
   theme: {
    extend: {
      // Shimmer animation for skeleton loading
      animation: {
        shimmer: 'shimmer 2s infinite linear',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
};

export default config;
