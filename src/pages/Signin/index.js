import React from 'react';
import { isLogged } from 'helpers/AuthHandler';
import { Redirect } from 'react-router-dom';

import { PageContainer, PageTitle, PageArea } from 'components/MainComponents';
import SigninForm from 'components/partials/SigninForm';

const Page = () => {

  if(isLogged()){
    return <Redirect to="/" />
  }

  return (
    <PageContainer>
      <PageArea>
        <PageTitle>Realizar Login</PageTitle>
        <SigninForm />
      </PageArea>
    </PageContainer>
  );
}

export default Page;
