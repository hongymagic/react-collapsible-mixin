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

* Each collapsible content element must have unique `ref` that has `collapsible` prefix
* Each collapser (trigger) element must have `href` set referencing `'#' + ref`
* Each collapser (trigger) element must pass `ref` of the content its responsible for toggling

```js
var CollapsibleMixin = require('react-collapsible-mixin');

var MyComponent = React.createClass({
	mixins: [CollapsibleMixin],

	render: function () {
		var c1_ref = 'collapsible-content-1';
		var c2_ref = 'collapsible-content-2';

		return (
			<div className="row">
				<div className="col-xs-12">
					<a
						href={'#' + c1_ref}
						className={this.getCollapserClassSet(c1_ref)}
						onClick={this._onToggleCollapsible}>
						Toggle
					</a>
					<a
						href={'#' + c2_ref}
						className={this.getCollapserClassSet(c2_ref)}
						onClick={this._onToggleCollapsible}>
						Toggle
					</a>
				</div>
				<div
					ref={c1_ref}
					className={this.getCollapsibleClassSet(c1_ref)}>
					<p>Here are some random content</p>
					<p>That will toggle</p>
				</div>
				<div
					ref={c2_ref}
					className={this.getCollapsibleClassSet(c2_ref)}>
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

`this.state.expanded`: contains key values pairs that map each `ref` to
its current expanded state. State is obtained initial after component has been
mounted by inspecting collapsible content element for existing `in` className.

##### getCollapserClassSet(ref, defaults)

Helper function to grab class names for the collapser element. You can
optionally pass in defaults object to set extra class names.

##### getCollapsibleClassSet(ref, defaults)

Helper function to grab class names for the collapsible element. You can
optionally pass in defaults object to set extra class names.

##### \_onToggleCollapsible

Event handler which you can attach to collapsers.

### Remembering state

Use it with existing `LocalStorageMixin` to remember the state of the
collapsible element.

### Recent changes

#### 13th Feb 2015

* Add support for multiple collapsible elements
