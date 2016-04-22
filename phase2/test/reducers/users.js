import assert from 'power-assert';
import reducer from '../../src/reducers/users';
import * as actions from '../../src/actions';

describe('reducer', () => {
  it('returns default state', () => {
    assert.deepEqual(reducer(undefined, { type: '' }), {
      list: [],
      entities: {}
    });
  });

  it('adds a user', () => {
    assert.deepEqual(reducer(undefined, actions.addUser({ name: 'OK', email: 'ok@example.com' })), {
      list: ['ok@example.com'],
      entities: {
        'ok@example.com': {
          name: 'OK',
          presence: null,
          status: '',
          error: false
        }
      }
    });
  });

  it('removes a user', () => {
    const state = {
      list: ['ng@example.com'],
      entities: {
        'ng@example.com': {
          name: 'NG',
          presence: null,
          status: '',
          error: false
        }
      }
    };
    assert.deepEqual(reducer(state, actions.removeUser({ email: 'ng@example.com' })), {
      list: [],
      entities: {}
    });
  });
});
