import React, { Children } from 'react';
import { useAuthState, useSendEmailVerification } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import auth from '../../firebase.init';
import Loading from '../Loading/Loading';

const RequiredAuth = ({ children }) => {
    const [user, loading, error1] = useAuthState(auth);
    const [sendEmailVerification, sending, error2] = useSendEmailVerification(
        auth)
    const location = useLocation()
    if (loading) {
        return <Loading />
    }
    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }
    if (!user.emailVerified) {
        return <div>
            <h3>Please verify your email</h3>
            <button onClick={async () => {
                await sendEmailVerification();
                toast('Sent email');
            }}>Send Verifcation</button>
            <ToastContainer />
        </div>
    }
    console.log(user);
    return children;
};

export default RequiredAuth;