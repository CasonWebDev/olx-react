import styled from "styled-components";
import { Col, Row } from "react-bootstrap";

export const OthersAds = styled(Row)`
  display: grid;
  grid-template-columns: ${props => `repeat(${props.columns}, 1fr)`};
  grid-gap: 1em;
`;

export const ColAd = styled(Col)`
  &.box {
    border: 1px solid #cccccc;
    padding: 20px;
    border-radius: 5px;
    h4 {
      margin: 1em 0;
    }
  }
  &.boxRight {
    border: 1px solid #cccccc;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 1em;
    .info {
      color: #cccccc;
    }
  }
  p {
    margin: 0;
  }
  small {
    color: #666;
    padding: 0.5em 0;
  }
  .precoTitle {
    font-size: 36px;
    font-weight: bold;
    color: #6e03d7;
    .valor {
      display: flex;
      align-items: baseline;
      span {
        font-size: 20px;
      }
    }
  }
`;

export const Heading1 = styled.h1`
  font-weight: bold;
  color: #6e03d7;
  margin-bottom: 0.5em;
`;

export const EmptyBox = styled.div`
  margin-bottom: 1em;
`;
