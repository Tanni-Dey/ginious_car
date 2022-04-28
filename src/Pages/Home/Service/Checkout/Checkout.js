import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import auth from '../../../../firebase.init';
import useServiceDetail from '../../../../hooks/useServiceDetail/useServiceDetail';

const Checkout = () => {
    const { id } = useParams()
    const [service, setService] = useServiceDetail(id)
    const [user] = useAuthState(auth);

    const handleOrder = event => {
        event.preventDefault()
        const order = {
            userName: user.displayName,
            service: service.name,
            serviceId: id,
            email: user.email,
            address: event.target.address.value,
            phone: event.target.phone.value
        }
        axios.post('https://agile-harbor-64341.herokuapp.com/order', order)
            .then(res => {
                console.log(res)
                const { data } = res;
                if (data.insertedId) {
                    toast('Your order is booked')
                }
            })
        event.target.reset()
    }
    return (
        <div className='w-50 mx-auto'>
            <ToastContainer />
            <h1>Checkout</h1>
            <h2>{service.name}</h2>
            <form onSubmit={handleOrder}>
                <input className='w-100 mb-2' value={user.displayName} type="text" name='name' placeholder='Name' required /><br />
                <input className='w-100 mb-2' value={user.email} type="email" name='email' placeholder='Email' required /><br />
                <input className='w-100 mb-2' type="text" name='service' placeholder='Service' value={service.name} required /><br />
                <input className='w-100 mb-2' type="text" name='address' placeholder='Address' required /><br />
                <input className='w-100 mb-2' type="number" name='phone' placeholder='Phone' required /><br />
                <input className='w-100 mb-2 btn btn-primary' type="submit" value='Place Order' />
            </form>
        </div>
    );
};

export default Checkout;