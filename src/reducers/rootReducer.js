import { combineReducers } from "redux";

import { authReducer } from "./authReducer";
import { eventsReducer } from "./eventsReducer";
import { uiReducer } from "./uiReducer";

export const rootReducer = combineReducers({
    ui: uiReducer,
    calendar: eventsReducer,
    auth: authReducer,
    //Todo: CalendarReducer
});
