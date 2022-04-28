import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Route } from 'react-router-dom';

const Routetitle = ({ path, element, title }) => {
    return (
        <Route path={path} element={element}>
            <Helmet><title>{title}</title></Helmet>
        </Route>
    );
};

export default Routetitle;