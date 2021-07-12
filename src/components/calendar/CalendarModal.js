import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import DateTimePicker from "react-datetime-picker";
import Modal from "react-modal";
import Swal from "sweetalert2";

import moment from "moment";

import {
    addNewEventAsync,
    clearActiveEvent,
    updateEventAsync,
} from "../../actions/events";
import { modalCustomStyles } from "./CalendarModal.constants";
import { uiCloseModal } from "../../actions/ui";

Modal.setAppElement("#root");

const initFormValue = {
    title: "",
    notes: "",
    start: moment().seconds(0).minutes(0).toDate(),
    end: moment().seconds(0).minutes(0).add(1, "hours").toDate(),
};

export const CalendarModal = () => {
    const dispatch = useDispatch();
    const { modalOpen } = useSelector((state) => state.ui);
    const { activeEvent } = useSelector((state) => state.calendar);

    const [formValues, setFormValues] = useState(initFormValue);

    const [titleValid, setTitleValid] = useState(true);

    const { title, notes, start, end } = formValues;

    useEffect(() => {
        const value = activeEvent || initFormValue;

        setFormValues(value);
    }, [activeEvent, setFormValues]);

    const handleCloseModal = () => {
        dispatch(uiCloseModal());
        dispatch(clearActiveEvent());
    };

    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value,
        });
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();

        const momentStart = moment(start);
        const momentEnd = moment(end);

        if (momentStart.isSameOrAfter(momentEnd)) {
            return Swal.fire(
                "Error",
                "Init date is lower than end date",
                "error"
            );
        }

        if (title.trim().length < 2) {
            return setTitleValid(false);
        }

        activeEvent && activeEvent.id
            ? dispatch(updateEventAsync(formValues))
            : dispatch(addNewEventAsync(formValues));

        setTitleValid(true);
        setFormValues(initFormValue);
        handleCloseModal();
    };

    const handleStartDateChange = (event) => {
        setFormValues({
            ...formValues,
            start: event,
        });
    };

    const handleEndDateChange = (event) => {
        setFormValues({
            ...formValues,
            end: event,
        });
    };

    return (
        <div>
            <Modal
                isOpen={modalOpen}
                onRequestClose={handleCloseModal}
                style={modalCustomStyles}
                closeTimeoutMS={200}
                className="modal"
                overlayClassName="modal-bg"
            >
                <h1> {activeEvent ? "Edit Event" : "New Event"} </h1>
                <hr />
                <form className="container" onSubmit={handleFormSubmit}>
                    <div className="form-group">
                        <label>Stat Time</label>
                        <DateTimePicker
                            className="form-control"
                            onChange={handleStartDateChange}
                            value={start}
                        />
                    </div>

                    <div className="form-group">
                        <label>End Time</label>
                        <DateTimePicker
                            className="form-control"
                            onChange={handleEndDateChange}
                            value={end}
                            minDate={start}
                        />
                    </div>

                    <hr />
                    <div className="form-group">
                        <label>Title and notes</label>
                        <input
                            type="text"
                            className={`form-control ${
                                !titleValid && "is-invalid"
                            }`}
                            placeholder="title"
                            name="title"
                            autoComplete="off"
                            value={title}
                            onChange={handleInputChange}
                        />
                        <small id="emailHelp" className="form-text text-muted">
                            Short description
                        </small>
                    </div>

                    <div className="form-group">
                        <textarea
                            type="text"
                            className="form-control"
                            placeholder="Notes"
                            rows="5"
                            name="notes"
                            value={notes}
                            onChange={handleInputChange}
                        ></textarea>
                        <small id="emailHelp" className="form-text text-muted">
                            Additional information
                        </small>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-outline-primary btn-block"
                    >
                        <i className="far fa-save"></i>
                        <span> Save</span>
                    </button>
                </form>
            </Modal>
        </div>
    );
};
