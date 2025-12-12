export default {
  plugins: {
    "@tailwindcss/postcss": {
      // Use sRGB color space instead of oklch to avoid PDF generation issues
      colorSpace: "srgb",
    },
  },
};
