export enum AuthActions  {
    SET_LOGIN_STATUS = 'SET_LOGIN_STATUS'
}

export function setLoginStatus(userData: any) {
    if (!userData) {
        return { type: AuthActions.SET_LOGIN_STATUS, payload: { loggedIn: false, userData: null } };
    }
    return { type: AuthActions.SET_LOGIN_STATUS, payload: { loggedIn: true, userData } };
}