import LoginForm from './LoginForm';
import './Login.scss';

const Login: React.FC<any> = ({ changeStep }) => {

    return (
        <>
            <div className="login-column-form">
                <LoginForm />
            </div>
        </>
    );
}

export default Login;