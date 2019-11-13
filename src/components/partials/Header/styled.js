import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const LinkHeader = styled(Link)`
  color: #000;
  font-size: 14px;
  text-decoration: none;
  display: flex;
  &:hover{
    color: #999;
  }
  &.button__ad{
    background-color: #FF8100;
    border-radius: 4px;
    color: #ffffff;
    padding: 5px 10px;
    &:hover{
      background-color: #E57706;
    }
  }
`;

export const HeaderArea = styled.div`
  background-color: #ffffff;
  border-bottom: 1px solid #cccccc;
  display: flex;
  justify-content: center;
  padding: 1em 0;
  width: 100%;
  .container{
    width: 1000px;
    height: 100%;
    display: flex;
    justify-content: space-between;
    img{
      height: 50px;
    }
    nav{
      display: flex;
      align-items: center;
      ul{
        display: flex;
        padding: 0;
        list-style: none;
        margin: 0;
        li{
          display: flex;
          align-items: center;
          margin: 0 1em;
        }
      }
    }
  }
`;