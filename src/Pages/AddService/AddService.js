import React from 'react';
import { useForm } from "react-hook-form";

const AddService = () => {
    const { register, handleSubmit } = useForm();
    const onSubmit = data => {
        console.log(data)
        fetch('http://localhost:5000/service', {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => console.log(data))
    };
    return (
        <div className='w-50 mx-auto'>
            <h1>Please add service</h1>
            <form className='d-flex flex-column' onSubmit={handleSubmit(onSubmit)}>
                <input className='mb-2' type='text' placeholder='Name' {...register("name")} />
                <input className='mb-2' type='text' placeholder='Description' {...register("description", { required: true })} />
                <input className='mb-2' type='number' placeholder='Price' {...register("price", { required: true })} />
                <input className='mb-2' type='text' placeholder='img-url' {...register("img")} />


                <input type="submit" value='add service' />
            </form>
        </div>
    );
};

export default AddService;