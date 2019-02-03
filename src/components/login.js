import React, { Component } from 'react';
import {UserManager} from 'oidc-client';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: ''
        };
    }
    log = (msg, arg) => {        
        document.getElementById('results').innerText = '';
        Array.prototype.forEach.call(arg, (msg) => {
            if (msg instanceof Error) {
                msg = "Error: " + msg.message;
            }
            else if (typeof msg !== 'string') {
                msg = JSON.stringify(msg, null, 2);
            }
            this.setState({results: msg});
            document.getElementById('results').innerHTML += msg + '\r\n';
        });
    };
    getOidcUserManager = () => {
        const config = {
            authority: "http://localhost:51000",
            client_id: "reactClient",
            redirect_uri: "http://localhost:3000/login",
            response_type: "id_token token",
            scope: "openid profile clinicApi",
            post_logout_redirect_uri: "http://localhost:3000/patient",
        };
        return new UserManager(config);
    }
    render(){
        return(<div>
            <button id="login" onClick={() => {
                this.getOidcUserManager().signinRedirect();
            }}>Login</button>
            <button id="api" onClick={() => {
                this.getOidcUserManager().getUser()
                    .then((user) => {
                        console.log('user: ', user);
                        const url = "http://localhost:51001/identity";                
                        const xhr = new XMLHttpRequest();
                        xhr.open("GET", url);
                        xhr.onload = () => {
                            this.log(xhr.status, JSON.parse(xhr.responseText));
                        }
                        //xhr.setRequestHeader("Authorization", "Bearer " + 'user.access_token');
                        xhr.setRequestHeader("Authorization", "Bearer " + 'eyJhbGciOiJSUzI1NiIsImtpZCI6IkE1RThDMDQ5OEYwQUZGNTc4MjlFMkFFQTFCQ0I1NTg3MjJFRDI5M0IiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJwZWpBU1k4S18xZUNuaXJxRzh0Vmh5THRLVHMifQ.eyJuYmYiOjE1NDkxMzMwNTAsImV4cCI6MTU0OTEzNjY1MCwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1MTAwMCIsImF1ZCI6WyJodHRwOi8vbG9jYWxob3N0OjUxMDAwL3Jlc291cmNlcyIsImNsaW5pY0FwaSJdLCJjbGllbnRfaWQiOiJyZWFjdENsaWVudCIsInN1YiI6IjEyMzQ1NiIsImF1dGhfdGltZSI6MTU0OTEzMzAxOSwiaWRwIjoibG9jYWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiIiLCJzY29wZSI6WyJvcGVuaWQiLCJwcm9maWxlIiwiY2xpbmljQXBpIl0sImFtciI6WyJwd2QiXX0.MDipAlvuAO4LVKLRdbGgp_g_4SFC8ZrcIQ8R9W3U9kcgw9u01jT5gj9UmZrFUNN85m72Hl8AopE788ifd2rqd1ltltk42H7-EynM4UPted7LWVc0l_i0ywR1VOYSW5qb8iuENOMKbWcuD1SxDHmWiVGlZzyPAEG_k205GuAZwobWk4j2yqsoiFFRQ9l-5Apy-FBK_QvMgX1eQboQ-vfu8Jiy5u96QWVLn9FOyraDZuwIr9M5qacq9tVnL-utKmswsP3wv7yktF1Z7V1Of77PGigvk_K7deNzVBQKIyG_d9wKGSUYjyFa-yjsPSIe2o9hTk6xrB1FpNGVHYTVVZTpcg');
                        xhr.send();
                    });
            }}>Call API</button>
            <button id="logout" onClick={() => {
                this.getOidcUserManager().signoutRedirect();
            }}>Logout</button>
            <pre id="results"></pre>
        </div>);
    }
}
export default Login;

