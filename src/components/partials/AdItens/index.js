import React, { useState, useEffect } from "react";
import qs from "qs";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { Pagination } from "react-bootstrap";
import { Container } from "./styled";
import { getAdsList } from "utils/query";

import * as AnunciosActions from "reducers/anuncios/actions";

import AdItem from "components/partials/AdItem";

const AdItens = () => {
  let pagination = [];
  const dispatch = useDispatch();
  const history = useHistory();
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const adList = useSelector(state => state.anuncios);
  const adPage = useSelector(state => state.page);

  let templateLoading = [1, 2, 3, 4, 5, 6, 7, 8];

  useEffect(() => {
    setPageCount(Math.round(adList[1] / 6));
  }, [adList]);

  useEffect(() => {
    console.log(adPage);
    setCurrentPage(adPage);
  }, [adPage]);

  for (let i = 1; i <= pageCount; i++) {
    pagination.push(i);
  }

  const getAds = async (qStr, catStr, stateStr, pageStr) => {
    const json = await getAdsList(qStr, catStr, stateStr, pageStr);
    dispatch(AnunciosActions.listarAnuncios(json.ads, json.total, json.page));
  };

  const paginate = i => {
    let query = qs.parse(history.location.search.slice(1));
    query.page = i;
    const { q, cat, state, page } = query;
    getAds(q, cat, state, page);
    history.replace({ search: qs.stringify(query) });
  };

  return (
    <>
      <Container columns={3}>
        {adList[1] === 0 ? (
          <h5>Nenhum anúncio encontrado com esses critérios</h5>
        ) : (
          adList[0].map((i, k) => <AdItem key={k} data={i} />)
        )}

        {adList[1] === undefined &&
          templateLoading.map((i, k) => <AdItem key={k} data="loading" />)}
      </Container>
      <Pagination>
        {pagination.map((i, k) => (
          <Pagination.Item
            key={k}
            active={i === currentPage}
            onClick={() => paginate(i)}
          >
            {i}
          </Pagination.Item>
        ))}
      </Pagination>
    </>
  );
};

export default AdItens;
