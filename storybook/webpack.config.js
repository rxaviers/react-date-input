const webpack = require("webpack");
const GlobalizePlugin = require("globalize-webpack-plugin");

module.exports = {
  resolve: {
    extensions: ["", ".js", ".jsx"]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("storybook")
      }
    }),
    new GlobalizePlugin({
      production: false,
      developmentLocale: "en",
      messages: "i18n/[locale].json",
      output: "i18n/[locale].[chunkhash].js"
    })
  ]
};
