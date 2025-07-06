module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
};
// This file is used to configure PostCSS plugins for the project.
// It includes Tailwind CSS and Autoprefixer as plugins.
// The configuration is used to process CSS files in the project.
// The '@tailwindcss/postcss' plugin is used to enable Tailwind CSS features,
// while 'autoprefixer' is used to add vendor prefixes to CSS rules.
// This setup allows for modern CSS features to be used while ensuring compatibility across different browsers.
// The configuration is typically used in conjunction with a build tool like Next.js or Webpack.