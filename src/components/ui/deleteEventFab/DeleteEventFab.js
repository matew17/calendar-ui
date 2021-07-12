import React from "react";

import { useDispatch } from "react-redux";

import { deleteEventAsync } from "../../../actions/events";
import { fab } from "./DeleteEventFab.module.scss";

export const DeleteEventFab = () => {
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(deleteEventAsync());
    };

    return (
        <button className={`btn btn-danger ${fab}`} onClick={handleDelete}>
            <i className="fas fa-trash"></i>
            <span> Delete</span>
        </button>
    );
};
