module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	
	var React = __webpack_require__(1);
	var req = __webpack_require__(2);

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



	var Page = React.createClass({displayName: "Page",
		render: function() {
			var dom = makeDOM(this.props)
			return React.createElement("div", null, 
				dom
			)
		}

	});


	if (typeof window !== "undefined") {
	  window.onload = function() {
	    React.render(React.createFactory(Page)(data), document.getElementById("app"));
	  };
	}

	module.exports = Page;


	//})

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("React");

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./menu/index.jsx": 3,
		"./page/index.jsx": 6,
		"./text/index.jsx": 7
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 2;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);

	var Item = __webpack_require__(4);

	__webpack_require__(5)

	module.exports = React.createClass({displayName: "module.exports",
		componentDidMount: function() {
			console.log('menu ready')
		},
		render: function() {
			var items = this.props.items.map(function(i){return React.createElement(Item, {title: i, href: i + '.html'});})
			return React.createElement("nav", {className: "menu"}, 
				items
			)
		}
	});


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);

	var item = React.createClass({displayName: "item",

		render: function() {
			return React.createElement("a", {href: this.props.href}, this.props.title)
		}

	});

	module.exports = item;

/***/ },
/* 5 */
/***/ function(module, exports) {

	(function(exports) {
	  exports.noop = function(){};
	})(typeof module === 'object' && typeof module.exports === 'object' ? module.exports : window);


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);

	module.exports = React.createClass({displayName: "module.exports",

		render: function() {
			return React.createElement("div", null, 
				React.createElement("h1", null, this.props.title), 
				React.createElement("div", null, this.props.children)
			)
		}

	});


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);

	module.exports = React.createClass({displayName: "module.exports",

		render: function() {
			return React.createElement("div", null, 
				React.createElement("p", null, this.props.html), 
				React.createElement("div", null, this.props.children)
			)
		}

	});


/***/ }
/******/ ]);