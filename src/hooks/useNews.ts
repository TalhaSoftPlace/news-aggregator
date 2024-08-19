import { useEffect } from "react";
import {
  fetchAllNews,
  readGuardianNews,
  readGuardianSections,
  readNews,
  readNewYorkTimesNews,
  readSources,
} from "../store/slices/newsSlice/news";
import { buildQueryParams, setDocumentTitle } from "../utils";
import { useAppDispatch, useAppSelector } from "./useRedux";
import { BuildQueryType, NewsProps } from "../interfaces";

import { Sources as SourcesKeys } from "../types";

export const useNews = ({ category }: NewsProps) => {

  const { articles, loading } = useAppSelector((state) => state.news);
  const dispatch = useAppDispatch();

  const handleDataSourceChange = (sources: string) => {
    const DataSource: SourcesKeys = sources as SourcesKeys;

    const queryPrams = buildQueryParams({
      category,
    });

    const lookup: Record<SourcesKeys, any> = {
      [SourcesKeys.All]: () => dispatch(fetchAllNews({ params: queryPrams })),
      [SourcesKeys.News]: () =>
        dispatch(readNews({ params: queryPrams.newsParams })),
      [SourcesKeys.NEW_YORK_TIMES]: () =>
        dispatch(readNewYorkTimesNews({ params: {} })),
      [SourcesKeys.The_GUARDIAN_NEWS]: () =>
        dispatch(readGuardianNews({ params: { "page-size": 50 } })),
    };

    lookup[DataSource]();
  };

  const handleDateChange = (range: "to" | "from", date: string) => {
    const params: BuildQueryType = {
      gaurdianNewsParams: {},
      newsParams: { category },
      newyorkTimesParams: {},
    };
    if (range === "from") {
      params.newsParams.from = date;
      params.newyorkTimesParams.begin_date = date;
      params.gaurdianNewsParams["from-date"] = date;
    } else {
      params.newsParams.to = date;
      params.newyorkTimesParams.end_date = date;
      params.gaurdianNewsParams["to-date"] = date;
    }
    dispatch(fetchAllNews({ params }));
  };

  useEffect(() => {
    setDocumentTitle(category);
    const queryPrams = buildQueryParams({
      category,
    });
    dispatch(fetchAllNews({ params: queryPrams }));
    dispatch(readSources());
    dispatch(readGuardianSections());
  }, []);

  return {
    handleDataSourceChange,
    handleDateChange,
    articles,
    loading,
  };
};
