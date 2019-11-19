import React, { useState, useEffect } from 'react';
import { RowCategory as Row, ColCategory as Col } from './styled';
import { Link } from 'react-router-dom';
import useApi from 'helpers/OlxApi';

const CategoryList = () => {

  const api = useApi();

  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const clist = await api.getCategories();
      setCategoryList(clist);
    }
    getCategories();
  }, []);

  return(
    <Row>
      {categoryList.map((i,k) => 
        <Col md="3">
          <Link to={`ads/cat=${i.slug}`}>
            <img src={i.img} alt="" />
            <span>{i.name}</span>
          </Link>
        </Col>
      )}
    </Row>
  );

}

export default CategoryList;