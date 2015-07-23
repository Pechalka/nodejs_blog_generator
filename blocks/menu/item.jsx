var React = require('react');

var item = React.createClass({

	render: function() {
		return <a href={this.props.href}>{this.props.title}</a>
	}

});

module.exports = item;