import { useCallback, useEffect, useMemo } from "react";
import Loading from "../Loading/Loading";
import { Col, Row } from "react-bootstrap";
import { header } from "../../config/config";
import { Container, Filters, Header, card } from "./index";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { readSources, readTopNews } from "../../store/slices/newsSlice/news";
import { NewsItem } from "../NewsItem/NewsItem";
import { NewsProps } from "../../interfaces/news";
import {
  capitaLize,
  setDocumentTitle,
  transformSourcesToDropDownItems,
} from "../../utils";
import { DropDown } from "../ui/DropDown/DropDown";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { DatePicker } from "../ui/DatePicker/DatePicker";

export const News = ({ category, country }: NewsProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = useSearchParams()[0];

  const querySources = queryParams.get("sources");
  const queryFromDate = queryParams.get("from");
  const queryToDate = queryParams.get("to");

  const { articles, loading, sources } = useAppSelector((state) => state.news);
  const dispatch = useAppDispatch();

  const handleItemChange = useCallback((source: string) => {
    const queryParams = new URLSearchParams();
    queryParams.set("sources", source);
    navigate({
      pathname: location.pathname,
      search: `${queryParams.toString()}`,
    });
  }, []);

  const items = useMemo(
    () => transformSourcesToDropDownItems(sources),
    [sources]
  );

  const handleDateChangeFrom = useCallback((date: string) => {
    const queryParams = new URLSearchParams();
    queryParams.set("from", date);
    navigate({
      pathname: location.pathname,
      search: `${queryParams.toString()}`,
    });
  }, []);

  const handleDateChangeTo = useCallback((date: string) => {
    const queryParams = new URLSearchParams();
    queryParams.set("from", date);
    navigate({
      pathname: location.pathname,
      search: `${queryParams.toString()}`,
    });
  }, []);

  useEffect(() => {
    setDocumentTitle(category);
    let queryParams: { category?: string; country?: string; sources?: string } =
      {};

    if (!querySources && category && country) {
      queryParams["category"] = category;
      queryParams["country"] = country;
    }
    if (querySources) {
      queryParams["sources"] = querySources;
    }
    dispatch(readTopNews({ params: queryParams }));
  }, [category, querySources, country]);

  useEffect(() => {
    dispatch(readSources());
  }, []);

  return (
    <>
      <Filters>
        <DropDown items={items} onItemChange={handleItemChange} />
        <DatePicker label="From" onDateChange={handleDateChangeFrom} />
        <DatePicker label="To" onDateChange={handleDateChangeTo} />
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
