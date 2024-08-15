import styled from "styled-components";

export const Wrapper = styled.div`
  padding-right: (1.5rem, 0.75rem);
  padding-left: (1.5rem, 0.75rem);
`;

export const ListItems = styled.div`
  width: 300px;
  height: 200px;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const LoadingContainer = styled.div`
width: 300px;
heigh: 500px;
`