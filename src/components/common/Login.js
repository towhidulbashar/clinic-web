import React, { Component } from 'react';
import authentication from '../../services/common/authentication';

class Login extends Component {
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
        
    }
    render(){
        return(
            <div>
                <p>You must log in to view the page</p>
                <button onClick={this.test}>Test</button>
                <button onClick={this.login}>Log in</button>
                <button onClick={this.logout}>Log out</button>
            </div>
        );
    }
}
export default Login;