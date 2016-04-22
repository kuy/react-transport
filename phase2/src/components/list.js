import React, { Component } from 'react';

function color(presence) {
  return presence === 'active' ? 'black' : '#ccc';
}

export default class List extends Component {
  render() {
    const { items } = this.props;
    if (items && 0 < items.length) {
      return <ul>
        {items.map((item, i) =>
          <li key={i + item.email} style={{ color: color(item.presence) }}>
            <span title={item.email}>{item.name}</span>: {item.presence}
          </li>
        )}
      </ul>;
    } else {
      return <div>No members in this thread</div>;
    }
  }
}
