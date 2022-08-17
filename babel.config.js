module.exports = {
  presets: [
    ['@babel/preset-react', { runtime: 'automatic' }],
    '@babel/preset-typescript',
    ['@babel/preset-env', { useBuiltIns: 'entry', corejs: '3' }],
  ],
};
