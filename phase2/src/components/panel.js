import React, { Component } from 'react';

export default class Panel extends Component {
  render() {
    return <div style={{ padding: '4px 8px' }}>
      {this.props.children}
    </div>;
  }
}
