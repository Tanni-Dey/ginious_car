
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import Social from '../../Shared/Social/Social';
import Loading from '../../Shared/Loading/Loading';

const Signup = () => {
    const [agree, setAgree] = useState(false);
    const navigate = useNavigate();
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });

    const [updateProfile, updating, updateerror] = useUpdateProfile(auth);

    useEffect(() => {
        if (user) {
            navigate('/')
            console.log(user);
        }
    })

    if (loading || updating) {
        return <Loading />
    }

    const handlesignup = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        await createUserWithEmailAndPassword(email, password)
        await updateProfile({ displayName: name })
    }
    return (
        <div className='w-50 mx-auto'>
            <h1>Please Sign up</h1>
            <Form onSubmit={handlesignup}>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control name="name" type="text" placeholder="Enter name" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control name='email' type="email" placeholder="Enter email" required />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name='password' type="password" placeholder="Password" required />
                </Form.Group>{/* 
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group> */}
                <input onClick={() => setAgree(!agree)} type="checkbox" name="terms" id="terms" />
                <label htmlFor='terms' className={`mx-2 ${agree ? 'text-danger' : 'text-primary'}`}>Accept temrs and condition</label>
                <Button
                    disabled={!agree}
                    className='d-block w-50 mx-auto my-3' variant="primary" type="submit">
                    Sign Up
                </Button>
            </Form>
            <p>{error?.message}{updateerror?.message}</p>
            <p>Already Have an Account? <Link to="/login" onClick={() => navigate('/signup')}>Please Login</Link></p>
            <Social />
        </div>
    );
};

export default Signup;