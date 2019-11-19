import React, { useState, useEffect } from 'react';

import { PageContainer, PageArea } from 'components/MainComponents';
import { SearchArea } from './styled';
import useApi from 'helpers/OlxApi';

import SearchBox from 'components/partials/SearchBox';
import CategoryList from 'components/partials/CategoryList';
import AdItem from 'components/partials/AdItem';

const Page = () => {

  const api = useApi();

  const [adList, setAdList] = useState([]);

  useEffect(() => {
    const getRecentAds = async () => {
      const json = await api.getAds({
        sort: 'desc',
        limit: 8
      });
      setAdList(json.ads);
    }
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
          <div className="aditens">
            {adList.map((i,k) => <AdItem key={k} data={i} /> )}
          </div>
        </PageArea>
      </PageContainer>
    </>
  );
}

export default Page;
