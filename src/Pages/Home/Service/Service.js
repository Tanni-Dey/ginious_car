import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Service.css'

const Service = ({ service }) => {
    let navigate = useNavigate()
    const bookButton = (id) => {
        navigate(`/service/${id}`)
    }
    const { name, img, price, description, _id } = service;
    return (
        <div className='single-service'>
            <img src={img} alt="" />
            <h4>{name}</h4>
            <h5 className='bg-primary'>Price: ${price}</h5>
            <p><small>{description}</small></p>
            <Button onClick={() => bookButton(_id)} variant="primary">Book</Button>
        </div>
    );
};

export default Service;