import React from 'react';
import { useParams } from 'react-router-dom';

const Servicedetail = () => {
    const param = useParams()
    return (
        <div>
            <h1>{param.id}</h1>
        </div>
    );
};

export default Servicedetail;