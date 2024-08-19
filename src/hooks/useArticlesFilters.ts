import { useMemo } from "react";
import { DropDownItem } from "../interfaces";
import { useAppDispatch, useAppSelector } from "./useRedux";
import { getAction, transformSourcesToDropDownItems } from "../utils";
import { readNews, setArticles } from "../store/slices/newsSlice/news";
import { Sources } from "../types";

export const useArticlesFilters = () => {
  const { theGuardianNewsSections, sources, originalArticles, authors } = useAppSelector(
    (state) => state.news
  );

  const dispatch = useAppDispatch();

  const THE_GUARDAIN_CATEGORIES: DropDownItem[] = useMemo(() => {
    return (
      theGuardianNewsSections?.map((item) => ({
        label: item.webTitle,
        value: item.id,
      })) ?? []
    );
  }, [theGuardianNewsSections]);

  const handleChangeCategory = (category: string, source: Sources) => {
    getAction(dispatch)[source](category);
  };
  const handleNewsAuthorChange = (author: string) => {
    const filteredArticles = originalArticles?.filter(
      (item) => item.author === author
    );
    dispatch(setArticles(filteredArticles));

    //this isn't working figure out later
    // dispatch(readNews({ params: { q: author } }));
    // dispatch(readGuardianNews({ params: { author: author } }));
    // dispatch(readNewYorkTimesNews({ params: { fq: `byLine:(${author})` } }));
  };

  const handleSourceChange = (source: string) => {
    dispatch(readNews({ params: { sources: source } }));
  };

  const sourcesItems = useMemo(
    () => transformSourcesToDropDownItems(sources),
    [sources]
  );

  return {
    authors,
    sourcesItems,
    THE_GUARDAIN_CATEGORIES,
    handleSourceChange,
    handleChangeCategory,
    handleNewsAuthorChange,
  };
};
