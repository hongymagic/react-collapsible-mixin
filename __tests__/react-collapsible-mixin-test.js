jest.dontMock('../react-collapsible-mixin.js');

function toArray(str) {
	return str.split(' ');
}

describe('react-collapsible-mixin', function () {
	var React            = require('react/addons');
	var TestUtils        = React.addons.TestUtils;
	var Simulate         = TestUtils.Simulate;
	var CollapsibleMixin = require('../react-collapsible-mixin.js');

	var TestComponent = React.createClass({
		mixins: [CollapsibleMixin],

		render: function () {
			var collapserClassSet   = { 'test-collapser': true };
			var collapsibleClassSet = { 'test-collapsible': true };

			return (
				<div className="row">
					<div className="col-xs-12">
						<a
							className={this.getCollapserClassSet(collapserClassSet)}
							onClick={this._onToggleCollapsible}>
							Toggle
						</a>
					</div>
					<div
						className={this.getCollapsibleClassSet(collapsibleClassSet)}>
						<p>Here are some random content</p>
						<p>That will toggle</p>
					</div>
				</div>
			);
		}
	});

	var component, content, collapser;
	beforeEach(function () {
		component = TestUtils.renderIntoDocument(
			<TestComponent />
		);

		content = TestUtils.findRenderedDOMComponentWithClass(component, 'test-collapsible');
		collapser = TestUtils.findRenderedDOMComponentWithClass(component, 'test-collapser');
	});

	describe('default state', function () {
		it('should have state set to false default', function () {
			expect(component.state.expanded).toBe(false);
		});

		it('should have collapsed class on the collapser', function () {
			expect(toArray(collapser.props.className)).toContain('collapsed');
		});

		it('should have collapse class on the content', function () {
			expect(toArray(content.props.className)).toContain('collapse');
			expect(toArray(content.props.className)).not.toContain('in');
		});
	});

	describe('toggling via collapser', function () {
		it('should show on click of the collapser', function () {
			Simulate.click(collapser);

			expect(toArray(collapser.props.className)).not.toContain('collapsed');
			expect(toArray(content.props.className)).toContain('in');
		});
	});
});