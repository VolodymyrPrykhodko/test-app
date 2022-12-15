export const api: string = 'https://vast-basin-98801.herokuapp.com/';


export enum AppRoutes {
    initial = '/',
    step_1 = '/step_1',
    step_2 = '/step_2',
    step_3 = '/step_3',
    another_store = '/another',
    account = '/account',
}

export interface LoginState {
    signUp: boolean;
    showPassword: boolean;
    email: string;
    name: string;
    password: string;
    google: string;
    shopify: string;
    dialog: boolean;
    success: any;
    message: string;
}

export enum LoginActions {
    SWITCH_LOGIN = 'SWITCH_LOGIN',
    SET_PASSWORD = 'SET_PASSWORD',
    SET_NAME = 'SET_NAME',
    SET_EMAIL = 'SET_EMAIL',
    SHOW_PASSWORD = 'SHOW_PASSWORD',
    FETCH_DATA = 'FETCH_DATA',
    OPEN_DIALOG = 'OPEN_DIALOG'
}

export interface ShopValues {
    connected: boolean;
    shopName: string;
    dialog: boolean;
    success: boolean;
}

export interface ConnectAnother {
    connected: boolean;
    service: string;
    stepOfApp: string;
    dialog: boolean;
}

export interface LinkEmail {
    connected: boolean;
    dialog: boolean;
    success: boolean;
}

export enum ActionEmailShop {
    CONNECTED = 'CONNECTED',
    CLOSE_DIALOG = 'CLOSE_DIALOG'
}

export enum ConnectAnotherActions {
    SET_SERVICE = 'SET_SERVICE',
    SUBMIT = 'SUBMIT',
    SET_STEP = 'SET_STEP',
}

export const validateEmail = (email: any) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};