import { Route, Routes, Navigate, useLocation } from 'react-router-dom'
import Login from './LoginComponents/Login';
import ConnectShop from './Connect/ConnectShop';
import LoginStepper from './StepperAndCarousel/Stepper';
import LoginCarousel from './StepperAndCarousel/Carousel';
import { useState } from 'react';
import ConnectEmail from './Connect/ConnectEmail';
import Account from './Account/Account';
import ConnectAnotherEntity from './Connect/ConnectAnotherEntity';
import { AppRoutes } from './types';
import { useEffect } from 'react';

function App() {
  const [activeStep, setActiveStep] = useState(JSON.parse(localStorage.getItem('step') || '0'));
  const location = useLocation();

  useEffect(() => {
    setActiveStep(JSON.parse(localStorage.getItem('step') || '0'));
  }, [location]);

  return (
    <>
      <div className="app-container">
        {location.pathname !== AppRoutes.account ? (
          <div className="login-side-stepper-carousel">
            <LoginStepper step={activeStep} />
            <LoginCarousel />
          </div>
        ) : null}

        <Routes>
          <Route path={AppRoutes.initial} element={<Navigate to={AppRoutes.step_1} />} />
          <Route path={AppRoutes.step_1} element={<Login />} />
          <Route path={AppRoutes.step_2} element={<ConnectShop changeStep={setActiveStep} />} />
          <Route path={AppRoutes.step_3} element={<ConnectEmail changeStep={setActiveStep} />} />
          <Route path={AppRoutes.another_store} element={<ConnectAnotherEntity shop={activeStep} />} />
          <Route path={AppRoutes.account} element={<Account />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
