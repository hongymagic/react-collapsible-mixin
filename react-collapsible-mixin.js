var React = require('react/addons');
var Types = React.PropTypes;
var cx    = React.addons.classSet;

var CollapsibleMixin = {
	propTypes: {
		expanded: Types.bool
	},

	getDefaultProps: function () {
		return {
			expanded: false
		};
	},

	getInitialState: function () {
		return {
			expanded: this.props.expanded
		};
	},

	componentWillReceiveProps: function (delta) {
		if ('expanded' in delta) {
			this.setState({
				expanded: delta.expanded
			});
		}
	},

	getCollapserClassSet: function (defaults) {
		defaults = defaults || {};
		defaults.collapser = true;
		defaults.collapsed = !this.state.expanded;
		return cx(defaults);
	},

	getCollapsibleClassSet: function (defaults) {
		defaults = defaults || {};
		defaults.collapse = true;
		defaults['in'] = this.state.expanded;
		return cx(defaults);
	},

	_onToggleCollapsible: function (event) {
		event.preventDefault();

		this.setState({
			expanded: !this.state.expanded
		});
	}
};

module.exports = CollapsibleMixin;
