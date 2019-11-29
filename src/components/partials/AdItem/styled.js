import styled from "styled-components";
import { Card } from "react-bootstrap";

export const CardItem = styled(Card)`
  margin-bottom: 1.5em;
  transition: 0.2s all linear;
  &:hover {
    transition: 0.2s all linear;
    background-color: #f5f5f5;
  }
`;
