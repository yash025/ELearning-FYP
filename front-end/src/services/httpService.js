import axios from "axios";

const baseURL = "https://cb193a6fe8dd.ngrok.io";
// const baseURL ="http://localhost:5000";
const headers = { "content-type": "application/json" };
// export function setToken(token) {
//   let config = {
//     headers: {
//       'Authorization': `Bearer ${token}`
//     },
//     withCredentials = true
//   } 
//   axiosObj = axios.create(config);
// }


 export function getRequest(url, params) { 
    return axios.get(baseURL + url, {
        params : params
    }, headers)
}

export function postRequest(url, params) { 
    let postPromise = axios.post(baseURL + url, params)
    return postPromise;
}