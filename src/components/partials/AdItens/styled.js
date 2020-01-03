import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.columns}, 1fr);
  grid-gap: 1em;
  h5 {
    grid-column: 1/3;
  }
`;
