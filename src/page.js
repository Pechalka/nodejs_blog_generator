
var React = require('react');
var req = require.context("blocks/", true, /index.jsx$/);

var getBlock = function(blockName){
	return req('./' + blockName + '/index.jsx')
}


var makeDOM = function(node){
	var Block = getBlock(node.block);
	var children = [];

	if (!!node.content && node.content.length > 0){
		children = node.content.map(function(d){ return makeDOM(d) })
	}

	return React.createElement(Block, node, children)
}



var Page = React.createClass({
	render: function() {
		var dom = makeDOM(this.props)
		return <div>
			{dom}
		</div>
	}

});


if (typeof window !== "undefined") {
  window.onload = function() {
    React.render(React.createFactory(Page)(data), document.getElementById("app"));
  };
}

module.exports = Page;


//})