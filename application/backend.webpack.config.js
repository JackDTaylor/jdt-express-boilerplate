const globalModules = `/home/e/edsmusar/.local/lib/node_modules`;
const baseDir = __dirname;
const webpack = require(`webpack`);
const path = require('path');
const fs = require('fs');
const nodeExternals = require('webpack-node-externals');

function RestartOnCompile() {}

RestartOnCompile.prototype.apply = function(compiler) {
	compiler.plugin('done', function() {
		fs.closeSync(fs.openSync(__dirname + '/tmp/restart.txt', 'w'));
	});
};


module.exports = {
	entry: `${baseDir}/backend.jsx`,
	output: { path: baseDir, filename: 'backend.min.js' },
	target: 'node',
	devtool: false,
	resolve: {
		extensions: [".jsx", ".webpack.js", ".web.js", ".js", ".json"],
	},
	cache: {},
	externals: [nodeExternals()],
	watchOptions: {
		ignored: [`../node_modules/`],
	},
	resolveLoader: {
		modules: [ globalModules ],
		extensions: [ '.js', '.json' ],
		mainFields: [ 'loader', 'main' ]
	},
	plugins: [new RestartOnCompile()],
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