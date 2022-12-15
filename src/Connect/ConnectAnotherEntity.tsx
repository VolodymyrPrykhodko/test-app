import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import { useEffect, useReducer } from "react";
import { Link } from "react-router-dom";
import logo from '../images/ChadLogo.svg';
import './Connect.scss';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { ConnectAnother, ConnectAnotherActions } from "../types";

const stores = [
    {
        name: 'Amazon',
        value: 1
    },
    {
        name: 'IHerb',
        value: 2
    },
    {
        name: 'Rozetka',
        value: 3
    },
]

const providers = [
    {
        name: 'Outlook',
        value: 1
    },
    {
        name: 'Yahoo',
        value: 2
    },
    {
        name: 'Aol',
        value: 3
    },
]

const initialValue: ConnectAnother = {
    connected: false,
    service: '',
    stepOfApp: '',
    dialog: false
}

const reducer = (state: any, action: any) => {
    switch (action.type) {
        case ConnectAnotherActions.SET_SERVICE:
            return { ...state, service: action.payload }
        case ConnectAnotherActions.SUBMIT:
            return { ...state, connected: action.payload }
        case ConnectAnotherActions.SET_STEP:
            return { ...state, stepOfApp: action.payload }
    }
}

const ConnectAnotherStore: React.FC<any> = ({ shop }) => {
    const [state, dispatch] = useReducer(reducer, initialValue);

    useEffect(() => {
        console.log(shop)
        localStorage.setItem('step', JSON.stringify(shop));
        dispatch({ type: ConnectAnotherActions.SET_STEP, payload: JSON.parse(localStorage.getItem('step') || '') })
    }, []);

    const handleChange = (e: any): void => {
        dispatch({ type: ConnectAnotherActions.SET_SERVICE, payload: e.target.value })
    }

    const handleSubmit = () => {
        dispatch({ type: ConnectAnotherActions.SUBMIT, payload: true });
    }

    return state.connected ? (
        <>
            <Box className="connect-container received">
                <CheckCircleIcon className="connect-success" />
                <Typography component='h2' className="connected-header">Response received</Typography>
                <Typography className="connected-text">Thank you for your interest in Chad! We’ll be hard at work building integrations to support your platform.</Typography>
                <Button variant="contained" className="connect-btn"><Link to={state.stepOfApp === 1 ? '/step_3' : '/account'}>Done</Link></Button>
            </Box>
        </>
    ) : (
        <>
            <Box className="connect-container">
                <Typography component='div' className="connect-header-logo">
                    <img src={logo} />
                    <Typography component='h3'>Chad</Typography>
                </Typography>
                <Typography component='div' className="connect-header">
                    <Typography component='h3'>{state.stepOfApp === 1 ? "Don’t use Shopify?" : "Don’t use Gmail?"}</Typography>
                    <Typography>{state.stepOfApp === 1 ? "Chad Beta is currently only available on Shopify. We’ll send you an email when Chad becomes available on your platform."
                        : "Chad Beta is currently only integrated with Gmail. We’ll send you an email when Chad becomes compatible with your support ticket platform."}</Typography>
                </Typography>
                <Typography component='div' className="connect-dropdown-container">
                    <InputLabel id="select-label" className="connect-dropdown-header">Platform</InputLabel>
                    <Select
                        labelId="select-label"
                        id="select"
                        value={state.service}
                        onChange={handleChange}
                        className="connect-dropdown"
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                        {(state.stepOfApp === 1 ? stores : providers).map((item) => (
                            <MenuItem value={item.value} key={item.value + item.name}>{item.name}</MenuItem>
                        ))}
                    </Select>
                </Typography>
                <Button variant="contained" type='button' className="connect-btn" onClick={handleSubmit}>Submit</Button>
                <Typography className="connect-no-use">{state.stepOfApp === 1 ? 'Actually use Shopify?' : 'Actually use Google?'} <Link to={state.stepOfApp === 1 ? '/step_2' : '/step_3'}>Connect</Link ></Typography>
            </Box>
        </>
    )
}

export default ConnectAnotherStore;