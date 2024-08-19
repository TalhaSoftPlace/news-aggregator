import {
  Article,
  BuildQueryArgs,
  BuildQueryType,
  GetNewYorkTimesApiResponse,
  GetTheGuardianNewsApiResponse,
  QueryParamsProps,
  Sources,
} from "../interfaces/news";
import { SetStateAction, useMemo } from "react";
import { Sources as NewsSource } from "../types";
import {
  readGuardianNews,
  readNewYorkTimesNews,
  readNews,
} from "../store/slices/newsSlice/news";

export const capitaLize = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const setDocumentTitle = (title: string) => {
  document.title = `${capitaLize(title)} - News`;
};

export const transformSourcesToDropDownItems = (items: Sources[] | null) => {
  if (!items) return null;
  return items?.map((item) => ({ label: item.name, value: item.id }));
};

//this needs to be restructured.
export const buildQueryParams = ({
  category,
  q,
  from,
  to,
}: Partial<BuildQueryArgs>) => {
  const queryParams: Partial<BuildQueryType> = {};
  if (category) {
    queryParams.newsParams = { ...queryParams.newsParams, category };
    queryParams.gaurdianNewsParams = {
      ...queryParams.gaurdianNewsParams,
      // section: category,
    };
    queryParams.newyorkTimesParams = {
      ...queryParams.newyorkTimesParams,
      // fq: `section_name:(${category})`,
    };
  }
  if (from) {
    queryParams.newsParams = { ...queryParams.newsParams, category, from };
    queryParams.gaurdianNewsParams = {
      ...queryParams.gaurdianNewsParams,
      "from-date": from,
    };
    queryParams.newyorkTimesParams = {
      ...queryParams.newyorkTimesParams,
      begin_date: from,
    };
  }
  if (to) {
    queryParams.newsParams = { ...queryParams.newsParams, category, to };
    queryParams.gaurdianNewsParams = {
      ...queryParams.gaurdianNewsParams,
      "to-date": to,
    };
    queryParams.newyorkTimesParams = {
      ...queryParams.newyorkTimesParams,
      end_date: from,
    };
  }
  if (q) {
    queryParams.newsParams = { ...queryParams.newsParams, q };
    queryParams.gaurdianNewsParams = { ...queryParams.gaurdianNewsParams, q };
    queryParams.newyorkTimesParams = { ...queryParams.newyorkTimesParams, q };
  }
  return { ...queryParams };
};

export const getFullImageUrl = (imagePath: string): string => {
  const baseUrl = "https://static01.nyt.com/";
  return `${baseUrl}${imagePath}`;
};

export const normalizeArticles = <T>(
  apiResponse: T,
  transform: (data: T) => Article[]
): Article[] => {
  return transform(apiResponse);
};

export const transformNewYorkTimes = (
  newyorkTimesApiResponse: GetNewYorkTimesApiResponse
): Article[] =>
  newyorkTimesApiResponse?.data?.response?.docs?.map((doc) => ({
    title: doc?.headline?.main,
    author: doc?.byline?.original,
    url: doc?.web_url,
    urlToImage: doc.multimedia[0] && getFullImageUrl(doc?.multimedia[0]?.url),
    description: doc?.abstract,
    content: doc?.abstract,
    publishedAt: doc?.pub_date,
    source: {
      id: doc?._id,
      name: doc?.source,
    },
  }));

export const transformTheGuardian = (
  guardianApiResponse: GetTheGuardianNewsApiResponse
): Article[] =>
  guardianApiResponse?.data?.response?.results?.map((result) => ({
    title: result?.webTitle,
    author: result?.pillarName,
    url: result?.webUrl,
    urlToImage: "",
    description: result?.webTitle,
    content: result?.webTitle,
    publishedAt: result?.webPublicationDate,
    source: {
      id: result?.id,
      name: result?.pillarName,
    },
  }));

export const getDropDownItems = (itemsArray?: string[] | null) => {
  if (!itemsArray || itemsArray.length === 0) return [];
  const uniqueItems = Array.from(new Set(itemsArray));
  return uniqueItems.map((item) => ({ label: item, value: item }));
};

export const getAction = (dispatch: SetStateAction<any>) => {
  const lookup: Record<NewsSource, any> = {
    [NewsSource.All]: () => {},
    [NewsSource.News]: (category: string) =>
      dispatch(readNews({ params: { category } })),
    [NewsSource.NEW_YORK_TIMES]: (category: string) =>
      dispatch(
        readNewYorkTimesNews({ params: { fq: `news_desk:(${category})` } })
      ),
    [NewsSource.The_GUARDIAN_NEWS]: (category: string) =>
      dispatch(
        readGuardianNews({ params: { section: category, "page-size": 50 } })
      ),
  };

  return lookup;
};
