import { Action, RootState } from '../types';
import { RECEIVE_MOOD_EVENTS, RECEIVE_ALL_EVENTS, RECEIVE_TYPES } from '../actions';

const initialState = {
    events: [],
    types: [],
};

export default function eventsReducer(state: RootState = initialState, action: Action): RootState {
    switch (action.type) {
        case RECEIVE_MOOD_EVENTS:
            return {
                ...state,
                events: action.payload ? action.payload : []
            };

        case RECEIVE_ALL_EVENTS:
            return {
                ...state,
                events: action.payload ? action.payload : []
            };

        case RECEIVE_TYPES:
            return {
                ...state,
                types: action.payload ? action.payload : []
            };

        default:
            return state;
        }
}