import Typography from "@mui/material/Typography";
import DoneIcon from '@mui/icons-material/Done';
import logo from '../images/ChadLogo.svg';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import GoogleIcon from '../images/GoogleIcon.svg';
import { useEffect, useReducer } from "react";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import axios from "axios";
import { ActionEmailShop, api, AppRoutes, LinkEmail } from "../types";
import Dialog from "@mui/material/Dialog";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const initialValue: LinkEmail = {
    connected: false,
    dialog: false,
    success: false
}

const reducer = (state: any, action: any) => {
    switch (action.type) {
        case ActionEmailShop.CONNECTED:
            return { ...state, ...action.payload }
        case ActionEmailShop.CLOSE_DIALOG:
            return { ...state, connected: action.payload }
        
    }
}

const ConnectEmail: React.FC<any> = ({ changeStep }) => {
    const [state, dispatch] = useReducer(reducer, initialValue);

    const navigation = useNavigate();

    useEffect(() => {
        changeStep(2);
        localStorage.setItem('step', JSON.stringify(2));
    }, []);

    const handleConnect = async (): Promise<any> => {
        try {
            const google = await axios.get(api + 'google');
            if (google.data.status === 'success') {
                dispatch({ type: ActionEmailShop.CONNECTED, payload: { dialog: true, success: true } })

                setTimeout(() => {
                    dispatch({ type: ActionEmailShop.CLOSE_DIALOG, payload: true })
                }, 2000)
            } else {
                dispatch({ type: ActionEmailShop.CONNECTED, payload: { dialog: true, success: false } })

                setTimeout(() => {
                    dispatch({ type: ActionEmailShop.CLOSE_DIALOG, payload: false })
                }, 2000)
            }
        } catch (e) {
            console.log(e);
        }

    }

    const handleNav = (): void => {
        navigation(AppRoutes.account)
    }

    return state.connected ? (
        <>
            <Box className="connect-container received">
                <CheckCircleIcon className="connect-success" />
                <Typography component='h2' className="connected-header">Response received</Typography>
                <Typography className="connected-text">Thank you for your interest in Chad! We’ll be hard at work building integrations to support your platform.</Typography>
                <Button variant="contained" className="connect-btn" type='button' onClick={handleNav}>Done</Button>
            </Box>
        </>
    ) : (
        <>
            <Box className="connect-container">
                <Typography component='div' className="connect-info">
                    <Typography component='div' className="connect-header-logo">
                        <img src={logo} />
                        <Typography component='h3'>Chad</Typography>
                    </Typography>
                    <Typography component='div' className="connect-header">
                        <Typography component='h3'>Connect your customer support email</Typography>
                        <Typography>Allows Chad to send automated responses on your behalf from your usual support mailbox</Typography>
                    </Typography>
                    <Typography component='div' className="connect-text">
                        <DoneIcon />
                        <Typography component='div'>
                            <Typography className="connect-text-header">Contextual responses</Typography>
                            <Typography>Custom responses to any support situation from “where’s my stuff?” to “I want a refund”</Typography>
                        </Typography>
                    </Typography>
                    <Typography component='div' className="connect-text">
                        <DoneIcon />
                        <Typography component='div'>
                            <Typography className="connect-text-header">Reply from anywhere</Typography>
                            <Typography>Respond to your customers via email or Chad chat—it’s all saved in the same thread</Typography>
                        </Typography>
                    </Typography>
                    <Typography component='div' className="connect-text">
                        <DoneIcon />
                        <Typography component='div'>
                            <Typography className="connect-text-header">Categorical inbox tags</Typography>
                            <Typography>Tags your emails by category so you know what to expect before even opening an email</Typography>
                        </Typography>
                    </Typography>
                </Typography>
                <Typography component='div' className="connect-google-container">
                    <img src={GoogleIcon} />
                    <Button variant="contained" type='button' className="connect-btn" onClick={handleConnect}>Connect Gmail account</Button>
                </Typography>
                <Typography className="connect-no-use"><Link to='/another'>I don’t use Gmail</Link></Typography>
            </Box>
            <Dialog
                open={state.dialog}
                className="connected-dialog"
            >
                {state.success ? (
                    <Alert severity="success">
                        <AlertTitle>Success! Email has been connected!</AlertTitle>
                    </Alert>
                ) : (
                    <Alert severity="error">
                        <AlertTitle>Failure! Failed to fetch!</AlertTitle>
                    </Alert>
                )}
            </Dialog>
        </>
    );
}

export default ConnectEmail;