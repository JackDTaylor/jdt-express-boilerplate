const globalModules = `/home/e/edsmusar/.local/lib/node_modules`;
const baseDir = __dirname;
const webpack = require(`webpack`);
const path = require('path');
const fs = require('fs');

// let bPlugin = (name) => `${globalModules}/babel-plugin-${name}`;
// let bPreset = (name) => `${globalModules}/babel-preset-${name}`;

module.exports = {
	entry: `${baseDir}/frontend.jsx`,
	output: { path: baseDir, filename: '../assets/frontend.min.js' },
	devtool: false,
	resolve: {
		extensions: [".jsx", ".webpack.js", ".web.js", ".js", ".json"],
	},
	cache: {},
	externals: {
		'react': 'React',
		'react-dom': 'ReactDOM',
	},
	watchOptions: {
		ignored: [`/node_modules/`],
	},
	resolveLoader: {
		modules: [ globalModules ],
		extensions: [ '.js', '.json' ],
		mainFields: [ 'loader', 'main' ]
	},
	plugins: [],
	module: {
		loaders: [{
			test: /.jsx?$/,
			loader: 'babel-loader',
			exclude: /node_modules/,
			query: {
				presets: [
					"babel-preset-react",
					"babel-preset-env"
				],

				plugins: [
					"babel-plugin-transform-runtime",
					"babel-plugin-external-helpers",
					"babel-plugin-transform-decorators-legacy",
					"babel-plugin-transform-class-properties",
					"babel-plugin-transform-object-rest-spread",
					"babel-plugin-syntax-async-functions",
					"babel-plugin-transform-regenerator"
				]
			}
		}]
	}
};