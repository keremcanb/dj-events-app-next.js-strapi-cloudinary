module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'airbnb-typescript',
    'prettier'
  ],
  parserOptions: {
    project: './tsconfig.json'
  },
  "rules": {
    "react/require-default-props": 0,
    "react/no-unescaped-entities": 0,
    "no-shadow": 0,
    "no-restricted-globals": 0,
    "import/no-unresolved": 0,
    "guard-for-in": 0,
    "react/react-in-jsx-scope": 0,
    "no-restricted-syntax": 0,
    "jsx-a11y/anchor-is-valid": 0,
    "jsx-a11y/click-events-have-key-events": 0,
    "jsx-a11y/no-static-element-interactions": 0,
    "jsx-a11y/no-static-element-interactions": 0,
    "react/no-children-prop": 0,
    "react/jsx-props-no-spreading": 0,
    "react/prop-types": 0,
    "react/button-has-type": 0,
    "jsx-a11y/label-has-associated-control": 0
  }
};
