import { types } from "../types/types";

const addNewEvent = (event) => ({
    type: types.eventAddNew,
    payload: event,
});

const setActiveEvent = (event) => ({
    type: types.eventSetActive,
    payload: event,
});

const clearActiveEvent = () => ({
    type: types.eventClearActive,
});

const updateEvent = (event) => ({
    type: types.eventUpdate,
    payload: event,
});

const deleteEvent = () => ({
    type: types.eventDelete,
});

export {
    addNewEvent,
    setActiveEvent,
    clearActiveEvent,
    updateEvent,
    deleteEvent,
};
