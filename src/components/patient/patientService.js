import axios from "../../services/common/axiosWrapper";

const baseApiUrl = 'http://localhost:51001/api';
const save = (patient) => {
    return axios.post(`${baseApiUrl}/Patient`, patient);
};
const get = () => {    
    return axios.get(`${baseApiUrl}/Patient`);
};
export default {
    save, get
};