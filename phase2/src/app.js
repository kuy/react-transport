import React, { Component } from 'react';
import { connect } from 'react-redux';
import Transport from '../../src/transport';
import { Tooltip, Origin } from 'redux-tooltip';
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
            <Transport key={id} to={panels.entities[id].el}>
              <Panel>
                <List items={items} />
              </Panel>
            </Transport>
          )}
        </div>;
        break;
    }

    return <div>
      <Transport prepend to='div[role="banner"] > div:first-child > div:first-child > div:first-child'>
        <Origin>Slack</Origin>
      </Transport>
      {content}
      <Tooltip place="bottom">
        <List items={users.list.map(email => ({ ...users.entities[email], email }))} />
      </Tooltip>
    </div>;
  }
}

function select({ view, users, panels }) {
  return { view, users, panels };
}

export default connect(select)(App);
