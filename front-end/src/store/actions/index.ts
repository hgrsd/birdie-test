import { Event, Action } from '../types';

export const REQUEST_ALL_EVENTS = 'REQUEST_ALL_EVENTS';
export const RECEIVE_ALL_EVENTS = 'RECEIVE_ALL_EVENTS';
export const REQUEST_MOOD_EVENTS = 'REQUEST_MOOD_EVENTS';
export const RECEIVE_MOOD_EVENTS = 'RECEIVE_MOOD_EVENTS';
export const REQUEST_TYPES = 'REQUEST_TYPES';
export const RECEIVE_TYPES = 'RECEIVE_TYPES';

export function requestMoodEvents(careRecipientID: string): Action {
    return {
        type: REQUEST_MOOD_EVENTS,
        payload: careRecipientID
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

export function receiveAllEvents(data: Event[]): Action {
    return {
        type: RECEIVE_MOOD_EVENTS,
        payload: data
    };
}

export function receiveMoodEvents(data: Event[]): Action {
    return {
        type: RECEIVE_MOOD_EVENTS,
        payload: data
    };
}

export function receiveTypes(data: Event[]): Action {
    return {
        type: RECEIVE_TYPES,
        payload: data
    };
}