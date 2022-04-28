import axios from 'axios';
import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';

const Orders = () => {
    const [user] = useAuthState(auth);
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        const getOrders = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/order?email=${user.email}`, {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                })
                const { data } = res;
                setOrders(data)
            }
            catch (error) {
                if (error.response.status === 401 || error.response.status === 403) {
                    // toast('not access')
                    signOut(auth);
                    navigate('/login');
                    console.log(error.message);
                }
            }
        }
        getOrders();
    }, [user])
    return (
        <div>
            <h4>Your All Orders</h4>
            <h5>orders {orders.length}</h5>
        </div>
    );
};

export default Orders;