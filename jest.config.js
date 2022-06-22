const config = {
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!<rootDir>/node_modules/',
    '!<rootDir>/src/**/__stories__/**',
    '!src/**/*.icon.js',
    '!src/serviceWorker.js',
    '!<rootDir>/src/index.js',
    '!src/theme/**/*.{js,jsx}',
  ],
  coverageThreshold: {
    global: {
      branches: 63,
      functions: 57,
      lines: 66,
      statements: 57,
    },
    verbose: true,
  },
};

module.exports = config;
