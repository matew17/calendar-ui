import React from "react";

import { useDispatch } from "react-redux";

import { fab } from "./AddNewFab.module.scss";
import { uiOpenModal } from "../../../actions/ui";

export const AddNewFab = () => {
    const dispatch = useDispatch();

    const handleAddNew = () => {
        dispatch(uiOpenModal());
    };

    return (
        <button className={`btn btn-primary ${fab}`} onClick={handleAddNew}>
            <i className="fas fa-plus"></i>
        </button>
    );
};
