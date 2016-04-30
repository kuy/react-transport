import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

const RETRY_COUNT = 20;
const RETRY_DURATION = 500;

export default class Transport extends Component {
  static get displayName() {
    return 'Transport';
  }

  static get propTypes() {
    return {
      children: PropTypes.any.isRequired,
      to: PropTypes.any.isRequired,
      replace: PropTypes.bool,
      prepend: PropTypes.bool,
      append: PropTypes.bool,
      wrapBy: PropTypes.oneOfType([
        PropTypes.func, PropTypes.string
      ]),
    };
  }

  static get defaultProps() {
    return {
      wrapBy: 'div'
    };
  }

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
      console.error("Error: 'children' is required props for <Transport> component.");
      return;
    }

    if (typeof this.mount.container === 'undefined') {
      // Determine reference element
      const { to } = this.props;
      if (typeof to === 'undefined') {
        console.error("Error: 'to' is required props for <Transport> component.");
        return;
      }

      let list;
      if (typeof to === 'string') {
        list = document.querySelectorAll(to);
      } else {
        list = [to];
      }
      if (!list || list.length === 0) {
        return this.retry();
      }
      if (list.length !== 1) {
        console.warn('Warning: Query result has multiple DOM elements. We continue by using first element.');
      }
      const ref = list[0];

      // Setup parent element
      const { prepend, append, replace } = this.props;

      if (prepend) {
        this.mount.container = document.createElement('div');
        if (ref.hasChildNodes()) {
          ref.insertBefore(this.mount.container, ref.childNodes[0]);
        } else {
          ref.appendChild(this.mount.container);
        }
      } else if (append) {
        this.mount.container = document.createElement('div');
        ref.appendChild(this.mount.container);
      } else {
        this.mount.container = ref;
      }
    }

    let body;
    let { wrapBy } = props;
    switch (typeof wrapBy) {
      case 'string':
        body = React.createElement(wrapBy, null, children);
        break;
      case 'function':
        body = wrapBy(children);
        break;
      default:
        throw `ERROR: 'wrapBy' should be string or function`
    }

    ReactDOM.unstable_renderSubtreeIntoContainer(
      this, body, this.mount.container, () => this.done()
    );
  }

  render() {
    return <span />;
  }
}
