import { SetStateAction, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/useRedux";
import { DropDownItem, NewsState } from "../../../interfaces";
import { transformSourcesToDropDownItems } from "../../../utils";
import { DropDown } from "../../ui/DropDown/DropDown";
import {
  readGuardianNews,
  readNews,
  readNewYorkTimesNews,
  setArticles,
} from "../../../store/slices/newsSlice/news";
import { Sources } from "../../../types";
import { Dispatch, ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";

const NEWS_API_CATEGORIES: DropDownItem[] = [
  { label: "General", value: "general" },
  { label: "Business", value: "business" },
  { label: "Entertainment", value: "entertainment" },
  { label: "Health", value: "health" },
  { label: "Science", value: "science" },
  { label: "Sports", value: "sports" },
  { label: "Technology", value: "technology" },
];

const NYT_API_CATEGORIES: DropDownItem[] = [
  { label: "World", value: "World" },
  { label: "U.S.", value: "U.S." },
  { label: "Politics", value: "Politics" },
  { label: "Business", value: "Business" },
  { label: "Technology", value: "Technology" },
  { label: "Health", value: "Health" },
  { label: "Sports", value: "Sports" },
  { label: "Arts", value: "Arts" },
  { label: "Books", value: "Books" },
  { label: "Science", value: "Science" },
  { label: "Style", value: "Style" },
  { label: "Food", value: "Food" },
  { label: "Travel", value: "Travel" },
  { label: "Magazine", value: "Magazine" },
  { label: "Real Estate", value: "Real Estate" },
  { label: "Opinion", value: "Opinion" },
];

const getAction = (dispatch: SetStateAction<any>) => {
  const lookup: Record<Sources, any> = {
    [Sources.All]: () => {},
    [Sources.News]: (category: string) =>
      dispatch(readNews({ params: { category } })),
    [Sources.NEW_YORK_TIMES]: (category: string) =>
      dispatch(
        readNewYorkTimesNews({ params: { fq: `news_desk:(${category})` } })
      ),
    [Sources.The_GUARDIAN_NEWS]: (category: string) =>
      dispatch(
        readGuardianNews({ params: { section: category, "page-size": 50 } })
      ),
  };

  return lookup;
};

export const ArticlesFilters = () => {
  const { theGuardianNewsSections, sources, articles } = useAppSelector(
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
    const filteredArticles = articles?.filter((item) => item.author === author);
    dispatch(setArticles(filteredArticles));
  };

  const handleSourceChange = (source: string) => {
    dispatch(readNews({ params: { sources: source } }));
  };

  const sourcesItems = useMemo(
    () => transformSourcesToDropDownItems(sources),
    [sources]
  );

  const authors = useMemo(
    () =>
      [...(articles ?? [])].map((item) => ({
        label: item.author,
        value: item.author,
      })) ?? null,
    [articles]
  );

  return (
    <div className="">
      <div className="flex text-white bg-dark rounded-lg mt-6"></div>
      <div className="w-full flex flex-wrap bg-[rgb(41, 47, 51)] shadow-xl bg-dark">
        <div className="p-4 border-r-2 border-gray-600 flex flex-col gap-y-4 flex-1">
          <h2 className="text-center text-white">News</h2>
          <div className="flex gap-4 justify-center flex-wrap">
            <DropDown
              title="Category"
              items={NEWS_API_CATEGORIES}
              onItemChange={(category) =>
                handleChangeCategory(category, Sources.News)
              }
            />
            <DropDown
              title="Source"
              items={sourcesItems}
              onItemChange={(item) => handleSourceChange(item)}
            />
            <DropDown
              title="Authors"
              items={authors}
              onItemChange={handleNewsAuthorChange}
            />
          </div>
        </div>
        <div className="p-4 border-r-2 border-gray-600 flex flex-col gap-y-4 flex-1">
          <h2 className="text-center text-white">The Guardian</h2>
          <div className="flex gap-4 justify-center flex-wrap">
            <DropDown
              title="Category"
              items={THE_GUARDAIN_CATEGORIES}
              onItemChange={(category) =>
                handleChangeCategory(category, Sources.The_GUARDIAN_NEWS)
              }
            />
            <DropDown
              title="Authors"
              items={[]}
              onItemChange={handleNewsAuthorChange}
            />
          </div>
        </div>
        <div className="p-4 flex flex-col gap-y-4 flex-1">
          <h2 className="text-center text-white">New York Times</h2>
          <div className="flex gap-4 justify-center flex-wrap">
            <DropDown
              title="Category"
              items={NYT_API_CATEGORIES}
              onItemChange={(category) =>
                handleChangeCategory(category, Sources.NEW_YORK_TIMES)
              }
            />
            <DropDown
              title="Authors"
              items={[]}
              onItemChange={handleNewsAuthorChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
