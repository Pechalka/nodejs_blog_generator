var gulp = require('gulp');
var connect = require('gulp-connect');
var fs = require('fs');
var livereload = require('gulp-livereload');

var _ = require('lodash');
var path = require('path');
var templateFilePath = path.join(__dirname, 'template.html');
var templateText = fs.readFileSync(templateFilePath).toString()
var renderTemplate = _.template(templateText);


require('node-jsx').install({
	extension: '.jsx',
	harmony : true
})

var React = require('react');

var makeDOM = function(node){
	var pathToBlock = './blocks/' + node.block + '/index.jsx';
	delete require.cache[require.resolve(pathToBlock)]
	var Block = require(pathToBlock);
	var children = [];

	if (!!node.content && node.content.length > 0){
		children = node.content.map(function(d){ return makeDOM(d) })
	}

	return React.createElement(Block, node, children)
}



var renderPage = function(name){

	var Block = require('./blocks/page/index.jsx');

	var pathToTree = './pages/' + name + '.json';

	delete require.cache[require.resolve(pathToTree)]
	var tree = require(pathToTree);

	var root = makeDOM(tree);

	var body = React.renderToString(root);

	var html = renderTemplate({
		body : body
	})

	fs.writeFileSync(__dirname + '/www/' + name + '.html', html);	

	console.log('render page:', name);
	console.log('data :', tree);

}


gulp.task('build', function(){
	var files = fs.readdirSync(__dirname + '/www');
	files.forEach(function(fileName){
		var name = fileName.split('.')[0];
		renderPage(name)
	})
})


gulp.task('watch', function(){
	gulp.watch(['blocks/**', 'pages/**'], ['build'])
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

gulp.task('default', ['server', 'watch', 'build']);