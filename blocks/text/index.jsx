var React = require('react');

module.exports = React.createClass({

	render: function() {
		return <div>
			<p>{this.props.html}</p>
			<div>{this.props.children}</div>
		</div>
	}

});
