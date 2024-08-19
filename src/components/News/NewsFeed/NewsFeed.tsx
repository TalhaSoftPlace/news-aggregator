import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/useRedux";
import { NewsFeedItem } from "./NewsFeedItem";
import {
  readNewsFeeds,
} from "../../../store/slices/newsSlice/news";
import { NewsProps } from "../../../interfaces";

export const NewsFeed = ({ category, country }: NewsProps) => {
  const { newsFeeds, newsFeedLoading } = useAppSelector(({ news }) => news);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(readNewsFeeds({ params: { category } }));
  }, []);
  return (
    <div className="max-w-[380px] w-full h-[660px] bg-[rgb(41, 47, 51)] border-2 dark:border-gray-600 rounded-lg shadow-xl">
      <h1 className="text-white text-2xl text-center pt-4">Top Headlines</h1>
      <div className="h-[600px] overflow-y-scroll">
        {newsFeeds?.map((item) => (
          <NewsFeedItem key={item.title} {...item} />
        ))}
      </div>
    </div>
  );
};
