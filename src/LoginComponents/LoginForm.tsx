import { useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import InputBase from '@mui/material/InputBase';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import logo from '../images/ChadLogo.svg';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { LoginState, api, LoginActions, AppRoutes, validateEmail } from '../types';
import Input from '@mui/material/Input';
import Dialog from '@mui/material/Dialog';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
        marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
        width: '100%',
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 12px',
        transition: theme.transitions.create([
            'border-color',
            'background-color',
            'box-shadow',
        ]),
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(',')
    },
}));

const initialState: LoginState = {
    signUp: true,
    showPassword: false,
    email: '',
    name: '',
    password: '',
    google: '',
    shopify: '',
    dialog: false,
    success: null,
    message: ''
}

const reducer = (state: any, action: any) => {
    switch (action.type) {
        case LoginActions.SWITCH_LOGIN:
            return { ...state, signUp: action.payload }
        case LoginActions.SET_PASSWORD:
            return { ...state, password: action.payload }
        case LoginActions.SET_NAME:
            return { ...state, name: action.payload }
        case LoginActions.SET_EMAIL:
            return { ...state, email: action.payload }
        case LoginActions.SHOW_PASSWORD:
            return { ...state, showPassword: action.payload }
        case LoginActions.FETCH_DATA:
            return { ...state, google: action.payload.google, shopify: action.payload.shopify }
        case LoginActions.OPEN_DIALOG:
            return { ...state, dialog: action.payload.dialog, success: action.payload.success, message: action.payload.message }
    }
}

const LoginForm: React.FC<any> = () => {

    const [state, dispatch] = useReducer(reducer, initialState);

    const navigate = useNavigate();

    useEffect(() => {
        getData();
        localStorage.setItem('step', JSON.stringify(0));
    }, []);

    const getData = async (): Promise<any> => {
        const params = new URLSearchParams([['name', 'shopify']]);
        const [google, shopify] = await Promise.all([axios.get(api + 'google'), axios.get(api + 'shopify', {
            params
        })]);
        dispatch({ type: LoginActions.FETCH_DATA, payload: { google: google.data.token, shopify: shopify.data.token } })
    }

    const handleClickShowPassword = (): void => {
        dispatch({ type: LoginActions.SHOW_PASSWORD, payload: !state.showPassword })
    }

    const handleChange = (inputType: string) => (event: any): void => {
        dispatch({ type: inputType, payload: event.target.value })
    }

    const handleLogin = (): void => {
        dispatch({ type: LoginActions.SWITCH_LOGIN, payload: !state.signUp })
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        try {
            if (validateEmail(state.email)) {
                const user = await axios.post(api + 'register', {
                    name: state.name,
                    email: state.email,
                    password: state.password,
                    google_token: state.google,
                    shop_token: state.shopify
                });

                if (user.data.status === 'success') {
                    dispatch({ type: LoginActions.OPEN_DIALOG, payload: { dialog: true, success: true, message: user.data.message } })

                    setTimeout(() => {
                        dispatch({ type: LoginActions.OPEN_DIALOG, payload: { dialog: false, success: null, message: user.data.message } })
                        navigate(AppRoutes.step_2);
                    }, 2000);
                } else {
                    dispatch({ type: LoginActions.OPEN_DIALOG, payload: { dialog: true, success: false, message: user.data.message } })

                    setTimeout(() => {
                        dispatch({ type: LoginActions.OPEN_DIALOG, payload: { dialog: false, success: null, message: user.data.message } })
                    }, 2000)
                }
            } else {
                console.error('Please insert valid email');
                dispatch({ type: LoginActions.OPEN_DIALOG, payload: { dialog: true, success: false, message: 'Please insert valid email' } })

                setTimeout(() => {
                    dispatch({ type: LoginActions.OPEN_DIALOG, payload: { dialog: false, success: null, message: 'Please insert valid email' } })
                }, 1000)
            }

        } catch (e) {
            console.log(e);
        }
    }

    return (
        <>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: 'grid',
                    gridTemplateColumns: { sm: '1fr 1fr' },
                    gap: 2,
                }}
                className="login-form-component"
            >
                <Typography component='div' className="login-header">
                    <Typography component='div' className="login-header-logo">
                        <img src={logo} />
                        <Typography component='h3'>Chad</Typography>
                    </Typography>
                    <Typography component='div' className="login-header-text">
                        <Typography component='h3'>Welcome to Chad</Typography>
                        <Typography>Go live in 10 minutes! Our self-service widget empowers your
                            customers to manage orders and track shipments 24/7 without driving you crazy.</Typography>
                    </Typography>
                </Typography>
                <FormControl variant="standard">
                    <InputLabel shrink htmlFor="email-input">
                        Email
                    </InputLabel>
                    <BootstrapInput className="login-input" id="email-input" onChange={handleChange(LoginActions.SET_EMAIL)} />
                </FormControl>
                {state.signUp ? (
                    <FormControl variant="standard">
                        <InputLabel shrink htmlFor="name-input">
                            Your Name
                        </InputLabel>
                        <BootstrapInput className="login-input" id="name-input" onChange={handleChange(LoginActions.SET_NAME)} />
                    </FormControl>
                ) : null}
                <FormControl variant="outlined" className="login-password">
                    <InputLabel shrink htmlFor="password-input">Password</InputLabel>
                    <Input
                        className="login-password-input"
                        id="outlined-adornment-password"
                        type={state.showPassword ? 'text' : 'password'}
                        value={state.password}
                        onChange={handleChange(LoginActions.SET_PASSWORD)}
                        endAdornment={
                            <InputAdornment position="end" className='login-input-toggle'>
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                >
                                    {state.showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <Button className="login-btn" variant="contained" type='submit'>{state.signUp ? 'Create account' : 'Login'}</Button>
                <Typography className="authorization-login">{state.signUp ? 'Already have an account?' : "Don't have an account?"} <Typography className="authorization-option-login" component='span' onClick={handleLogin}>{state.signUp ? 'Login' : 'Sign Up'}</Typography ></Typography >
            </Box>
            <Dialog
                open={state?.dialog}
                className="login-dialog"
            >
                {state.success ? (
                    <Alert severity="success">
                        <AlertTitle>Success!</AlertTitle>
                        <Typography>{state.message}</Typography>
                    </Alert>
                ) : (
                    <Alert severity="error">
                        <AlertTitle>Failure!</AlertTitle>
                        <Typography>{state.message}</Typography>
                    </Alert>
                )}
            </Dialog>
        </>
    )
}

export default LoginForm;