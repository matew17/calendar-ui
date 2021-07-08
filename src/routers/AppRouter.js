import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";

import { LoginScreen } from "../components/login/LoginScreen";
import { CalendarScreen } from "../components/calendar/CalendarScreen";

export const AppRouter = () => {
    return (
        <Router>
            <div style={{ height: "100%" }}>
                <Switch>
                    <Route exact path="/" component={CalendarScreen} />
                    <Route exact path="/login" component={LoginScreen} />

                    <Route path="*">
                        <Redirect to="/" />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
};
