import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import * as AnunciosActions from "reducers/anuncios/actions";
import { Container, CategoriesList } from "./styled";
import { Form } from "react-bootstrap";
import useQueryString from "utils/query";

import useApi from "helpers/OlxApi";

const Page = () => {
  const api = useApi();
  const dispatch = useDispatch();
  const history = useHistory();
  const query = useQueryString();

  const [q, setQ] = useState(query.get("q"));
  const [cat, setCat] = useState(query.get("cat"));
  const [state, setState] = useState(query.get("state"));

  const [stateList, setStateList] = useState([]);
  const [categories, setCategories] = useState([]);

  const getAdsList = async () => {
    dispatch(AnunciosActions.listarAnuncios([]));
    const json = await api.getAds({
      sort: "desc",
      limit: 9,
      q,
      cat,
      state
    });
    dispatch(AnunciosActions.listarAnuncios(json.ads, json.total));
  };

  useEffect(() => {
    let queryString = [];

    if (q) {
      queryString.push(`q=${q}`);
    }
    if (cat) {
      queryString.push(`cat=${cat}`);
    }
    if (state) {
      queryString.push(`state=${state}`);
    }

    history.replace({
      search: `?${queryString.join("&")}`
    });

    getAdsList();
  }, [q, cat, state]);

  useEffect(() => {
    const getStates = async () => {
      const slist = await api.getStates();
      setStateList(slist);
    };
    getStates();
  }, []);

  useEffect(() => {
    const getCategories = async () => {
      const cats = await api.getCategories();
      setCategories(cats);
    };
    getCategories();
  }, []);

  return (
    <>
      <Container>
        <h5>Buscar anúncios</h5>
        <Form.Group controlId="titulo">
          <Form.Label>Termos</Form.Label>
          <Form.Control
            type="text"
            placeholder="Título"
            value={q}
            onChange={e => setQ(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="estado">
          <Form.Label>Estado</Form.Label>
          <Form.Control
            as="select"
            value={state}
            onChange={e => setState(e.target.value)}
          >
            <option value="">Selecione um estado</option>
            {stateList &&
              stateList.map(i => (
                <option key={i._id} value={i.name}>
                  {i.name}
                </option>
              ))}
          </Form.Control>
        </Form.Group>
        <CategoriesList>
          <Form.Label>Categorias</Form.Label>
          {categories &&
            categories.map(i => (
              <li
                key={i._id}
                value={i._id}
                className={cat === i.slug ? "active" : ""}
                onClick={() => setCat(i.slug)}
              >
                <img src={i.img} alt={i.name} />
                {i.name}
              </li>
            ))}
        </CategoriesList>
      </Container>
    </>
  );
};

export default Page;
