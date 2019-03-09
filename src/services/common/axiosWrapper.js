import axios from "axios";
import authentication from "./authentication";

axios.interceptors.request.use(
    config => {
      if (!config.headers.Authorization) { 
        if (authentication.isAuthenticated()) {
          config.headers.Authorization = `Bearer ${authentication.getAccessToken()}`;
        }
      }  
      return config;
    },
    error => {
        console.log('Get error: ', error); 
        Promise.reject(error);
    }
);
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