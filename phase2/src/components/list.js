import React, { Component } from 'react';

function color(presence) {
  return presence === 'active' ? 'black' : '#ccc';
}

export default class List extends Component {
  render() {
    const { items } = this.props;
    return <ul>
      {items.map((item, i) =>
        <li key={i + item.email} style={{ color: color(item.presence) }}>
          <span title={item.email}>{item.name}</span>: {item.presence}
        </li>
      )}
    </ul>;
  }
}
