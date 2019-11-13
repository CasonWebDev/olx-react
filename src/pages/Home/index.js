import React from 'react';

import { PageContainer, PageArea } from 'components/MainComponents';
import { SearchArea } from './styled';

import SearchBox from 'components/partials/SearchBox';

const Page = () => {
  return (
    <>
      <SearchArea>
        <PageContainer>
          <PageArea>
            <SearchBox />
          </PageArea>
        </PageContainer>
      </SearchArea>
      <PageContainer>
        <PageArea>
          ...
        </PageArea>
      </PageContainer>
    </>
  );
}

export default Page;
