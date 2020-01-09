const webpack = require("webpack");
const modoDev = process.env.NODE_ENV != "production";
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 4. referenciando plugin de externalização
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssesPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  mode: modoDev ? "development" : "production", // 1. modo de desenvolvimento / outro modo é de produção (production) que é o padrão
  entry: "./src/principal.js",
  output: {
    filename: "principal.js",
    path: __dirname + "/public" // 2. pasta de saída
  },
  devServer: {
    contentBase: "./public",
    port: 9000
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true
      }),
      new OptimizeCSSAssesPlugin({})
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      // 4. referenciando plugin de externalização
      filename: "estilo.css"
    })
  ],
  module: {
    rules: [
      {
        test: /\.s?[ac]ss$/,
        use: [
          MiniCssExtractPlugin.loader, // 4. este plugin é conflitante com o style-loader, por isso ele ta comentado
          //'style-loader', // 3. Adiciona CSS a DOM injetando a tag <style>
          "css-loader", // 3. interpreta @import, url()...
          "sass-loader"
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"]
      }
    ]
  }
};
