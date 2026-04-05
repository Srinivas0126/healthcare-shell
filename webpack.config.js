const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack");
const { dependencies } = require("./package.json");

const { container: { ModuleFederationPlugin }, DefinePlugin } = webpack;

const remoteEntryUrls = {
  dashboard: process.env.DASHBOARD_REMOTE_ENTRY_URL || "http://localhost:3004/remoteEntry.js",
  healthRecords:
    process.env.HEALTH_RECORDS_REMOTE_ENTRY_URL || "http://localhost:3005/remoteEntry.js",
  appointments: process.env.APPOINTMENTS_REMOTE_ENTRY_URL || "http://localhost:3002/remoteEntry.js",
  billing: process.env.BILLING_REMOTE_ENTRY_URL || "http://localhost:3003/remoteEntry.js"
};

const federationRemotes = Object.fromEntries(
  Object.entries(remoteEntryUrls).map(([remoteName, remoteEntryUrl]) => [
    remoteName,
    `${remoteName}@${remoteEntryUrl}`
  ])
);

module.exports = {
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    clean: true,
    publicPath: "auto",
    uniqueName: "healthcare_shell"
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.module\.css$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              esModule: true,
              modules: {
                namedExport: false,
                localIdentName: "[name]__[local]__[hash:base64:5]"
              }
            }
          }
        ]
      },
      {
        test: /\.css$/i,
        exclude: /\.module\.css$/i,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [
    new DefinePlugin({
      __APPOINTMENTS_REMOTE_ENTRY_URL__: JSON.stringify(remoteEntryUrls.appointments),
      __BILLING_REMOTE_ENTRY_URL__: JSON.stringify(remoteEntryUrls.billing),
      __DASHBOARD_REMOTE_ENTRY_URL__: JSON.stringify(remoteEntryUrls.dashboard),
      __HEALTH_RECORDS_REMOTE_ENTRY_URL__: JSON.stringify(remoteEntryUrls.healthRecords),
      __MF_HOST_NAME__: JSON.stringify("healthcare_shell")
    }),
    new ModuleFederationPlugin({
      name: "healthcare_shell",
      remotes: federationRemotes,
      shared: {
        react: {
          requiredVersion: dependencies.react,
          singleton: true
        },
        "react-dom": {
          requiredVersion: dependencies["react-dom"],
          singleton: true
        },
        "react-router-dom": {
          requiredVersion: dependencies["react-router-dom"],
          singleton: true
        }
      }
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    })
  ],
  devServer: {
    port: 3000,
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    historyApiFallback: true,
    hot: true
  }
};
