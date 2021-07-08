import React from "react";

import { useDispatch } from "react-redux";

import { deleteEvent } from "../../../actions/events";
import { fab } from "./DeleteEventFab.module.scss";

export const DeleteEventFab = () => {
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(deleteEvent());
    };

    return (
        <button className={`btn btn-danger ${fab}`} onClick={handleDelete}>
            <i className="fas fa-trash"></i>
            <span> Borrar</span>
        </button>
    );
};
