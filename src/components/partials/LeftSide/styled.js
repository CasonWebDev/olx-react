import styled from "styled-components";

export const Container = styled.div`
  width: 250px;
  margin-right: 2em;
  justify-content: center;
  border: 1px solid #cccccc;
  border-radius: 5px;
  padding: 20px;
`;

export const CategoriesList = styled.ul`
  padding: 0;
  list-style: none;
  li {
    display: flex;
    align-items: center;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.2s linear;
    &:hover,
    &.active {
      background: #f2f2f2;
    }
    img {
      width: 30px;
      margin-right: 10px;
    }
  }
`;
