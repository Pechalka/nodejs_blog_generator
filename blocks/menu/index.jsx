var React = require('react');

var Item = require('./item');

require('./menu.css')

module.exports = React.createClass({
	componentDidMount: function() {
		console.log('menu ready')
	},
	render: function() {
		var items = this.props.items.map((i)=><Item title={i} href={i + '.html'}/>)
		return <nav className="menu">
			{items}
		</nav>
	}
});
