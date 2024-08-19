import { useEffect } from "react";
import Loading from "../Loading/Loading";
import { useParams } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { header, noFound, searching } from "../../config/config";
import { Container, Header, card } from "./index";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { NewsItem } from "../NewsItem/NewsItem";
import { capitaLize, setDocumentTitle } from "../../utils";
import { fetchAllNews } from "../../store/slices/newsSlice/news";
import { BuildQueryType } from "../../interfaces";

function Search() {
  const {
    articles,
    loading,
    totalResults: totalArticles,
  } = useAppSelector((state) => state.news);
  const { query } = useParams();
  const dispatch = useAppDispatch();

  setDocumentTitle(
    totalArticles === 0 ? noFound : loading ? searching : query ?? ""
  );
  useEffect(() => {
    const params: BuildQueryType = {
      gaurdianNewsParams: { q: query },
      newsParams: { category: "general", q: query },
      newyorkTimesParams: { q: query },
    };
    dispatch(fetchAllNews({ params }));
  }, [query]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Header>
            {totalArticles === 0 ? noFound : header(capitaLize(query ?? ""))}
          </Header>
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
}

export default Search;
