import { Link } from "react-router-dom";
import { imageNotAvailable } from "../../../assets";
import { NewsFeed } from "../../../interfaces";

export const NewsFeedItem = ({
  description,
  urlToImage,
  title,
  url,
}: NewsFeed) => {
  return (
    <div className="flex gap-x-3 p-4">
      <img src={urlToImage ?? imageNotAvailable} className="w-10 h-10" />
      <div className="flex flex-col gap-y-1">
        <Link to={url} target="_blank" className="text-white line-clamp-3 font-medium">{title}</Link>
        <Link
          to={url}
          target="_blank"
          className="text-gray-400 line-clamp-4 text-sm"
        >
          {description}
        </Link>
      </div>
    </div>
  );
};
