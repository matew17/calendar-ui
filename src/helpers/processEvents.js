import moment from "moment";

export const processEvents = (events = [], user) => {
    return events.map((event) => ({
        ...event,
        end: moment(event.end).toDate(),
        start: moment(event.start).toDate(),
        user: {
            id: event.user._id,
            name: event.user.name,
        },
    }));
};
