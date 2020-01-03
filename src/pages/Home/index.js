import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { PageContainer, PageArea } from "components/MainComponents";
import { Link } from "react-router-dom";
import { SearchArea } from "./styled";

import useApi from "helpers/OlxApi";
import * as AnunciosActions from "reducers/anuncios/actions";

import SearchBox from "components/partials/SearchBox";
import CategoryList from "components/partials/CategoryList";
import AdItens from "components/partials/AdItens";

const Page = () => {
  const api = useApi();
  const dispatch = useDispatch();

  useEffect(() => {
    const getRecentAds = async () => {
      const json = await api.getAds({
        sort: "desc",
        limit: 8
      });
      dispatch(AnunciosActions.listarAnuncios(json.ads, json.total));
    };
    getRecentAds();
  }, []);

  return (
    <>
      <SearchArea>
        <PageContainer>
          <PageArea>
            <SearchBox />
            <CategoryList />
          </PageArea>
        </PageContainer>
      </SearchArea>
      <PageContainer>
        <PageArea>
          <h2>Anúncios Recentes</h2>
          <AdItens />
          <Link to="/ads" className="seeAllLink">
            Ver todos
          </Link>
          <hr />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab itaque
          necessitatibus aspernatur eveniet vero ipsa quibusdam porro architecto
          officiis eum cumque, repellendus qui odio libero fuga doloremque animi
          veniam tenetur?Quas saepe incidunt minus, iste unde facere
          voluptatibus sapiente excepturi temporibus! Mollitia, molestiae
          adipisci placeat quod in molestias debitis quisquam veritatis at!
          Tempora aliquid aut voluptatum, laborum itaque quisquam id!
        </PageArea>
      </PageContainer>
    </>
  );
};

export default Page;
