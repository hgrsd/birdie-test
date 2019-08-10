import { takeLatest, put } from 'redux-saga/effects';
import { Action } from '../types';
import { REQUEST_MOOD_EVENTS, REQUEST_ALL_EVENTS, REQUEST_TYPES } from '../actions';
import { receiveMoodEvents, receiveTypes, receiveAllEvents } from '../actions';

function* fetchData(action: Action) {
  var request;
  if (action.type === REQUEST_ALL_EVENTS) {
    request = `http://localhost:8000/events/${action.payload}`;
  } else if (action.type === REQUEST_MOOD_EVENTS) {
    request = `http://localhost:8000/events/${action.payload}/event_type=mood_observation`;
  } else if (action.type === REQUEST_TYPES) {
    request = `http://localhost:8000/events/types/${action.payload}`;
  }
  try {
      const response = yield fetch(request);
      const responseBody = yield response.json();
      switch (action.type) {
        case REQUEST_ALL_EVENTS:
          yield put(receiveAllEvents(responseBody.data));
          break;

        case REQUEST_MOOD_EVENTS:
          yield put(receiveMoodEvents(responseBody.data));
          break;

        case REQUEST_TYPES:
          yield put(receiveTypes(responseBody.data));
          break;

        default:
          return;
      }
  } catch (e) {
      return;
  }
}

function* initSaga() {
  yield takeLatest([REQUEST_MOOD_EVENTS, REQUEST_ALL_EVENTS, REQUEST_TYPES], fetchData);
}

export default initSaga;