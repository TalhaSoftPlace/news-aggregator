import { get } from "./HttpProvider";

const SERVICE_URLS = {
  // service URL's (API End-Points)
  topNews: "/top-headlines",
  readAllNews: "/everything",
  readSources: "/sources",
};

const topNews = (params) => get(SERVICE_URLS.topNews, params);
const readAllNews = (params) => get(SERVICE_URLS.readAllNews, params);
const readSources = () => get(SERVICE_URLS.readSources);

const apiServices = {
  topNews,
  readAllNews,
  readSources,
};
export default apiServices;
