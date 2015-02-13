var React = require('react/addons');
var Types = React.PropTypes;
var cx    = React.addons.classSet;

function isCollapsibleRef(ref) {
	return ref.search(/^collapsible/) === 0;
}

function hasClass(className, _class) {
	return (className || '').split(' ').indexOf(_class) >= 0;
}

var CollapsibleMixin = {
	propTypes: {
		expanded: Types.objectOf(Types.bool)
	},

	getInitialState: function () {
		return {
			expanded: this.props.expanded || {}
		};
	},

	// When component mounts, inspect all the collapsible elements and
	// determine their current expanded states by looking for class name `in`.
	componentDidMount: function () {
		var collapsibles = Object.keys(this.refs).filter(isCollapsibleRef);
		var expanded = collapsibles.reduce(function (result, collapsible) {
			result[collapsible] = hasClass(this.refs[collapsible].props.className, 'in');
			return result;
		}.bind(this), {});
		this.setState({ expanded: expanded });
	},

	getCollapserClassSet: function (ref, defaults) {
		defaults = defaults || {};
		defaults.collapser = true;
		defaults[ref] = true;
		if (ref in this.state.expanded) {
			defaults.collapsed = !this.state.expanded[ref];
		}
		return cx(defaults);
	},

	getCollapsibleClassSet: function (ref, defaults) {
		defaults = defaults || {};
		defaults.collapse = true;
		defaults[ref] = true;
		if (ref in this.state.expanded) {
			defaults['in'] = this.state.expanded[ref];
		}
		return cx(defaults);
	},

	_onToggleCollapsible: function (event) {
		var target   = event.currentTarget.getAttribute('href');
		var expanded = this.state.expanded;

		if (target) {
			event.preventDefault();
			target = target.replace(/^#/, '');
			expanded[target] = !this.state.expanded[target];
			this.setState({
				expanded: expanded
			});
		}
	}
};

module.exports = CollapsibleMixin;
