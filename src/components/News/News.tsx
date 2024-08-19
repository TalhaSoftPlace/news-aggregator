import Loading from "../Loading/Loading";
import { header } from "../../config/config";
import { NewsProps } from "../../interfaces/news";
import { capitaLize } from "../../utils";
import { useNews } from "../../hooks/useNews";
import { NewsItemCard } from "../NewsItem/NewsItemCard";
import { DatePicker } from "../ui/DatePicker/DatePicker";
import { ArticlesFilters } from "./Filters/ArticlesFilters";
import { DropDownItem } from "../../interfaces";
import { Sources } from "../../types";
import { DropDown } from "../ui/DropDown/DropDown";

const DATA_SOURCE: DropDownItem[] = [
  { label: "All", value: Sources.All },
  { label: "News", value: Sources.News },
  { label: "The Guardian", value: Sources.The_GUARDIAN_NEWS },
  { label: "New York Times", value: Sources.NEW_YORK_TIMES },
];

export const News = ({ category, country }: NewsProps) => {
  const {
    handleDataSourceChange,
    handleDateChange,
    articles,
    loading,
  } = useNews({ category, country });

  return (
    <div className="max-w-screen-2xl mx-auto px-4 mt-[90px]">
      <div className="flex gap-x-4">
        <DropDown
          title="Data Source"
          items={DATA_SOURCE}
          onItemChange={handleDataSourceChange}
        />
        <DatePicker
          label="From"
          onDateChange={(date: string) => handleDateChange("from", date)}
        />
        <DatePicker
          label="To"
          onDateChange={(date: string) => handleDateChange("to", date)}
        />
      </div>
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
                return <NewsItemCard {...article} />;
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
