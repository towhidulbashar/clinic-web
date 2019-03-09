import React, { Component } from 'react';
import authentication from '../../services/common/authentication';

class Login extends Component {
    login = () =>{
        authentication.authenticate();
    };
    logout = () => {
        authentication.logout();
    };
    componentDidMount(){
        let { from } = this.props.location.state || { from: { pathname: '/' } }; 
        localStorage.setItem('from', JSON.stringify(from));
    }
    render(){
        return(
            <div>
                <p>You must log in to view the page</p>
                <button onClick={this.login}>Log in</button>
                <button onClick={this.logout}>Log out</button>
            </div>
        );
    }
}
export default Login;