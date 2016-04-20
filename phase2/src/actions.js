import { createAction } from 'redux-actions';

export const REQUEST_FETCH_USER_PRESENCE = 'REQUEST_FETCH_USER_PRESENCE';
export const SUCCESS_FETCH_USER_PRESENCE = 'SUCCESS_FETCH_USER_PRESENCE';
export const FAILURE_FETCH_USER_PRESENCE = 'FAILURE_FETCH_USER_PRESENCE';
export const requestFetchUserPresence = createAction(REQUEST_FETCH_USER_PRESENCE);
export const successFetchUserPresence = createAction(SUCCESS_FETCH_USER_PRESENCE);
export const failureFetchUserPresence = createAction(FAILURE_FETCH_USER_PRESENCE);
