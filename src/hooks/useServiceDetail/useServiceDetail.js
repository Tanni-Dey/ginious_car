import React, { useEffect, useState } from 'react';

const useServiceDetail = (id) => {
    const [service, setService] = useState({});

    useEffect(() => {
        fetch(`https://agile-harbor-64341.herokuapp.com/service/${id}`)
            .then(res => res.json())
            .then(data => setService(data))
    }, [])
    return [service, setService]
};

export default useServiceDetail;