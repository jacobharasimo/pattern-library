module.exports = {
  env: {
    jest: true,
    browser: true,
    es6: true
  },
  plugins: ['prettier', 'react', 'jsx-a11y', 'react-hooks'],
  extends: ['airbnb', 'prettier', 'prettier/react'],
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  root: true,
  globals: {
    window: true,
    browser: true,
  },
  rules: {
    'prettier/prettier': ['error', prettierOptions],
    "arrow-body-style": [2, "as-needed"],
    "comma-dangle": ["off", "never"],
    "linebreak-style": ["off", "windows"],
    "function-paren-newline": ["warn", "consistent"],
    "brace-style": 0,
    "require-yield": 0,
    "prefer-destructuring": [
      "warn",
      {
        array: false,
        object: true
      },
      {
        enforceForRenamedProperties: false
      }
    ],
    "max-lines": ["warn", 450],
    "max-classes-per-file": 1,
    "newline-per-chained-call": 0,
    "no-console": 2,
    "no-use-before-define": 0,
    "prefer-template": 2,
    "class-methods-use-this": 0,
    "no-debugger": "warn",

    "import/imports-first": 0,
    "import/newline-after-import": 0,
    "import/no-dynamic-require": 0,
    "import/no-extraneous-dependencies": 0,
    "import/no-named-as-default": 0,
    "import/no-unresolved": 2,
    "import/prefer-default-export": 0,
    "import/no-webpack-loader-syntax": 2,

    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",

    "react/forbid-prop-types": 0,
    "react/no-danger": 0,
    "react/no-multi-comp": 1,
    "react/require-default-props": 2,
    "react/require-extension": 0,
    "react/self-closing-comp": 0,

    "react/jsx-first-prop-new-line": [2, "multiline"],
    "react/jsx-curly-newline": 0,
    "react/jsx-uses-vars": 2,
    "react/jsx-uses-react": 2,
    "react/jsx-filename-extension": 0,
    "react/jsx-no-target-blank": 2,

    "jsx-a11y/media-has-caption": 1,
    "jsx-a11y/anchor-is-valid": [
      "error",
      {
        components: ["Link"],
        specialLink: ["to"]
      }
    ],
    "jsx-a11y/alt-text": 2,
    "jsx-a11y/click-events-have-key-events": 2,
    "jsx-a11y/html-has-lang": 2,
    "jsx-a11y/no-autofocus": 2,
    "jsx-a11y/aria-props": 2,
    "jsx-a11y/heading-has-content": 0,
    "jsx-a11y/href-no-hash": "off",
    "jsx-a11y/label-has-for": 1,
    "jsx-a11y/mouse-events-have-key-events": 2,
    "jsx-a11y/role-has-required-aria-props": 2,
    "jsx-a11y/role-supports-aria-props": 2,
    "react/jsx-props-no-spreading": "off",
    "react/no-array-index-key": "off"
  },
  ignorePatterns:[
    '/coverage/*',
    '/dist/*',
    '/node_modules/',
    '/.next/'
  ],
  settings: {
    "import/resolver": {
      node: {
        paths: [
          "src"
        ]
      }
    },
    react: {
      version: "detect"
    },
  }
};
