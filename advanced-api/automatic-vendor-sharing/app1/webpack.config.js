const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");

// adds all your dependencies as shared modules
// version is inferred from package.json in the dependencies
// requiredVersion is used from your package.json
// dependencies will automatically use the highest available package
// in the federated app, based on version requirement in package.json
// multiple different versions might coexist in the federated app
// Note that this will not affect nested paths like "lodash/pluck"
// Note that this will disable some optimization on these packages
// with might lead the bundle size problems
// 将所有依赖项添加为共享模块
// 版本是从依赖项中的 package.json 推断出来的
// requiredVersion 是从你的 package.json 中使用的
// 依赖会自动使用最高可用的包
// 在联合应用程序中，基于 package.json 中的版本要求
// 多个不同版本可能共存于联合应用程序中
// 请注意，这不会影响像“lodash/pluck”这样的嵌套路径
// 请注意，这将禁用对这些包的一些优化
// 可能会导致包大小问题
const deps = require("./package.json").dependencies;

module.exports = {
  entry: "./src/index",
  mode: "development",
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    port: 3001,
  },
  target: "web",
  output: {
    publicPath: "auto",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-react"],
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "app1",
      filename: "remoteEntry.js",
      remotes: {
        app2: "appB@http://localhost:3002/remoteEntry.js",
      },
      exposes: {
        "./Button": "./src/Button",
      },
      shared: {
        ...deps,
        react: {
          singleton: true,
        },
        "react-dom": {
          singleton: true,
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
