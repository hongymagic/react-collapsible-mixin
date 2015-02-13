jest.dontMock('../react-collapsible-mixin.js');

function toArray(str) {
	return str.split(' ');
}

describe('react-collapsible-mixin', function () {
	var React            = require('react/addons');
	var TestUtils        = React.addons.TestUtils;
	var Simulate         = TestUtils.Simulate;
	var CollapsibleMixin = require('../react-collapsible-mixin.js');
	var extend           = require('object-assign');

	var TestComponent = React.createClass({
		mixins: [CollapsibleMixin],

		render: function () {
			// References for collapsible contents
			var c1 = 'collapsible-content-1';
			var c2 = 'collapsible-content-2';

			var collapserClassSet    = { 'test-collapser': true };
			var collapsibleClassSet  = { 'test-collapsible': true };
			var collapsibleClassSet2 = extend({ 'in': true }, collapsibleClassSet);

			return (
				<div className="container">
					<div className="row">
						<div className="col-xs-12">
							<a
								href={'#' + c1}
								className={this.getCollapserClassSet(c1, collapserClassSet)}
								onClick={this._onToggleCollapsible}>
								Toggle
							</a>
						</div>
						<div
							id={c1}
							ref={c1}
							className={this.getCollapsibleClassSet(c1, collapsibleClassSet)}>
							<p>Here are some random content</p>
							<p>That will toggle</p>
						</div>
					</div>
					<div className="row">
						<div className="col-xs-12">
							<a
								href={'#' + c2}
								className={this.getCollapserClassSet(c2, collapserClassSet)}
								onClick={this._onToggleCollapsible}>
								<span
									className="nested">
									Toggle
								</span>
							</a>
						</div>
						<div
							id={c2}
							ref={c2}
							className={this.getCollapsibleClassSet(c2, collapsibleClassSet2)}>
							<p>Here are some random content</p>
							<p>That will toggle</p>
						</div>
					</div>
				</div>
			);
		}
	});

	var component, content1, content2, collapser1, collapser2, collapser2nested;
	beforeEach(function () {
		component = TestUtils.renderIntoDocument(
			<TestComponent />
		);

		var collapsers = TestUtils.scryRenderedDOMComponentsWithClass(component, 'test-collapser');
		var contents   = TestUtils.scryRenderedDOMComponentsWithClass(component, 'test-collapsible');

		collapser1     = collapsers[0];
		collapser2     = collapsers[1];
		content1       = contents[0];
		content2       = contents[1];

		collapser2nested = TestUtils.findRenderedDOMComponentWithClass(component, 'nested');
	});

	describe('default state', function () {
		it('should have collapsed class on the collapser', function () {
			expect(toArray(collapser1.props.className)).toContain('collapsed');
			expect(toArray(collapser2.props.className)).not.toContain('collapsed');
		});

		it('should have collapse class on the content', function () {
			expect(toArray(content1.props.className)).toContain('collapse');
			expect(toArray(content1.props.className)).not.toContain('in');

			expect(toArray(content2.props.className)).toContain('collapse');
			expect(toArray(content2.props.className)).toContain('in');
		});
	});

	describe('toggling via collapser', function () {
		it('should show on click of the collapser', function () {
			Simulate.click(collapser1);

			expect(toArray(collapser1.props.className)).not.toContain('collapsed');
			expect(toArray(content1.props.className)).toContain('in');

			Simulate.click(collapser2);

			expect(toArray(collapser2.props.className)).toContain('collapsed');
			expect(toArray(content2.props.className)).not.toContain('in');
		});

		it('should work when nested element raised an event', function () {
			Simulate.click(collapser2nested);

			expect(toArray(collapser2.props.className)).toContain('collapsed');
			expect(toArray(content2.props.className)).not.toContain('in');
		});
	});
});