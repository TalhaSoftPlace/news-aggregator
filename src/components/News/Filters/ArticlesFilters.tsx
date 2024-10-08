import { DropDownItem } from "../../../interfaces";
import { getDropDownItems } from "../../../utils";
import { DropDown } from "../../ui/DropDown/DropDown";
import { Sources } from "../../../types";
import { useArticlesFilters } from "../../../hooks/useArticlesFilters";

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

export const ArticlesFilters = () => {
  const {
    authors,
    sourcesItems,
    THE_GUARDAIN_CATEGORIES,
    handleSourceChange,
    handleChangeCategory,
    handleNewsAuthorChange,
  } = useArticlesFilters();
  return (
    <div className="w-full flex flex-wrap bg-[rgb(41, 47, 51)] shadow-xl bg-dark mt-6">
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
            items={getDropDownItems(authors.newsAuthors)}
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
            items={getDropDownItems(authors.guardianAuthros)}
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
            items={getDropDownItems(authors.newYorkTimesAuthros)}
            onItemChange={handleNewsAuthorChange}
          />
        </div>
      </div>
    </div>
  );
};
