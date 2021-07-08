import { combineReducers } from "redux";

import { eventsReducer } from "./eventsReducer";
import { uiReducer } from "./uiReducer";

export const rootReducer = combineReducers({
    ui: uiReducer,
    calendar: eventsReducer,
    //Todo: AuthReducer
    //Todo: CalendarReducer
});
