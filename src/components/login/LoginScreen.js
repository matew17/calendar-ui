import React from "react";
import { useDispatch } from "react-redux";

import Swal from "sweetalert2";

import { login, register } from "../../actions/login";
import { useForm } from "../../hooks/useForm";

import styles from "./LoginScreen.module.scss";

export const LoginScreen = () => {
    const dispatch = useDispatch();

    const [loginFormValues, handleLoginInputChange] = useForm({
        loginEmail: "matew17@gmail.com",
        loginPassword: "123asd",
    });

    const [registerFormValues, handleRegisterInputChange] = useForm({
        registerName: "teo",
        registerEmail: "teo@gmail.com",
        registerPassword: "123asd",
        registerPassword2: "123asd",
    });

    const { loginEmail, loginPassword } = loginFormValues;
    const { registerName, registerEmail, registerPassword, registerPassword2 } =
        registerFormValues;

    const handleLogin = (e) => {
        e.preventDefault();

        dispatch(login(loginEmail, loginPassword));
    };

    const handleRegister = (e) => {
        e.preventDefault();

        if (registerPassword !== registerPassword2) {
            return Swal.fire("Error", "Passwords do not match", "error");
        }

        dispatch(register(registerEmail, registerPassword2, registerName));
    };

    return (
        <div className={`container ${styles["login-container"]}`}>
            <div className="row">
                <div className={`${styles["login-form-1"]} col-md-6`}>
                    <h3>Login</h3>
                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Email"
                                name="loginEmail"
                                value={loginEmail}
                                onChange={handleLoginInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                name="loginPassword"
                                value={loginPassword}
                                onChange={handleLoginInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="submit"
                                className={styles.btnSubmit}
                                value="Login"
                            />
                        </div>
                    </form>
                </div>

                <div className={`${styles["login-form-2"]} col-md-6`}>
                    <h3>Register</h3>
                    <form onSubmit={handleRegister}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Name"
                                name="registerName"
                                value={registerName}
                                onChange={handleRegisterInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Email"
                                name="registerEmail"
                                value={registerEmail}
                                onChange={handleRegisterInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                name="registerPassword"
                                value={registerPassword}
                                onChange={handleRegisterInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Confirm Password"
                                name="registerPassword2"
                                value={registerPassword2}
                                onChange={handleRegisterInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="submit"
                                className={styles.btnSubmit}
                                value="Create Account"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
