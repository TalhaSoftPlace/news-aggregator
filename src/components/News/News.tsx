import { useEffect, useMemo } from "react";
import Loading from "../Loading/Loading";
import { Col, Row } from "react-bootstrap";
import { header } from "../../config/config";
import { Container, Filters, Header, card } from "./index";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { readAllNews, readSources, readTopNews } from "../../store/slices/newsSlice/news";
import { NewsItem } from "../NewsItem/NewsItem";
import { NewsProps } from "../../interfaces/news";
import {
  buildQueryParams,
  capitaLize,
  setDocumentTitle,
  transformSourcesToDropDownItems,
  useRouter,
} from "../../utils";
import { DropDown } from "../ui/DropDown/DropDown";
import { DatePicker } from "../ui/DatePicker/DatePicker";

export const News = ({ category, country }: NewsProps) => {
  const { updaetQuery, get } = useRouter()

  const querySources = get("sources");
  const queryFromDate = get("from");
  const queryToDate = get("to");


  const { articles, loading, sources } = useAppSelector((state) => state.news);
  const dispatch = useAppDispatch();

  const handleItemChange = (sources: string) => {
    updaetQuery({ sources })
  };


  const handleDateChange = ((range: "to" | "from", date: string) => {
    if (range === "from") {
      updaetQuery({ 'from': date })
      return;
    }
    updaetQuery({ 'to': date })

  });

  const items = useMemo(
    () => transformSourcesToDropDownItems(sources),
    [sources]
  );


  useEffect(() => {
    setDocumentTitle(category);
    const queryPrams = buildQueryParams({ category, country, sources: querySources })
     dispatch(readTopNews({ params: queryPrams }));
  }, [category, querySources, country]);

  useEffect(() => {
    if (queryFromDate && queryToDate && sources) {
      dispatch(readAllNews({ params: { from: queryFromDate, to: queryToDate, sources: sources?.[0]?.id } }));
    }
  }, [queryFromDate, queryToDate, sources])

  useEffect(() => {
    dispatch(readSources());
  }, []);

  return (
    <>
      <Filters>
        <DropDown items={items} onItemChange={handleItemChange} loading={loading} />
        <DatePicker label="From" onDateChange={(date: string) => handleDateChange("from", date)} />
        <DatePicker label="To" onDateChange={(date: string) => handleDateChange("to", date)} />
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
                  <Col sm={12} md={6} lg={4} xl={3} style={card} key={idx}>
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
