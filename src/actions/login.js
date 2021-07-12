import Swal from "sweetalert2";

import {
    fetchMiddleware,
    fetchMiddlewareToken,
} from "../helpers/fetch-middleware";
import { types } from "../types/types";

const login = (email, password) => {
    return async (dispatch) => {
        try {
            const response = await fetchMiddleware(
                "auth/",
                { email, password },
                "POST"
            );

            const body = await response.json();

            if (!body.ok) {
                throw body;
            }

            localStorage.setItem("token", body.jwt);
            localStorage.setItem("token-init-date", new Date().getTime());

            dispatch(
                loginSetState({
                    uid: body.uid,
                    name: body.name,
                })
            );
        } catch (error) {
            Swal.fire("Error", error?.message, "error");
        }
    };
};

const register = (email, password, name) => {
    return async (dispatch) => {
        try {
            const response = await fetchMiddleware(
                "auth/new/",
                { email, password, name },
                "POST"
            );

            const body = await response.json();

            if (!body.ok) {
                throw body;
            }

            localStorage.setItem("token", body.jwt);
            localStorage.setItem("token-init-date", new Date().getTime());

            dispatch(
                loginSetState({
                    uid: body.uid,
                    name: body.name,
                })
            );
        } catch (error) {
            Swal.fire("Error", error?.message, "error");
        }
    };
};

const renewToken = () => {
    return async (dispatch) => {
        try {
            const response = await fetchMiddlewareToken("auth/renew/");
            const body = await response.json();

            if (!body.ok) {
                throw body;
            }

            localStorage.setItem("token", body.jwt);
            localStorage.setItem("token-init-date", new Date().getTime());

            dispatch(
                loginSetState({
                    uid: body.uid,
                    name: body.name,
                })
            );
        } catch (error) {
            dispatch(checkingDoneState());
        }
    };
};

const loginSetState = (user) => ({
    type: types.authLoginState,
    payload: user,
});

const checkingDoneState = () => ({
    type: types.authCheckingDone,
});

const logout = () => {
    return (dispatch) => {
        localStorage.clear();

        dispatch({
            type: types.authLogout,
        });
    };
};

export { login, register, renewToken, logout };
