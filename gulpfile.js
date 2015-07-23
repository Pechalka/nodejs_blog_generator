var gulp = require('gulp');
var connect = require('gulp-connect');
var fs = require('fs');
var livereload = require('gulp-livereload');
var webpack = require('webpack');
var _ = require('lodash');
var path = require('path');
var templateFilePath = path.join(__dirname, 'src', 'template.html');
var templateText = fs.readFileSync(templateFilePath).toString()
var renderTemplate = _.template(templateText);
var ExtractTextPlugin = require("extract-text-webpack-plugin");

require('node-jsx').install({
	extension: '.jsx',
	harmony : true
})

var React = require('react');






var renderPage = function(name){

	var pathToRender = './www/render.js'
	delete require.cache[require.resolve(pathToRender)]
	var Render = React.createFactory(require(pathToRender));

	var pathToTree = './pages/' + name + '.json';
	delete require.cache[require.resolve(pathToTree)]
	var tree = require(pathToTree);

	var root = Render(tree);

	var body = React.renderToString(root);

	var html = renderTemplate({
		body : body,
		tree : JSON.stringify(tree)
	})

	fs.writeFileSync(__dirname + '/www/' + name + '.html', html);	

	console.log('render page:', name);
	console.log('data :', tree);

}


var config = [
{  
	entry: path.resolve(__dirname, 'src', 'page.js') , 
    output: {
        path: path.resolve(__dirname, 'www'), 
        filename: "bundle.js"
    },
    resolve: {
        root: path.resolve(__dirname),
        extensions: ['', '.js', '.jsx'],
    },
    module: {
        loaders: [
            {test: /\.jsx$/, loader: 'jsx-loader?harmony'},
            {test: /\.js$/, loader: 'jsx-loader?harmony'},

            {
          		test: /\.css$/, // Only .css files
          		loader: ExtractTextPlugin.extract('style-loader', 'css-loader') // Run both loaders
        	},
        	{ 
            	test: /\.styl$/, 
            	loader: ExtractTextPlugin.extract("stylus", "css-loader!stylus-loader") 
        }	, 
        ]
    },
    plugins : [
    	new ExtractTextPlugin("bundle.css",{
            allChunks: true
        }),
    ],
    externals: {
        'react': 'React'
    },
},
{	
	target: "node",
	entry: path.resolve(__dirname, 'src', 'page.js') , 
    output: {
        path: path.resolve(__dirname, 'www'), 
        filename: "render.js",
		libraryTarget: "commonjs2"
    },
    resolve: {
        root: path.resolve(__dirname),
        extensions: ['', '.js', '.jsx'],
    },
    module: {
        loaders: [
            {test: /\.jsx$/, loader: 'jsx-loader?harmony'},
            {test: /\.js$/, loader: 'jsx-loader?harmony'}
        ]
    },
    plugins : [
    	//new webpack.IgnorePlugin(/\.(css|less)$/),
    	new webpack.NormalModuleReplacementPlugin(/\.css$/, 'node-noop')
    ],
    externals: {
        'react': 'React'
    }
}
]


gulp.task('js', function(cb){
	var compiler = webpack(config);
	compiler.run(function (err, stats) {
		console.log(stats);

		if (err){
			console.log('build fail:');
			console.log(err)
		} else {
			console.log('build completed');			
		}
	});

	cb();
})

gulp.task('html', ['js'], function(){
	var files = fs.readdirSync(__dirname + '/pages');
	files.forEach(function(fileName){
		var name = fileName.split('.')[0];
		renderPage(name)
	})
})


gulp.task('watch', function(){
	gulp.watch(['blocks/**', 'pages/**'], ['html', 'js'])
	.on('change', function (file) {
    	gulp.src( file.path)
        	.pipe( connect.reload() );
	});

})



gulp.task('server', function(){
	connect.server({
        port : 7000,
        root : 'www',
        livereload: true
	});
})

gulp.task('default', ['server', 'watch', 'html', 'js']);