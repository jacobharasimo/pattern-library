module.exports = {
  stories: ['../src/**/*.stories.js'],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-knobs',
    '@storybook/addon-docs',
    '@storybook/preset-scss',
    'storybook-css-modules-preset',
    {
      name: '@storybook/addon-essentials',
      options: {
        actions: false,
      },
    },
  ],
};
