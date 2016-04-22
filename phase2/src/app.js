import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spawn from '../../src/spawn';
import { Panel, List } from './components';

class App extends Component {
  render() {
    const { view, users, panels } = this.props;
    let content;
    switch (view.name) {
      case 'thread':
        const items = users.show.map(email => ({ ...users.entities[email], email }));
        content = <div>
          {Object.keys(panels.list).map(id =>
            <Spawn key={id} to={panels.entities[id].el}>
              <Panel>
                <List items={items} />
              </Panel>
            </Spawn>
          )}
        </div>;
        break;
    }

    return <div>{content}</div>;
  }
}

function select({ view, users, panels }) {
  return { view, users, panels };
}

export default connect(select)(App);
