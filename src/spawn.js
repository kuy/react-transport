import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const RETRY_COUNT = 20;
const RETRY_DURATION = 500;

export default class Spawn extends Component {
  constructor(props) {
    super(props);
    const { replace, prepend, append } = props;
    const method = prepend ? 'prepend' : (append ? 'append' : 'replace');
    this.mount = { done: true, retry: 0, method };
  }

  componentDidMount() {
    this.renderOutside();
  }

  componentWillReceiveProps(nextProps) {
    this.renderOutside(nextProps);
  }

  retry() {
    if (this.mount.token || RETRY_COUNT <= this.mount.retry) {
      console.warn('Warning: Retry limit is expired', this.mount);
      return;
    }
    this.mount.retry += 1;
    this.mount.done = false;
    this.mount.token = setTimeout(() => {
      delete this.mount['token'];
      this.renderOutside();
    }, RETRY_DURATION);
  }

  done() {
    this.mount = { ...this.mount, done: true, retry: 0 };
  }

  renderOutside(props) {
    if (typeof props === 'undefined') {
      props = this.props;
    }
    const { children } = props;
    if (typeof children === 'undefined') {
      console.error("Error: 'children' is required props for Spawn.");
      return;
    }

    if (typeof this.mount.container === 'undefined') {
      // Find reference element
      const { to } = this.props;
      if (typeof to === 'undefined') {
        console.error("Error: 'to' is required props for Spawn.");
        return;
      }
      const list = document.querySelectorAll(to);
      if (!list || list.length === 0) {
        return this.retry();
      }
      if (list.length !== 1) {
        console.warn('Warning: Query result has multiple DOM elements. We continue by using first element.');
      }

      // Setup parent element
      const { prepend, append } = this.props;
      const el = list[0];
      if (prepend) {
        this.mount.container = document.createElement('div');
        if (el.hasChildNodes()) {
          el.insertBefore(this.mount.container, el.childNodes[0]);
        } else {
          el.appendChild(this.mount.container);
        }
      } else if (append) {
        this.mount.container = document.createElement('div');
        el.appendChild(this.mount.container);
      } else {
        this.mount.container = el;
      }
    }

    ReactDOM.unstable_renderSubtreeIntoContainer(this, (
      <div>{children}</div>
    ), this.mount.container, () => this.done());
  }

  render() {
    return <span />;
  }
}
