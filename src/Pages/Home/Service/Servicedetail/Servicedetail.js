import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useServiceDetail from '../../../../hooks/useServiceDetail/useServiceDetail'

const Servicedetail = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [service, setService] = useServiceDetail(id)
    return (
        <div className='w-50 mx-auto'>
            <h4>Please Order : {service.name}</h4>
            <button onClick={() => navigate(`/checkout/${id}`)} className='btn btn-primary d-block w-50 mx-auto'>Checkout</button>
        </div>
    );
};

export default Servicedetail;