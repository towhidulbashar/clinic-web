import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import authentication from '../../services/common/authentication';

const PrivateRoute = ({component: Component, ...rest}) => (    
    <Route {...rest} render={props => (
        authentication.isAuthenticated() === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/Login', state: {from: props.location }}} />
    )} />
);
export default PrivateRoute;