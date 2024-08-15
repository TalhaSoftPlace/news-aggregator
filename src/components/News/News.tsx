import Loading from "../Loading/Loading";
import { Col, Row } from "react-bootstrap";
import { header } from "../../config/config";
import { Container, Filters, Header, card } from "./index";
import { NewsItem } from "../NewsItem/NewsItem";
import { NewsProps } from "../../interfaces/news";
import {
  capitaLize,
} from "../../utils";
import { DropDown } from "../ui/DropDown/DropDown";
import { DatePicker } from "../ui/DatePicker/DatePicker";
import { useNews } from "../../hooks/useNews";

export const News = ({ category, country }: NewsProps) => {
  const {
    handleAuthorChange,
    handleSourceChange,
    handleDateChange,
    sourcesItems,
    articles,
    loading,
    authors,
  } = useNews({ category, country });
  return (
    <>
      <Filters>
        <DropDown
          title="Please Select Sources"
          items={sourcesItems}
          onItemChange={handleSourceChange}
          loading={loading}
        />
        <DatePicker
          label="From"
          onDateChange={(date: string) => handleDateChange("from", date)}
        />
        <DatePicker
          label="To"
          onDateChange={(date: string) => handleDateChange("to", date)}
        />
        <DropDown
          title="Please Select Authors"
          items={authors}
          onItemChange={handleAuthorChange}
          loading={loading}
        />
      </Filters>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Header>{header(capitaLize(category))}</Header>
          <Container>
            <Row>
              {articles?.map((article, idx) => {
                return (
                  <Col sm={12} md={6} lg={4} style={card} key={idx}>
                    <NewsItem {...article} />
                  </Col>
                );
              })}
            </Row>
          </Container>
        </>
      )}
    </>
  );
};
