import { AppActions } from "../actions";

export interface AuthStore {
    loggedIn: boolean;
}

const initialState: AuthStore = {
    loggedIn: false,
};

export default function (
    state = initialState,
    { type, payload }: { type: any; payload: any },
) {
    switch (type) {
        case AppActions.SET_LOGIN_STATUS:
            return { ...state, ...payload };
        default:
            return state;
    }
}
