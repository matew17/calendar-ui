import Swal from "sweetalert2";

import { fetchMiddlewareToken } from "../helpers/fetch-middleware";
import { processEvents } from "../helpers/processEvents";
import { types } from "../types/types";

const addNewEventAsync = (event) => {
    return async (dispatch, getState) => {
        try {
            const { name, uid } = getState()?.auth;
            const resp = await fetchMiddlewareToken("events/", event, "POST");
            const body = await resp.json();

            if (!body?.ok) {
                throw body;
            }

            event = {
                ...event,
                id: body.event?.id,
                user: {
                    id: uid,
                    name,
                },
            };

            dispatch(addNewEvent(event));
        } catch (error) {
            Swal.fire("Error", error?.message, "error");
        }
    };
};

const addNewEvent = (event) => ({
    type: types.eventAddNew,
    payload: event,
});

const clearActiveEvent = () => ({
    type: types.eventClearActive,
});

const deleteEventAsync = () => {
    return async (dispatch, getState) => {
        try {
            const { id } = getState().calendar.activeEvent;
            const resp = await fetchMiddlewareToken(
                `events/${id}`,
                {},
                "DELETE"
            );
            const body = await resp.json();

            if (!body.ok) {
                throw body;
            }

            dispatch(deleteEvent());
        } catch (error) {
            Swal.fire("Error", error.message, "error");
        }
    };
};

const deleteEvent = () => ({
    type: types.eventDelete,
});

const getEventsAsync = () => {
    return async (dispatch, getState) => {
        try {
            const user = getState().auth;
            const resp = await fetchMiddlewareToken("events/");
            const body = await resp.json();
            const events = processEvents(body.event, user);

            dispatch(getEvents(events));
        } catch (error) {
            Swal.fire("Error", "Error getting events", "error");
        }
    };
};

const getEvents = (events) => ({
    type: types.eventLoad,
    payload: events,
});

const setActiveEvent = (event) => ({
    type: types.eventSetActive,
    payload: event,
});

const updateEventAsync = (event) => {
    return async (dispatch) => {
        try {
            const resp = await fetchMiddlewareToken(
                `events/${event.id}`,
                event,
                "PUT"
            );
            const body = await resp.json();

            if (!body.ok) {
                throw body;
            }

            dispatch(updateEvent(event));
        } catch (error) {
            Swal.fire("Error", error.message, "error");
        }
    };
};

const updateEvent = (event) => ({
    type: types.eventUpdate,
    payload: event,
});

export {
    addNewEventAsync,
    clearActiveEvent,
    deleteEventAsync,
    getEventsAsync,
    setActiveEvent,
    updateEventAsync,
};
