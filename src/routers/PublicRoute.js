import { Redirect, Route } from "react-router-dom";
import PropTypes from "prop-types";
import React from "react";

export const PublicRoute = ({
    isAuth,
    component: Component,
    ...routerElements
}) => {
    return (
        <Route
            {...routerElements}
            component={(props) =>
                isAuth ? <Redirect to="/" /> : <Component {...props} />
            }
        />
    );
};

PublicRoute.propTypes = {
    isAuth: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired,
};
