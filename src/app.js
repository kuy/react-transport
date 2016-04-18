import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { increment, add } from './actions';

class App extends Component {
  componentDidMount() {
    this.renderOutside1();
    this.renderOutside2();
  }

  componentWillReceiveProps(nextProps) {
    this.renderOutside1(nextProps);
    this.renderOutside2(nextProps);
  }

  renderOutside1(props) {
    if (typeof props === 'undefined') {
      props = this.props;
    }
    const { count } = props;
    const container = document.getElementById('outside-1');
    ReactDOM.unstable_renderSubtreeIntoContainer(this, (
      <div>
        <h2>Outside: {count}</h2>
      </div>
    ), container);
  }

  renderOutside2(props) {
    if (typeof props === 'undefined') {
      props = this.props;
    }
    const { notification } = props;
    const button = 0 < notification.length
      ? <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span className="glyphicon glyphicon-bell glyphicon-white" aria-hidden="true"></span> <span className="badge" style={{ marginTop: '-3px', marginBottom: '3px' }}>{notification.length}</span></a>
      : <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span className="glyphicon glyphicon-bell" aria-hidden="true"></span></a>;

    const container = document.getElementById('outside-2');
    ReactDOM.unstable_renderSubtreeIntoContainer(this, (
      <ul className="nav navbar-nav navbar-right">
        <li className="dropdown">
          {button}
          <ul className="dropdown-menu">
            {notification.map((item, i) =>
              <li key={i}><a href="#">{item}</a></li>
            )}
            <li key="d" role="separator" className="divider"></li>
            <li key="a"><a href="#">View all</a></li>
          </ul>
        </li>
      </ul>
    ), container);
  }

  handleIncrement() {
    this.props.dispatch(increment());
  }

  handleAdd() {
    this.props.dispatch(add());
  }

  render() {
    const { count } = this.props;
    return <div>
      <h2>Inside: {count}</h2>
      <input className="btn btn-default" type="button" value="Increment" onClick={this.handleIncrement.bind(this)} />
      <span> </span>
      <input className="btn btn-default" type="button" value="Add Notification" onClick={this.handleAdd.bind(this)} />
    </div>;
  }
}

function select({ app }) {
  return { ...app };
}

export default connect(select)(App);
