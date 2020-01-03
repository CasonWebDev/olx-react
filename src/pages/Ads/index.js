import React from "react";

import { PageContainer, PageArea } from "components/MainComponents";
import { AdsArea, RightSide } from "./styled";

import AdItens from "components/partials/AdItens";
import LeftSide from "components/partials/LeftSide";

const Page = () => {
  return (
    <>
      <PageContainer>
        <PageArea>
          <AdsArea>
            <LeftSide />
            <RightSide>
              <h2>Anúncios</h2>
              <AdItens />
            </RightSide>
          </AdsArea>
        </PageArea>
      </PageContainer>
    </>
  );
};

export default Page;
