import { Link } from "react-router-dom";
import { ArrowIcon } from "../../assets/ArrowIcon";
import { Article } from "../../interfaces";
import { imageNotAvailable } from "../../assets";

export const NewsItemCard = ({
  author,
  content,
  description,
  publishedAt,
  source,
  title,
  url,
  urlToImage,
}: Article) => {  
  return (
    <div className="max-w-[358px] w-full max-h-[490px] bg-[rgb(41, 47, 51)] border-2 dark:border-gray-600 border-t-0 rounded-lg rounded-t-none shadow-xl transition-transform duration-700 ease-in-out hover:-translate-y-1 hover:scale-105">
      <img
        className="w-[382px] h-[250px] rounded-lg"
        src={urlToImage || imageNotAvailable}
        alt=""
      />
      <div className="p-3">
        <h5 className="mb-2 text-lg line-clamp-2 font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>
        <p className="mb-3 font-normal line-clamp-3 text-gray-700 dark:text-gray-400 min-h-[72px]">
          {description}
        </p>
        <Link
          to={url}
          target="_blank"
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Read more
          <ArrowIcon />
        </Link>
      </div>
    </div>
  );
};
