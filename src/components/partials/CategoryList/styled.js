import styled from 'styled-components';
import { Row, Col } from 'react-bootstrap';

export const RowCategory = styled(Row)`
  padding: 1.5em 0;
`;

export const ColCategory = styled(Col)`
  a{
    	display: flex;
      align-items: center;
      text-decoration: none;
      color: #666;
      &:hover{
        color: #999;
      }
      span{
        margin-left: .5em;
      }
  }
`;