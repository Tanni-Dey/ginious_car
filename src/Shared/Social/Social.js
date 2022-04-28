import React from 'react';
import googleLogo from '../../images/google-logo.png'
import facebookLogo from '../../images/facebookLogo.png'
import githubLogo from '../../images/github-logo.png'
import auth from '../../firebase.init';
import { useSignInWithGithub, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import Loading from '../Loading/Loading';

const Social = () => {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    const [signInWithGithub, user1, loading1, error1] = useSignInWithGithub(auth);
    const navigate = useNavigate();
    let errorElement;
    if (loading || loading1) {
        return <Loading></Loading>
    }
    if (error || error1) {
        errorElement = <p>{error?.message} {error1?.message}</p>
    }
    if (user || user1) {
        navigate('/')
    }
    return (
        <div>
            <div className='d-flex align-items-center'>
                <div style={{ height: '1px' }} className='w-50 bg-primary'></div>
                <p className='mt-2 px-2'>or</p>
                <div style={{ height: '1px' }} className='w-50 bg-primary'></div>
            </div>
            {errorElement}
            <div className=''>
                <button onClick={() => signInWithGoogle()}
                    className='btn btn-danger d-block mx-auto my-3 w-50'><img src={googleLogo} width='30px' alt="" /><span className='px-3'>Google Sign Up</span></button>
                <button
                    className='btn btn-primary d-block mx-auto  my-3 w-50'><img src={facebookLogo} width='30px' alt="" /><span className='px-3'>Facebook Sign Up</span></button>
                <button onClick={() => signInWithGithub()}
                    className='btn btn-dark d-block mx-auto my-3 w-50'><img src={githubLogo} width='30px' alt="" /><span className='px-3'>Github Sign Up</span></button>
            </div>
        </div>
    );
};

export default Social;