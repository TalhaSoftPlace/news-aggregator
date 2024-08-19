import { Button, Card } from "react-bootstrap";
import { ReactComponent as ArrowIcon } from "../Images/ArrowIcon.svg";
import "./NewsItem.css";
import { Article } from "../../interfaces/news";
import { Details } from "./Details/Details";

export const NewsItem = ({
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
    <Card className="card">
      <Card.Img
        className="card-img"
        variant="top"
        src={urlToImage}
        alt={content}
      />
      <Card.Body className="card-body">
        <Card.Title>{title}</Card.Title>
        <Card.Text className="card-description">{description}</Card.Text>
        <Details source={source} publishedAt={publishedAt} />
        <Button className="card-btn w-[150px] flex gap-x-4" href={url} target="_blank">
          Read more <ArrowIcon className="arrow-icon" />
        </Button>
      </Card.Body>
    </Card>
  );
};
