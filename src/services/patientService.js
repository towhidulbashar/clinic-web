import axios from "./common/axiosWrapper";

const baseApiUrl = 'http://localhost:51981/api';
const save = (patient) => {
    return axios.post(`${baseApiUrl}/Patient`, patient);
}
export default {
    save
};