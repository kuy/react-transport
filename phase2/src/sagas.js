import { take, put, call, fork, select } from 'redux-saga/effects';
import * as actions from './actions';

function fetchUserPresence(email) {
  // NOTE: Fake API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ data: { email, presence: 'active' } });
    }, 750);
  });
}

function* handleRequestUserPresence() {
  while (true) {
    const { payload: { email } } = yield take(actions.REQUEST_FETCH_USER_PRESENCE);
    const { data, error } = yield call(fetchUserPresence, email);
    if (data && !error) {
      yield put(actions.successFetchUserPresence(data));
    } else {
      yield put(actions.failureFetchUserPresence(error));
    }
  }
}

  // sdk.Lists.registerThreadRowViewHandler(threadRowView => {
  //   // NOTE: Pickup some emails randomly because we don't have any backends.
  //   const users = yield select(state => state.users);
  //   if (Object.keys(users).length < 5 && Math.random() < 0.5) {
  //     const contact = threadRowView.getContacts()[0];
  //     yield put(actions.addUser({ email: contact.emailAddress }));
  //   }
  // });

function listenThreadRowView(sdk) {
  return new Promise((resolve, reject) => {
    const unregister = sdk.Lists.registerThreadRowViewHandler(threadRowView => {
      unregister();
      resolve(threadRowView);
    });
  });
}

function* hookThreadRowView() {
  const { sdk } = yield select(state => state.app);
  const threadRowView = yield call(listenThreadRowView, sdk);

  // NOTE: Pickup some emails randomly because we don't have any backends.
  const users = yield select(state => state.users);
  if (Object.keys(users).length < 5) {
    const contact = threadRowView.getContacts()[0];
    yield put(actions.addUser({ email: contact.emailAddress }));
  }
}

export default function* rootSaga() {
  yield fork(handleRequestUserPresence);
  yield fork(hookThreadRowView);
};
