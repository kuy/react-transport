import { take, put, call, fork, select } from 'redux-saga/effects';
import * as actions from './actions';
import { Queue } from './utils';

export function fetchUserPresence(email) {
  // NOTE: Fake API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ data: { email, presence: (Math.random() < 0.5 ? 'active' : 'away') } });
    }, 750);
  });
}

export function* runRequestUserPresence(email) {
  const { data, error } = yield call(fetchUserPresence, email);
  if (data && !error) {
    yield put(actions.successFetchUserPresence(data));
  } else {
    yield put(actions.failureFetchUserPresence(error));
  }
}

export function* handleRequestUserPresence() {
  while (true) {
    const { payload: { email } } = yield take(actions.REQUEST_FETCH_USER_PRESENCE);
    yield fork(runRequestUserPresence, email);
  }
}

function* hookThreadRowView() {
  const { sdk } = yield select(state => state.app);
  const queue = new Queue();

  sdk.Lists.registerThreadRowViewHandler(threadRowView => {
    queue.push(threadRowView);
  });

  while (true) {
    const threadRowView = yield call([queue, queue.pull]);

    // NOTE: Pickup some emails randomly because we don't have any backends.
    const users = yield select(state => state.users);
    if (users.list.length < 5 && Math.random() < 0.5) {
      const contact = threadRowView.getContacts()[0];
      yield put(actions.addUser({ name: contact.name, email: contact.emailAddress }));
    }
  }
}

function* hookThreadView() {
  const { sdk } = yield select(state => state.app);
  const queue = new Queue();

  sdk.Conversations.registerThreadViewHandler(threadView => {
    queue.push(threadView);
  });

  while (true) {
    const threadView = yield call([queue, queue.pull]);
    if (typeof threadView === 'undefined') {
      yield put(actions.changeView({ name: 'list' }))
      continue;
    }

    const id = threadView.getThreadID();
    yield put(actions.changeView({ name: 'thread', id }));

    const el = document.createElement('div');
    el.setAttribute('id', `hypha-panel-${id}`);

    threadView.addSidebarContentPanel({
      el, title: 'Slack members'
    });

    yield put(actions.registerPanel({ el }));

    threadView.on('destroy', () => {
      queue.push();
    });
  }
}

function* hookMessageView() {
  const { sdk } = yield select(state => state.app);
  const queue = new Queue();

  sdk.Conversations.registerMessageViewHandler(messageView => {
    queue.push(messageView);
  });

  while (true) {
    const messageView = yield call([queue, queue.pull]);
  }
}

function* triggerRequestUserPresence() {
  while (true) {
    const { payload: { name, id } } = yield take(actions.CHANGE_VIEW);
    if (name === 'thread') {
      const users = yield select(state => state.users);
      for (let email of users.list) {
        yield put(actions.requestFetchUserPresence({ email }));
      }
    }
  }
}

export default function* rootSaga() {
  yield fork(handleRequestUserPresence);
  yield fork(hookThreadRowView);
  yield fork(hookThreadView);
  yield fork(hookMessageView);
  yield fork(triggerRequestUserPresence);
};
