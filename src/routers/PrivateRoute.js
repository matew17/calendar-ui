import { Redirect, Route } from "react-router-dom";
import PropTypes from "prop-types";
import React from "react";

export const PrivateRoute = ({
    isAuth,
    component: Component,
    ...routerElements
}) => {
    return (
        <Route
            {...routerElements}
            component={(props) =>
                isAuth ? <Component {...props} /> : <Redirect to="/login" />
            }
        />
    );
};

PrivateRoute.propTypes = {
    isAuth: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired,
};
