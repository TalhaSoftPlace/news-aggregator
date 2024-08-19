import {
  Article,
  BuildQueryArgs,
  BuildQueryType,
  GetNewYorkTimesApiResponse,
  GetTheGuardianNewsApiResponse,
  QueryParamsProps,
  Sources,
} from "../interfaces/news";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

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

export const useRouter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = useMemo(() => {
    const params: any = {};
    searchParams?.forEach((value, key) => {
      params[key] = value;
    });
    return params;
  }, [searchParams]);

  const updateQuery = (params: object) => {
    setSearchParams({ ...query, ...params });
  };

  const removeQuery = (key: string) => {
    const { [key]: omitted, ...res } = query;

    return res;
  };

  const get = (key: string) => {
    return query[key];
  };

  return {
    query,
    get,
    removeQuery,
    updateQuery,
  };
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
