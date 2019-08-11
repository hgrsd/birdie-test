import { takeLatest, put } from 'redux-saga/effects';
import { Action } from '../types';
import { REQUEST_EVENTS_BY_TYPE, REQUEST_ALL_EVENTS, REQUEST_TYPES } from '../actions';
import { receiveEvents, receiveTypes, requestFailed } from '../actions';

function* fetchData(action: Action) {
  var request;
  if (action.type === REQUEST_ALL_EVENTS) {
    request = `http://localhost:8000/events/${action.payload}`;
  } else if (action.type === REQUEST_EVENTS_BY_TYPE) {
    request = `http://localhost:8000/events/${action.payload.careRecipientID}?event_type=${action.payload.eventType}`;
  } else if (action.type === REQUEST_TYPES) {
    request = `http://localhost:8000/events/types/${action.payload}`;
  }
  try {
      const response = yield fetch(request);
      // tslint:disable-next-line:no-console
      console.log(response);
      const responseBody = yield response.json();
      if ('error' in responseBody) {
        yield put(requestFailed(responseBody.error));
        return;
      }
      switch (action.type) {
        case REQUEST_ALL_EVENTS:
          yield put(receiveEvents(responseBody.data, 'all'));
          break;

        case REQUEST_EVENTS_BY_TYPE:
          yield put(receiveEvents(responseBody.data, action.payload.eventType));
          break;

        case REQUEST_TYPES:
          yield put(receiveTypes(responseBody.data));
          break;

        default:
          return;
      }
  } catch (e) {
      yield put(requestFailed(e));
  }
}

function* initSaga() {
  yield takeLatest([REQUEST_EVENTS_BY_TYPE, REQUEST_ALL_EVENTS, REQUEST_TYPES], fetchData);
}

export default initSaga;