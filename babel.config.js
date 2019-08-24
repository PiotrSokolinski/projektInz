module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
      },
    ],
    '@babel/preset-react',
  ],
  plugins: ['styled-components', '@babel/plugin-proposal-class-properties', '@babel/plugin-syntax-dynamic-import'],
  env: {
    production: {
      only: ['app'],
      plugins: [
        '@babel/plugin-transform-react-constant-elements',
        '@babel/plugin-transform-react-inline-elements',
        'lodash',
        'transform-react-remove-prop-types',
      ],
    },
    test: {
      plugins: [
        '@babel/plugin-proposal-object-rest-spread',
        '@babel/plugin-transform-modules-commonjs',
        'dynamic-import-node',
      ],
    },
  },
}
