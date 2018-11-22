const API_URL = "http://localhost:3000/api";

export const getDims48 = () => processReq("/test/dims48/initial");
export const getCategories = () => processReq("/categories");
export const getTestDetails = (name) => processReq(`/detail/${name}`);
export const loginUser = (credentials) => processReq(`/login`, credentials, "POST");
export const registerUser = (credentials) => processReq(`/register`, credentials, "POST");
export const getTestResults = (name) => processReq(`/results/${name}`);

async function processReq(url, dataObj = {}, method = "GET") {
    const conf = {
        method: method,
        credentials: "include",
        mode: "cors",
        cache: "no-cache"
    };
    if (method.toUpperCase() !== "GET") {
        conf.body = JSON.stringify(dataObj);
        conf.headers = {
            Accept: "application/json",
            "Content-Type": "application/json"
        };
    }

    // TODO handle proper response from server
    const response = await fetch(`${API_URL}${url}`, conf);
    let body;
    try {
        body = await response.json();
    } catch (error) {
        throw new Error(error);
     }
    // if (response.ok) {
    return body;
    // } else {
    //   throw new Error(error);
}
