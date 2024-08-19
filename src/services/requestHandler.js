import { Sources } from "../types";
import { get } from "./HttpProvider";

const SERVICE_URLS = {
  topNews: "/top-headlines",
  search: "/search",
  articleSearch: "/articlesearch.json",
  readAllNews: "/everything",
  readSources: "/sources",
  readGuardianSections: "/sections",
};

const news = (params) => get(SERVICE_URLS.topNews, params, Sources.News);
const thegaurdianNews = (params) => get(SERVICE_URLS.search, params, Sources.The_GUARDIAN_NEWS);
const newyorkTimesNews = (params) => get(SERVICE_URLS.articleSearch, params, Sources.NEW_YORK_TIMES);

const readAllNews = (params) => get(SERVICE_URLS.readAllNews, params,  Sources.News);
const readSources = (params) => get(SERVICE_URLS.readSources, params,  Sources.News);

const readGuardianSections = (params) => get(SERVICE_URLS.readGuardianSections, params, Sources.The_GUARDIAN_NEWS)

const apiServices = {
  news,
  thegaurdianNews,
  newyorkTimesNews,
  readAllNews,
  readSources,

  readGuardianSections,
};
export default apiServices;
