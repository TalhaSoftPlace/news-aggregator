import Loading from "../Loading/Loading";
import { header } from "../../config/config";
import { NewsProps } from "../../interfaces/news";
import { capitaLize } from "../../utils";
import { useNews } from "../../hooks/useNews";
import { NewsItemCard } from "../NewsItem/NewsItemCard";
import { ArticlesFilters } from "./Filters/ArticlesFilters";
import { GlobalFilters } from "./Filters/GlobalFilters";

export const News = ({ category, country }: NewsProps) => {
  const { handleDataSourceChange, handleDateChange, articles, loading } =
    useNews({ category, country });

  return (
    <div className="max-w-screen-2xl mx-auto px-4 mt-[90px]">
      <GlobalFilters
        onDataSourceChange={handleDataSourceChange}
        onDateChange={handleDateChange}
      />
      {loading ? (
        <Loading />
      ) : (
        <>
          <ArticlesFilters />
          <div className="text-3xl font-bold my-10 text-white text-center">
            {header(capitaLize(category))}
          </div>
          <div className="">
            <div className="flex justify-center flex-wrap gap-4">
              {articles?.map((article, idx) => {
                return <NewsItemCard {...article} key={article.title + idx} />;
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
