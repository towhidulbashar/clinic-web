import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import queryString from "query-string";
import authentication from '../../services/common/authentication';

class LoginReturn extends Component {
    handleLoginRedirect = () => {
        const returnedJwt = queryString.parse(this.props.location.hash);
        if(returnedJwt && returnedJwt.access_token){
            authentication.saveAccessToken(returnedJwt.access_token);
        }
    }
    componentDidMount(){
        this.handleLoginRedirect();
    }
    render(){        
        const from = localStorage.getItem('from');
        if (from) {
            localStorage.removeItem('from');
            return <Redirect to={JSON.parse(from)} />;
        }
        return <Redirect to='/' />
    }
}
export default LoginReturn;