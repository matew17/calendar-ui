import React, { useEffect } from "react";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { CalendarScreen } from "../components/calendar/CalendarScreen";
import { LoginScreen } from "../components/login/LoginScreen";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { renewToken } from "../actions/login";

export const AppRouter = () => {
    const { checking, uid } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(renewToken());
    }, [dispatch]);

    return (
        <>
            {checking && <h5>Loading ...</h5>}
            <Router>
                <div style={{ height: "100%" }}>
                    <Switch>
                        <PublicRoute
                            exact
                            path="/login"
                            component={LoginScreen}
                            isAuth={!!uid}
                        />

                        <PrivateRoute
                            exact
                            path="/"
                            component={CalendarScreen}
                            isAuth={!!uid}
                        />

                        <Route path="*">
                            <Redirect to="/" />
                        </Route>
                    </Switch>
                </div>
            </Router>
        </>
    );
};
