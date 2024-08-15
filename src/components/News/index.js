import styled from "styled-components";

export const Header = styled.h1`
  text-align: center;
  margin-top: 10px;
  color: #fff;
  margin-bottom: 20px;
  @media screen and (max-width: 425px) {
    font-size: 30px;
  }
`;

export const Container = styled.div`
  width: 93%;
  padding-right: (1.5rem, 0.75rem);
  padding-left: (1.5rem, 0.75rem);
  margin-right: auto;
  margin-left: auto;
  display:flex;
`;

export const card = {
  marginTop: "10px",
  marginBottom: "50px",
};

export const Filters = styled.div`
  width: 93%;
  padding-right: (1.5rem, 0.75rem);
  padding-left: (1.5rem, 0.75rem);
  margin-right: auto;
  margin-left: auto;
  margin-top: 120px;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;

export const NewsCard = styled.div`
    padding: 5px;
    display: flex;
    flex-direction:column;
    gap: 5px;
    background-color: #ccc;
    border-radius: 5px;
`;

export const SingleCard = styled.div`
    width:300px;
    height: 90px;
    display:flex;
    padding:5px;
    margin: 5px; 0px;
    border-radius:5px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    over-flow:hidden;
`;
export const CardImage = styled.div`
    width: 90px;
    height: auto;
`;

export const CardBody = styled.div`
    padding:5px;
    height: auto;
    display:flex;
    gap:10px;
    flex-direction:column;
`;

export const CardTitle = styled.div`
    height: auto;
    font-size: 16px;
    font-weight:700px;
    color:#000;
`;
export const CardDesc = styled.div`
    color:#000;
    height: auto;
    font-size:12px;
     white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;


    @supports (-webkit-line-clamp: 2) {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: initial;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
`;