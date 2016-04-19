import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spawn from '../../src/spawn';
import { increment } from './actions';

class App extends Component {
  handleClick() {
    this.props.dispatch(increment());
  }

  render() {
    const { count } = this.props;
    return <div>
      <Spawn prepend to='div[role="banner"] > div:first-child > div:first-child > div:first-child'>
        <h3 onClick={this.handleClick.bind(this)}>Outside: {count}</h3>
      </Spawn>
    </div>;
  }
}

function select({ app }) {
  return { ...app };
}

export default connect(select)(App);
