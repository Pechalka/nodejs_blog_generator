var React = require('react');

module.exports = React.createClass({

	render: function() {
		return <div>
			<h1>{this.props.title}</h1>
			<div>{this.props.children}</div>
		</div>
	}

});
