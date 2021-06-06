import axios from "axios";

var axiosObj = axios.create({});
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
    let getPromise = axiosObj.get(url, {
        params: params
    })
    return getPromise;
}

export function postRequest(url, params) { 
    let postPromise = axiosObj.post(url, {
        params: params
    })
    return postPromise;
}