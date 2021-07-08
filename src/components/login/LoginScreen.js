import React from "react";

import styles from "./LoginScreen.module.scss";

export const LoginScreen = () => {
    return (
        <div className={`container ${styles["login-container"]}`}>
            <div className="row">
                <div className={`${styles["login-form-1"]} col-md-6`}>
                    <h3>Ingreso</h3>
                    <form>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
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
                    <h3>Registro</h3>
                    <form>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña"
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="submit"
                                className={styles.btnSubmit}
                                value="Crear cuenta"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
