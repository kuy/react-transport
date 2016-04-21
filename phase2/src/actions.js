import { createAction } from 'redux-actions';

export const REGISTER_LABEL = 'REGISTER_LABEL';
export const UNREGISTER_LABEL = 'UNREGISTER_LABEL';
export const registerLabel = createAction(REGISTER_LABEL);
export const unregisterLabel = createAction(UNREGISTER_LABEL);

export const ADD_USER = 'ADD_USER';
export const REMOVE_USER = 'REMOVE_USER';
export const addUser = createAction(ADD_USER);
export const removeUser = createAction(REMOVE_USER);

export const REQUEST_FETCH_USER_PRESENCE = 'REQUEST_FETCH_USER_PRESENCE';
export const SUCCESS_FETCH_USER_PRESENCE = 'SUCCESS_FETCH_USER_PRESENCE';
export const FAILURE_FETCH_USER_PRESENCE = 'FAILURE_FETCH_USER_PRESENCE';
export const requestFetchUserPresence = createAction(REQUEST_FETCH_USER_PRESENCE);
export const successFetchUserPresence = createAction(SUCCESS_FETCH_USER_PRESENCE);
export const failureFetchUserPresence = createAction(FAILURE_FETCH_USER_PRESENCE);
