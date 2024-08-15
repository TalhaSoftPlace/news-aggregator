import { useEffect, useMemo } from "react";
import {
  readAllNews,
  readSources,
  readTopNews,
  setNews,
} from "../store/slices/newsSlice/news";
import {
  buildQueryParams,
  setDocumentTitle,
  transformSourcesToDropDownItems,
  useRouter,
} from "../utils";
import { useAppDispatch, useAppSelector } from "./useRedux";
import { NewsProps } from "../interfaces";

export const useNews = ({ category, country }: NewsProps) => {
  const { updaetQuery, get } = useRouter();

  const querySources = get("sources");
  const queryFromDate = get("from");
  const queryToDate = get("to");

  const { articles, loading, sources } = useAppSelector((state) => state.news);
  const dispatch = useAppDispatch();

  const handleSourceChange = (sources: string) => {
    updaetQuery({ sources });
  };

  const handleAuthorChange = (author: string) => {
    dispatch(setNews(articles?.filter((item) => item.author === author)));
  };

  const handleDateChange = (range: "to" | "from", date: string) => {
    if (range === "from") {
      updaetQuery({ from: date });
      return;
    }
    updaetQuery({ to: date });
  };

  const sourcesItems = useMemo(
    () => transformSourcesToDropDownItems(sources),
    [sources]
  );

  useEffect(() => {
    setDocumentTitle(category);
    const queryPrams = buildQueryParams({
      category,
      country,
    });
    dispatch(readTopNews({ params: queryPrams }));
  }, [category, country]);

  useEffect(() => {
    querySources &&
      dispatch(
        readTopNews({ params: { sources: querySources, pageSize: 100 } })
      );
  }, [querySources]);

  useEffect(() => {
    if (queryFromDate && queryToDate && sources) {
      dispatch(
        readAllNews({
          params: {
            from: queryFromDate,
            to: queryToDate,
            sources: sources?.[0]?.id,
            pageSize: 100,
          },
        })
      );
    }
  }, [queryFromDate, queryToDate, sources]);

  useEffect(() => {
    dispatch(readSources());
  }, []);

  const authors = useMemo(
    () =>
      articles?.map((item) => ({ label: item.author, value: item.author })) ??
      null,
    [articles]
  );

  return {
    handleSourceChange,
    handleAuthorChange,
    handleDateChange,
    sourcesItems,
    articles,
    loading,
    authors,
  };
};
