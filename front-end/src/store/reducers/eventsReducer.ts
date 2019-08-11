import { Action, RootState } from '../types';
import { RECEIVE_EVENTS, RECEIVE_TYPES, UPDATE_CARE_RECIPIENT_ID, REQUEST_FAILED, CLEAR_ALL_STATE } from '../actions';

const initialState = {
    events: [],
    error: false,
    errorMessage: '',
    types: [],
    currentType: '',
    careRecipientID: ''
};

export default function eventsReducer(state: RootState = initialState, action: Action): RootState {
    switch (action.type) {
        case CLEAR_ALL_STATE:
            return {
                ...initialState
            };

        case UPDATE_CARE_RECIPIENT_ID:
            return {
                ...state,
                careRecipientID: action.payload ? action.payload : ''
            };

        case REQUEST_FAILED:
            return {
                ...initialState,
                error: true,
                errorMessage: action.payload ? action.payload : 'Error requesting data.'
            };

        case RECEIVE_EVENTS:
            return {
                ...state,
                error: false,
                events: action.payload.events ? action.payload.events : [],
                currentType: action.payload.eventType
            };

        case RECEIVE_TYPES:
            return {
                ...state,
                error: false,
                types: action.payload ? action.payload : []
            };

        default:
            return state;
        }
}