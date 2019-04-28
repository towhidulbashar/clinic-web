import Oidc, {User} from 'oidc-client';

const config = {
    authority: "http://localhost:51000",
    client_id: "reactClient",
    redirect_uri: "http://localhost:3000/login-return",
    response_type: "id_token token",
    scope: "openid profile clinicApi",
    post_logout_redirect_uri: "http://localhost:3000/Login",
    loadUserInfo: true
};
Oidc.Log.logger = console;
const userManager = new Oidc.UserManager(config);

const authenticate = (data) => {
    userManager
        .signinRedirect(data)
        .catch(error => console.log('signinRedirect error: ', error));    
};
function signinRedirectCallback() {
    return userManager
        .signinRedirectCallback()
        .then(user => {
            return user.state;
        })
        .catch(error => console.error('signinRedirectCallback error: ', error));
};
const isAuthenticate = () => {
        const storedUser = getStoredUser();
        if(storedUser) {
            const user = new User(JSON.parse(storedUser));
            return !user.expired;
        }
        return false;
};
const getStoredUser = () => {
    return sessionStorage.getItem(`oidc.${userManager._userStoreKey}`);
};
const getAccessToken = () => {
    const storedUser = getStoredUser();
    if(storedUser) {
        const user = new User(JSON.parse(storedUser));
        return user.access_token;
    }
    return undefined;
};
const logout = () => {
    userManager.signoutRedirect();
};

export default {
    userManager,
    authenticate,
    signinRedirectCallback, 
    logout, 
    isAuthenticate, 
    getAccessToken
};