const path = require('path');
const MiniCss = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './src/index.js',

	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},

	module: {
		rules: [
			{
				test: /\.(s*)css$/,
				use: [MiniCss.loader, 'css-loader', 'sass-loader'],
			},
		],
	},

	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
		}),
		new MiniCss({
			filename: 'style.css',
		}),
	],

	devServer: {
		static: {
			directory: path.join(__dirname, 'dist'),
		},
		open: true,
	},

	mode: 'development',
};
