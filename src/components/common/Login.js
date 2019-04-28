import React, { Component } from 'react';
import {Sidebar} from 'primereact/sidebar';
import {InputText} from 'primereact/inputtext';
import authentication from '../../services/common/authentication';
import { Button } from 'primereact/button';

class Login extends Component {
    constructor() {
        super();
        this.state = {visible: false};
    }
    login = () =>{
        let { from } = this.props.location.state || { from: { pathname: '/' } };
        authentication.authenticate({data: from.pathname});
    };
    logout = () => {
        authentication.logout();
    };
    test = () => {
    };
    componentDidMount(){
        this.login();
    }
    render(){
        return <React.Fragment />;
    }
}
export default Login;