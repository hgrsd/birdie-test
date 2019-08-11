import { CareEvent, Action } from '../types';

export const UPDATE_CARE_RECIPIENT_ID = 'UPDATE_CARE_RECIPIENT_ID';
export const REQUEST_FAILED = 'REQUEST_FAILED';
export const REQUEST_ALL_EVENTS = 'REQUEST_ALL_EVENTS';
export const RECEIVE_ALL_EVENTS = 'RECEIVE_ALL_EVENTS';
export const REQUEST_EVENTS_BY_TYPE = 'REQUEST_EVENTS_BY_TYPE';
export const RECEIVE_EVENTS = 'RECEIVE_EVENTS';
export const REQUEST_TYPES = 'REQUEST_TYPES';
export const RECEIVE_TYPES = 'RECEIVE_TYPES';
export const CLEAR_ALL_STATE = 'CLEAR_ALL_STATE';

export function clearAllState() {
    return {
        type: CLEAR_ALL_STATE
    };
}

export function updateCareRecipientID(careRecipientID: string) {
    return {
        type: UPDATE_CARE_RECIPIENT_ID,
        payload: careRecipientID
    };
}

export function requestFailed(error: string): Action {
    return {
        type: REQUEST_FAILED,
        payload: error
    };
}

export function requestEventsByType(careRecipientID: string, eventType: string): Action {
    return {
        type: REQUEST_EVENTS_BY_TYPE,
        payload: {
            careRecipientID: careRecipientID,
            eventType: eventType
        }
    };
}

export function requestAllEvents(careRecipientID: string): Action {
    return {
        type: REQUEST_ALL_EVENTS,
        payload: careRecipientID
    };
}

export function requestTypes(careRecipientID: string): Action {
    return {
        type: REQUEST_TYPES,
        payload: careRecipientID
    };
}

export function receiveEvents(data: CareEvent[], eventType: string): Action {
    return {
        type: RECEIVE_EVENTS,
        payload: {
            events: data,
            eventType: eventType
        }
    };
}

export function receiveTypes(data: CareEvent[]): Action {
    return {
        type: RECEIVE_TYPES,
        payload: data
    };
}