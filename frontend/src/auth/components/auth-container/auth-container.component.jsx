import React from 'react';

import * as S from './auth-container.styles';

const AuthContainer = ({ title = '', children }) => {
  return (
    <S.Container>
      <h1>{title}</h1>
      {children}
    </S.Container>
  );
};

export default AuthContainer;
