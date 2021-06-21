import axios from "axios";

const baseURL = "https://9827bdbff82e.ngrok.io";
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