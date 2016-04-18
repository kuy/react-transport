import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Spawn extends Component {
  componentDidMount() {
    this.renderOutside();
  }

  componentWillReceiveProps(nextProps) {
    this.renderOutside(nextProps);
  }

  renderOutside(props) {
    if (typeof props === 'undefined') {
      props = this.props;
    }
    const { to, children } = props;
    if (typeof to === 'undefined') {
      console.error("'to' is required props in Spawn component.");
      return;
    }
    if (typeof children === 'undefined') {
      console.error("'children' is required props in Spawn component.");
      return;
    }
    const container = document.getElementById(to);
    if (!container) {
      console.error(`Not found destination element: '#${to}'`);
      return;
    }
    ReactDOM.unstable_renderSubtreeIntoContainer(this, (
      <div>{children}</div>
    ), container);
  }

  render() {
    return <span />;
  }
}
