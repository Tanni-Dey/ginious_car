import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import auth from '../../firebase.init';
import Loading from '../../Shared/Loading/Loading';
import Mymap from '../../Shared/Mymap/Mymap';
import Pagetitle from '../../Shared/Pagetitle/Pagetitle';
import Social from '../../Shared/Social/Social';

const Login = () => {
    const emailRef = useRef('')
    const passwordRef = useRef('')
    const navigate = useNavigate();
    const location = useLocation()
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);
    const [sendPasswordResetEmail, sending, error2] = useSendPasswordResetEmail(
        auth
    );

    let from = location?.state?.from?.pathname || '/'

    useEffect(() => {
        if (user) {

        }
    })

    if (loading || sending) {
        <Loading />
    }
    const handleLogin = async (e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        await signInWithEmailAndPassword(email, password)
        const { data } = await axios.post('http://localhost:5000/login', { email })
        localStorage.setItem('accessToken', data.accessToken)
        navigate(from, { replace: true })
        console.log(data)
    }
    const resetPassword = async () => {
        const email = emailRef.current.value;
        if (email) {
            await sendPasswordResetEmail(email);
            toast.success("Sent email");
        }
        else {
            toast.error('Please give Email')
        }
    }
    return (
        <div className='w-50 mx-auto'>
            {/* <Mymap /> */}
            <Pagetitle title='Login' />
            <ToastContainer />
            <h1>Please Login</h1>
            <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control ref={emailRef} type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control ref={passwordRef} type="password" placeholder="Password" />
                </Form.Group>
                <p>{error?.message}{error2?.message}</p>
                <Button className='w-50 mx-auto d-block mb-3' variant="primary" type="submit">
                    Login
                </Button>
            </Form>
            <p>New to car? <Link to='/signup' onClick={() => navigate('/signup')}>Please Register</Link></p>
            <p>Forget Password ? <button className='btn btn-link' onClick={resetPassword}>Reset Password</button></p>
            <Social />
        </div>
    );
};

export default Login;