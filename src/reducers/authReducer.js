import { types } from "../types/types";

const initialState = {
    checking: true,
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.authLoginState:
            return {
                ...state,
                ...action.payload,
                checking: false,
            };

        case types.authCheckingDone:
            return {
                ...state,
                checking: false,
            };

        case types.authLogout:
            return {
                checking: false,
            };

        default:
            return state;
    }
};
