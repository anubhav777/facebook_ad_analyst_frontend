// Import webpack module
var webpack = require("webpack");
// Import open browser plugin
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
//Import path module
const path = require('path');
module.exports = {
   entry: "./src/index.js", //set entry file
// Resolve to output directory and set file
output: {
    path: path.resolve("dist/assets"),
    filename: "bundle.js",
    
},
// Add Url param to open browser plugin
plugins: [new OpenBrowserPlugin({url: 'http://localhost:3000'})],
// Set dev-server configuration
devServer: {
   inline: true,
   contentBase: './dist', 
   historyApiFallback: true,
   port: 3000
},
// Add babel-loader to transpile js and jsx files
module: {
   rules: [
     {
       test: /\.js$/,
       exclude: /(node_modules|bower_components)/,
       use: {
         loader: 'babel-loader',
         options: {
           presets: ['@babel/preset-env']
         }
       }
     }
   ]
 }
}