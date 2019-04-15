import React, { Component } from 'react';
import authentication from '../../services/common/authentication';

class LoginReturn extends Component {
    handleLoginRedirect = () => {
        authentication.signinRedirectCallback()
        .then(state => window.location = state)
        .catch(error => console.error('handleLoginRedirect error: ', error));
    }
    componentDidMount(){
        this.handleLoginRedirect();
    }
    render(){        
        return <React.Fragment></React.Fragment>;
    }
}
export default LoginReturn;