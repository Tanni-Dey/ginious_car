import React from 'react';
import useServices from '../../hooks/useServices/useServices';

const ManageService = () => {
    const [services, setServices] = useServices();

    const handleDelete = id => {
        const procced = window.confirm('Are you delte this service ?')
        if (procced) {
            fetch(`http://localhost:5000/service/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    const remain = services.filter(service => service._id !== id)
                    setServices(remain)
                })
        }

    }
    return (
        <div className='w-50 mx-auto'>
            <h1>Manage Service</h1>
            {
                services.map(service => <h4 key={service._id} className='bg-primary mb-2 mx-auto'>{service.name} <button onClick={() => handleDelete(service._id)}>X</button></h4>)
            }
        </div>
    );
};

export default ManageService;