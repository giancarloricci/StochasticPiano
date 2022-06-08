module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true,
      modules: true,
      experimentalObjectRestSpread: true,
    },
  },
  env: {
    browser: true,
    jest: true,
  },
  
  extends: ['react-app', 'airbnb-base'],
  plugins: ['react'],
  rules: {
    'no-param-reassign': 0,
    'no-var': 0,
    'vars-on-top': 0,
    'block-scoped-var': 0,
    'no-redeclare': 0,
    'prefer-const': 0,
    'no-shadow': 0,
    'no-restricted-syntax':0,
    'no-useless-return': 0,
    'no-plusplus':0,
    'wrap-iife':0,
    'max-len':0,
    



    'react/jsx-closing-bracket-location': ['error', 'line-aligned'],
    'react/jsx-curly-brace-presence': ['warn', { props: 'always' }],
    'react/jsx-filename-extension': ['warn', { extensions: ['.js'] }],
    'react/jsx-max-props-per-line': ['warn', { maximum: 1 }],
    indent: ['warn', 2, { SwitchCase: 1 }],
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'ignore',
      },
    ],
    'function-paren-newline': ['off'],
  },

  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['node_modules', 'src/'],
      }
    }
  },
};
