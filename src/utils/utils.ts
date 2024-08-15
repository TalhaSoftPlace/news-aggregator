import { QueryParamsProps, Sources } from "../interfaces/news";
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

export const capitaLize = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const setDocumentTitle = (title: string) => {
  document.title = `${capitaLize(title)} - News`;
};

export const transformSourcesToDropDownItems = (items: Sources[] | null) => {
  if (!items) return [];
  return items.map((item) => ({ label: item.name, value: item.id }));
};

export const buildQueryParams = ({ category, country, sources }: Partial<QueryParamsProps>) => {
  const queryParams: Partial<QueryParamsProps> = {};

  if (category && country) {
    queryParams.category = category;
    queryParams.country = country;
  }
  if (sources) {
    queryParams.sources = sources;
  }
  return queryParams;
}

export const useRouter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = useMemo(() => {
    const params: any = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    return params;
  }, [searchParams]);

  const updaetQuery = (params: object) => {
    setSearchParams({ ...query, ...params });
  }

  const removeQuery = (key: string) => {
    const { [key]: omitted, ...res } = query;

    return res;
  }

  const get = (key: string) => {
    return query[key];
  }

  return {
    query,
    get,
    removeQuery,
    updaetQuery,
  }
}
