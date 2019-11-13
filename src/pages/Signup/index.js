import React from 'react';
import { isLogged } from 'helpers/AuthHandler';
import { Redirect } from 'react-router-dom';

import { PageContainer, PageTitle, PageArea } from 'components/MainComponents';
import SignupForm from 'components/partials/SignupForm';

const Page = () => {

  if(isLogged()){
    return <Redirect to="/" />
  }

  return (
    <PageContainer>
      <PageArea>
        <PageTitle>Cadastro de novo usuário</PageTitle>
        <SignupForm />
      </PageArea>
    </PageContainer>
  );
}

export default Page;
