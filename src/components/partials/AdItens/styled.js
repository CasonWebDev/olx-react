import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-columns: ${props => `repeat(${props.columns}, 1fr)`};
  grid-gap: 1em;
  margin-bottom: 1em;
  h5 {
    grid-column: 1/3;
  }
`;
