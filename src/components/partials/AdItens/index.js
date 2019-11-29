import React, { useState, useEffect } from "react";
import useApi from "helpers/OlxApi";
import { Row } from "react-bootstrap";

import AdItem from "components/partials/AdItem";

const AdItens = () => {
  const api = useApi();

  const [adList, setAdList] = useState([]);
  const [loading, setLoading] = useState(true);

  let templateLoading = [1, 2, 3, 4, 5, 6, 7, 8];

  useEffect(() => {
    const getRecentAds = async () => {
      const json = await api.getAds({
        sort: "desc",
        limit: 8
      });
      setLoading(false);
      setAdList(json.ads);
    };
    getRecentAds();
  }, []);

  return (
    <Row>
      {adList.map((i, k) => (
        <AdItem key={k} data={i} />
      ))}
      {loading &&
        templateLoading.map((i, k) => <AdItem key={k} data="loading" />)}
    </Row>
  );
};

export default AdItens;
