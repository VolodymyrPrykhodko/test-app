import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import logo from '../images/ChadLogo.svg';
import racoonLogo from '../images/RaccoonImage.svg'
import DoneIcon from '@mui/icons-material/Done';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Button from "@mui/material/Button";
import { useEffect, useReducer } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Connect.scss';
import axios from "axios";
import { ActionEmailShop, api, AppRoutes, ShopValues } from "../types";
import Dialog from "@mui/material/Dialog";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const initialValue: ShopValues = {
    connected: false,
    shopName: '',
    dialog: false,
    success: false,
}

const reducer = (state: any, action: any) => {
    switch (action.type) {
        case ActionEmailShop.CONNECTED:
            return { ...state, ...action.payload }
        case ActionEmailShop.CLOSE_DIALOG:
            return { ...state, dialog: false, connected: action.payload }
    }
}

const ConnectShop: React.FC<any> = ({ changeStep }) => {
    const [state, dispatch] = useReducer(reducer, initialValue);

    const navigation = useNavigate();

    useEffect(() => {
        changeStep(1)
        localStorage.setItem('step', JSON.stringify(1));
    }, [])

    const handleConnect = async () => {
        try {
            const params = new URLSearchParams([['name', 'shopify']]);
            const store = await axios.get(api + 'shopify', {
                params
            });

            if (store.data.status === 'success') {
                dispatch({ type: ActionEmailShop.CONNECTED, payload: { shopName: store.data.shop_name, dialog: true, success: true } })

                setTimeout(() => {
                    dispatch({ type: ActionEmailShop.CLOSE_DIALOG, payload: true })
                }, 2000)
            } else {
                dispatch({ type: ActionEmailShop.CONNECTED, payload: { shopName: '', dialog: true, success: false } })

                setTimeout(() => {
                    dispatch({ type: ActionEmailShop.CLOSE_DIALOG, payload: false })
                }, 2000)
            }
        } catch (e) {
            console.log(e);
        }
    }

    const handleNav = (): void => {
        navigation(AppRoutes.step_3)
    }

    return state.connected ? (
        <>
            <Box className="connect-container">
                <Typography component='div' className="connected-logo">
                    <img src={racoonLogo} />
                    <CheckCircleIcon />
                </Typography>
                <Typography component='h2' className="connected-header">Store connected</Typography>
                <Typography className="connected-text">Chad is now able to manage customer support requests for {state.shopName}.</Typography>
                <Button variant="contained" className="connect-btn" onClick={handleNav}>Continue</Button>
                <Typography className="connect-no-use">Wrong store? <Link to='/another' className="another-store">Connect another one</Link></Typography>
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
                    <Typography component='h3'>Connect your Shopify store</Typography>
                    <Typography>Installs the Chad widget in your Shopify store and sets it up to display your customers’
                        order information and self-serve options.</Typography>
                </Typography>
                <Typography component='div' className="connect-text">
                    <DoneIcon />
                    <Typography component='div'>
                        <Typography className="connect-text-header">Track orders and shipping</Typography>
                        <Typography>Global coverage with 600+ couriers supported</Typography>
                    </Typography>
                </Typography>
                <Typography component='div' className="connect-text">
                    <DoneIcon />
                    <Typography component='div'>
                        <Typography className="connect-text-header">Manage orders</Typography>
                        <Typography>Allow customers to track, return, exchange, or report problems with their orders</Typography>
                    </Typography>
                </Typography>
                <Typography component='div' className="connect-text">
                    <DoneIcon />
                    <Typography component='div'>
                        <Typography className="connect-text-header">Process returns and exchanges</Typography>
                        <Typography>Automatically checks your store policy and existing inventory before resolving or escalating each request</Typography>
                    </Typography>
                </Typography>
                <Button variant="contained" type='button' className="connect-btn" onClick={handleConnect}>Connect store</Button>
                <Typography className="connect-no-use"><Link to='/another'>I don't use Shopify</Link></Typography>
            </Box>
            <Dialog
                open={state.dialog}
                className="connected-dialog"
            >
                {state.success ? (
                    <Alert severity="success">
                        <AlertTitle>Success! Store has been connected!</AlertTitle>
                    </Alert>
                ) : (
                    <Alert severity="error">
                        <AlertTitle>Failure! Failed to fetch!</AlertTitle>
                    </Alert>
                )}
            </Dialog>
        </>
    )
}
export default ConnectShop;