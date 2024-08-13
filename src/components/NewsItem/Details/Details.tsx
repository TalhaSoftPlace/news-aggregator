import { summary, newsChannel, lastUpdate } from "../../../config/config";
import "./Details.css";
import { SourceResponse } from "../../../interfaces/news";

export const Details = ({
  source,
  publishedAt,
}: {
  source: SourceResponse;
  publishedAt: string;
}) => {
  return (
    <details className="details">
      <summary className="summary">{summary}</summary>
      <p className="channel">
        <span>Channel: </span>
        {newsChannel(source.name)}
      </p>
      <p className="published">
        <span>Published at: </span>
        {lastUpdate(publishedAt)}
      </p>
    </details>
  );
};
