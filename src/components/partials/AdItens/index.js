import React from "react";
import { useSelector } from "react-redux";
import { Container } from "./styled";

import AdItem from "components/partials/AdItem";

const AdItens = () => {
  const adList = useSelector(state => state.anuncios);

  let templateLoading = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <Container colums={3}>
      {adList[1] === 0 ? (
        <h5>Nenhum anúncio encontrado com esses critérios</h5>
      ) : (
        adList[0].map((i, k) => <AdItem key={k} data={i} />)
      )}

      {adList[1] === undefined &&
        templateLoading.map((i, k) => <AdItem key={k} data="loading" />)}
    </Container>
  );
};

export default AdItens;
