var React = require('react');

module.exports = React.createClass({
	render: function() {
		var items = this.props.items.map((i)=><a href={i + '.html'}>{i}</a>)
		return <nav>
			{items}
		</nav>
	}
});
