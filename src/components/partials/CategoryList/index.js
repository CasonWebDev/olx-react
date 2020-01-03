import React, { useState, useEffect } from "react";
import { RowCategory as Row, ColCategory as Col } from "./styled";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Link } from "react-router-dom";
import useApi from "helpers/OlxApi";

const CategoryList = () => {
  const api = useApi();

  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCategories = async () => {
      const clist = await api.getCategories();
      setCategoryList(clist);
      setLoading(false);
    };
    getCategories();
  }, []);

  let templateLoading = [1, 2, 3, 4];

  return (
    <Row>
      {categoryList.map((i, k) => (
        <Col md="3" key={k}>
          <Link to={`ads?cat=${i.slug}`}>
            <img src={i.img} alt="" />
            <span className="tituloCat">{i.name}</span>
          </Link>
        </Col>
      ))}
      {loading &&
        templateLoading.map((i, k) => (
          <Col md="3" key={k}>
            <SkeletonTheme color="#999" highlightColor="#ccc">
              <Link to="">
                <Skeleton circle={true} height={46} width={46} />
                <Skeleton width="100px" />
              </Link>
            </SkeletonTheme>
          </Col>
        ))}
    </Row>
  );
};

export default CategoryList;
