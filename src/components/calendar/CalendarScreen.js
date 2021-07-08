import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import "moment/locale/es";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

import { AddNewFab } from "../ui/addNewFab/AddNewFab";
import { CalendarEvent } from "./CalendarEvent";
import { CalendarModal } from "./CalendarModal";
import { calendarScreen } from "./CalendarScreen.module.scss";
import { DeleteEventFab } from "../ui/deleteEventFab/DeleteEventFab";
import { messages } from "../../helpers/calendar-messages-es";
import { Navbar } from "../ui/navbar/Navbar";
import { clearActiveEvent, setActiveEvent } from "../../actions/events";
import { uiOpenModal } from "../../actions/ui";

moment.locale("es");
const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {
    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector((state) => state.calendar);

    const [lastView, setLastView] = useState(
        localStorage.getItem("calendarLastView") || "month"
    );

    const onViewChange = (e) => {
        setLastView(e);
        localStorage.setItem("calendarLastView", e);
    };

    const onSelect = (e) => {
        dispatch(setActiveEvent(e));
    };

    const onDoubleClick = (e) => {
        dispatch(uiOpenModal());
    };

    const onSelectSlot = (e) => {
        dispatch(clearActiveEvent());

        if (e?.action === "doubleClick" || e?.action === "select") {
            console.log(e);
            const event = {
                end: moment(e.end).toDate(),
                id: new Date().getTime(),
                note: "",
                start: moment(e.start).toDate(),
                title: "",
                user: {
                    id: new Date().getTime(),
                    name: "Mateo",
                },
            };

            dispatch(setActiveEvent(event));
            dispatch(uiOpenModal());
        }
    };

    const eventStyleGetter = (/* event, start, end, isSelected*/) => {
        return {
            style: {
                backgroundColor: "#18191a",
                color: "#fff",
                borderRadious: "0px",
                opacity: 0.8,
                display: "block",
            },
        };
    };

    return (
        <div className={calendarScreen}>
            <Navbar />

            <Calendar
                style={{ height: "90%" }}
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                messages={messages}
                eventPropGetter={eventStyleGetter}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelect}
                onView={onViewChange}
                view={lastView}
                components={{
                    event: CalendarEvent,
                }}
                onSelectSlot={onSelectSlot}
                selectable
            />

            {activeEvent && <DeleteEventFab />}
            <AddNewFab />
            <CalendarModal />
        </div>
    );
};
