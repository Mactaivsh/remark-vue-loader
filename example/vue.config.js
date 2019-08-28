const path = require('path')

module.exports = {
  configureWebpack: {
    module: {
      rules: [{
        test: /\.md$/,
        include: [
          path.resolve(__dirname, './markdown')
        ],
        use: [
          {
            loader: 'vue-loader'
          },
          {
            loader: path.resolve(__dirname, '../index.js'),
            options: {
              cache: false,
              components: [
                './src/components/*.vue'
              ],
              // There's another way:
              // components: {
              //   'MyCustomComp': './src/components/MyCustomComp.vue'
              // },
              transformers: [],
              preprocess (sourcem, api) {},
              processing (ast, api) {},
              postprocess (sfc, api) {}
            }
          }
        ]
      }]
    }
  }
}