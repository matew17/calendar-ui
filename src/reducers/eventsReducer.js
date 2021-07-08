import moment from "moment";

import { types } from "../types/types";

const initialState = {
    events: [
        {
            end: moment().seconds(0).minutes(0).add(1, "hours").toDate(),
            id: new Date().getTime(),
            note: "Es un gran dia",
            start: moment().seconds(0).minutes(0).toDate(),
            title: "Lucha's Brithday",
            user: {
                id: new Date().getTime(),
                name: "Mateo",
            },
        },
    ],
    activeEvent: null,
};

export const eventsReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.eventSetActive:
            return {
                ...state,
                activeEvent: action.payload,
            };

        case types.eventAddNew:
            return {
                ...state,
                events: [action.payload, ...state.events],
            };

        case types.eventClearActive:
            return {
                ...state,
                activeEvent: null,
            };

        case types.eventUpdate:
            return {
                ...state,
                events: state.events.map((event) =>
                    event.id === action.payload.id ? action.payload : event
                ),
            };

        case types.eventDelete:
            return {
                ...state,
                events: state.events.filter(
                    (event) => event.id !== state.activeEvent.id
                ),
                activeEvent: null,
            };

        default:
            return state;
    }
};
