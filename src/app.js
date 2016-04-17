import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { increment } from './actions';

class App extends Component {
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
    const { count } = props;
    const container = document.getElementById('outside');
    ReactDOM.unstable_renderSubtreeIntoContainer(this, (
      <div>
        <h2>Outside: {count}</h2>
      </div>
    ), container);
  }

  handleClick() {
    this.props.dispatch(increment());
  }

  render() {
    const { count } = this.props;
    return <div>
      <h2>Inside: {count}</h2>
      <input type="button" value="Change" onClick={this.handleClick.bind(this)} />
    </div>;
  }
}

function select({ app }) {
  return { ...app };
}

export default connect(select)(App);
