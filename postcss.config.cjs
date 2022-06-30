// ❗ Even empty, this file is required for tailwindcss
module.exports = {
  plugins: {
    autoprefixer: {},
    tailwindcss: {},
    ...(process.env.NODE_ENV === 'production' && { cssnano: {} }),
  },
};
