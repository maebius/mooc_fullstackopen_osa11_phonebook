module.exports = (api) => {
  api.cache(false);

  const presets = [
    ['@babel/preset-env', {
      modules: 'auto',
    }],
    '@babel/preset-react',
  ];

  return {
    presets,
  };
};
