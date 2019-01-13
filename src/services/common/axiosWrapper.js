import axios from "axios";

/* axios.interceptor.response.use(null, error => {
    const expectedError = error.response && 
        error.response.status >= 400 &&
        error.response.status < 500;
    if(expectedError)
        Promise.reject(error);
    else{
        console.error('Unexpected error: ', error);
        alert(error);
    }
}); */
axios.interceptors.response.use(null, error => {
    const expectedError = error.response &&
          error.response.status >= 400 &&
          error.response.status < 500;
    if(!expectedError) {
        console.log('Error: ', error);
        alert("Unexpected error occured.");
    }
    //If expected error occured return a reject.
    //So it can be handeled by specific catch block
    return Promise.reject(error);
});
export default axios;