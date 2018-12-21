import { API_URL } from "../constants";

export const getDims48 = () => processReq("/test/dims48/initial");
export const getCategories = () => processReq("/categories");
export const getTestDetails = name => processReq(`/detail/${name}`);
export const loginUser = credentials =>
  processReq(`/login`, credentials, "POST");
export const registerUser = credentials =>
  processReq(`/register`, credentials, "POST");
export const isAdmin = email => processReq("/isAdmin");
export const getTestResults = name => processReq(`/results/${name}`);
export const updateConfig = (name, newConfig) =>
  processReq(`/test/${name}/updateConfig`, newConfig, "POST");
export const postResults = (phase, test, results) =>
  processReq(`/results/${test}/${phase}`, results, "POST");
export const getTestResultsById = (test, id) =>
  processReq(`/results/${test}/${id}`);
export const downloadTestResults = (test, format, id) =>
  processBlob(`/results/${test}/${format}/${id}`);
export const downloadAllTestResults = test =>
  processBlob(`/results/${test}/excel/all`);
export const downloadNormValues = () => processBlob("/test/DiMS48/normValues");
export const removeResult = (test, id) =>
  processReq(`/results/${test}/${id}`, {}, "DELETE");
export const updateClientInfo = (test, id, data) =>
  processReq(`/results/${test}/${id}`, data, "PATCH");
export const getNormValues = name => processReq(`/test/${name}/normValues`);
export const normValuesExist = name =>
  processReq(`/test/${name}/normValuesExist`);

export const uploadNormPdf = file =>
  processReq("/upload/dims48", file, "POST", {}, true);

async function processReq(
  url,
  dataObj = {},
  method = "GET",
  headers = {
    Accept: "application/json",
    "Content-Type": "application/json"
  },
  file = false
) {
  const conf = {
    method: method,
    credentials: "include",
    mode: "cors",
    cache: "no-cache"
  };
  if (method.toUpperCase() !== "GET") {
    conf.body = file ? dataObj : JSON.stringify(dataObj);
    conf.headers = headers;
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

async function processBlob(url) {
  const response = await fetch(`${API_URL}${url}`);
  let body;
  try {
    body = await response.blob();
  } catch (error) {
    throw new Error(error);
  }
  return body;
}
