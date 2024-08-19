import axios from "axios";
import { Sources } from "../types";

const NEWS_API_DOMAIN = process.env.REACT_APP_NEWS_API_DOMAIN;
const THE_GUARDIAN_NEWS_API_DOMAIN =
  process.env.REACT_APP_THE_GUARDIAN_API_DOMAIN;
const THE_NEW_YORK_TIMES_API_DOMAIN =
  process.env.REACT_APP_THE_NEW_YORK_TIMES_API_DOMAIN;

const NEWS_API_KEY = process.env.REACT_APP_NEWS_API_KEY;
const THE_GUARDIAN_NEWS_API_KEY = process.env.REACT_APP_THE_GUARDIAN_API_KEY;
const THE_NEW_YORK_TIMES_API_KEY =
  process.env.REACT_APP_THE_NEW_YORK_TIMES_API_KEY;

export async function getApiRequestHeader() {
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
}

function determineBaseURLAndApiKey(url) {
  if (url.includes(Sources.News)) {
    return {
      baseURL: NEWS_API_DOMAIN,
      apiKey: { apiKey: NEWS_API_KEY },
    };
  } else if (url.includes(Sources.The_GUARDIAN_NEWS)) {
    return {
      baseURL: THE_GUARDIAN_NEWS_API_DOMAIN,
      apiKey: { "api-key": THE_GUARDIAN_NEWS_API_KEY },
    };
  } else if (url.includes(Sources.NEW_YORK_TIMES)) {
    return {
      baseURL: THE_NEW_YORK_TIMES_API_DOMAIN,
      apiKey: { "api-key": THE_NEW_YORK_TIMES_API_KEY },
    };
  } else {
    throw new Error("Unknown API URL");
  }
}

export async function request({ method, url, source, data, headers }) {
  const { baseURL, apiKey } = determineBaseURLAndApiKey(source);

  const instance = axios.create({
    baseURL,
    timeout: 60000,
    withCredentials: false,
    headers: headers || (await getApiRequestHeader()),
  });

  const promise = instance[method](url, {
    ...data,
    params: { ...data?.params, ...apiKey },
  });

  let response;
  try {
    response = await promise;
  } catch (error) {
    throw error.response;
  }
  return response;
}

export async function get(url, params, source, config) {
  const { filter, ...otherParams } = params ?? {};
  let queryParams = {};

  for (const key in otherParams) {
    if (!url.includes(key)) {
      queryParams[key] = otherParams[key];
    }
  }

  const queryString = new URLSearchParams(queryParams);
  const fullUrl = queryString ? `${url}?${queryString}` : url;

  return request({
    method: "get",
    url: fullUrl,
    source,
    ...config,
  });
}

// const instance = axios.create({
//   baseURL: BASEURL,
//   timeout: 60000,
//   withCredentials: false,
//   dataType: "jsonp",
// });

// export async function updateHeaders() {
//   const header = await getApiRequestHeader();
//   instance.defaults.headers = header;
// }

// export async function request({ method, url, data, headers }) {
//   if (headers === undefined) {
//     await updateHeaders();
//   }
//   const promise = instance[method](url, data);
//   let response;
//   try {
//     response = await promise;
//   } catch (error) {
//     throw error.response;
//   }
//   return response;
// }

// export async function newRequest({ method, url, data, headers }) {
//   if (headers === undefined) {
//     await updateHeaders();
//   }
//   const promise = instance[method](url, data);
//   let response;
//   try {
//     response = await promise;
//   } catch (error) {
//     throw error.response;
//   }
//   if (
//     response.status
//       ? response.status.toString().indexOf("2") !== 0
//       : response.data.status.toString().indexOf("2") !== 0
//   ) {
//     throw { response };
//   } else {
//     return response.data;
//   }
// }

// export async function get(url, params, featureAndAction, config) {
//   const { filter, ...otherParams } = params ?? {};
//   let queryParams = {};

//   for (const key in otherParams) {
//     if (!url.includes(key)) {
//       queryParams[key] = otherParams[key];
//     }
//   }

//   queryParams["apiKey"] = NEWS_API_KEY;
//   const queryString = new URLSearchParams(queryParams);
//   const fullUrl = queryString ? `${url}?${queryString}` : url;

//   return request({
//     method: "get",
//     url: fullUrl,
//     data: { featureAndAction },
//     ...config,
//   });
// }

// export async function del(url, params, config) {
//   return request({ method: "delete", url, data: { params }, ...config });
// }

// export async function delWithBody(url, params, config) {
//   return request({ method: "delete", url, data: { data: params }, ...config });
// }

// export async function post(url, data, featureAndAction, config, file) {
//   return request({ method: "post", url, data, ...config, file });
// }

// export async function put(url, data, config) {
//   return newRequest({ method: "put", url, data, ...config });
// }

// export async function patch(url, data, config) {
//   return newRequest({ method: "patch", url, data, ...config });
// }
