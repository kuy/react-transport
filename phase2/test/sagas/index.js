import 'babel-polyfill';
import assert from 'power-assert';
import td from 'testdouble';
import timers from 'testdouble-timers';
import { take, fork, put, call } from 'redux-saga/effects';
import { handleRequestUserPresence, runRequestUserPresence, fetchUserPresence } from '../../src/sagas';
import * as actions from '../../src/actions';

timers.use(td);

describe('Sagas > handleRequestUserPresence', () => {
  it('waits action and forks a process', () => {
    const saga = handleRequestUserPresence();

    let ret = saga.next();
    assert.deepEqual(ret.value, take(actions.REQUEST_FETCH_USER_PRESENCE));

    ret = saga.next({ payload: { email: 'ok@example.com' } });
    assert.deepEqual(ret.value, fork(runRequestUserPresence, 'ok@example.com'));

    ret = saga.next();
    assert.deepEqual(ret.value, take(actions.REQUEST_FETCH_USER_PRESENCE));
  });
});

describe('Sagas > runRequestUserPresence', () => {
  it('initiates API call and sends success action', () => {
    const saga = runRequestUserPresence('ok@example.com');

    let ret = saga.next();
    assert.deepEqual(ret.value, call(fetchUserPresence, 'ok@example.com'));

    ret = saga.next({ data: 'hoge' });
    assert.deepEqual(ret.value, put(actions.successFetchUserPresence('hoge')));

    ret = saga.next();
    assert(ret.done);
  });

  it('initiates API call and sends failure action', () => {
    const saga = runRequestUserPresence('ng@example.com');

    let ret = saga.next();
    assert.deepEqual(ret.value, call(fetchUserPresence, 'ng@example.com'));

    ret = saga.next({ error: 'foo' });
    assert.deepEqual(ret.value, put(actions.failureFetchUserPresence('foo')));

    ret = saga.next();
    assert(ret.done);
  });
});

describe('Sagas > fetchUserPresence', () => {
  it('returns Promise and fake response later', () => {
    // const clock = sinon.useFakeTimers();
    const clock = td.timers();

    const request = fetchUserPresence('ok@example.com').then(data => {
      const { data: { email } } = data;
      assert(email === 'ok@example.com');
      clock.restore();
    });

    clock.tick(1000);

    return request;
  });
});
