module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: '4.0.0'
        }
      }
    ]
  ],
  plugins: [
  ],
  env: {
    test: {
      plugins: [
      ]
    }
  }
}
