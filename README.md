[![Build Status](https://travis-ci.org/hongymagic/react-collapsible-mixin.svg?branch=master)](https://travis-ci.org/hongymagic/react-collapsible-mixin)

# React Collapsible mixin

Bootstrap like Collapsible mixin which work with a predefined toggling
behaviour.

## Usage

Usage via __npm__ and __browserify__ is recommended at this stage.

### Install

```
npm install --save react-collapsible-mixin
```

### Use

```js
var CollapsibleMixin = require('react-collapsible-mixin');

var MyComponent = React.createClass({
	mixins: [CollapsibleMixin],

	render: function () {
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
```

#### API

When you include CollapsibleMixin in your component you will get the
following states and functions added to your component:

##### State

`this.state.expanded`: indicates whether or not the component is currently
expanded. Defaults to false unless provided via `props`.

##### getCollapserClassSet(defaults)

Helper function to grab class names for the collapser element. You can
optionally pass in defaults object to set extra class names.

##### getCollapsibleClassSet(defaults)

Helper function to grab class names for the collapsible element. You can
optionally pass in defaults object to set extra class names.

##### \_onToggleCollapsible

Event handler which you can attach to collapsers.
