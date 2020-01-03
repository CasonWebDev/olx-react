import React from "react";

import { PageContainer, PageTitle, PageArea } from "components/MainComponents";
import AddAdForm from "components/partials/AddAdForm";

const Page = () => {
  return (
    <PageContainer>
      <PageArea>
        <PageTitle>Postar um Anúncio</PageTitle>
        <AddAdForm />
      </PageArea>
    </PageContainer>
  );
};

export default Page;
