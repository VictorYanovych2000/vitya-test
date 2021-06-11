import React from 'react';

import * as S from './widget-card.styles';

const WidgetCard = ({ title, amount }) => {
  return (
    <S.WidgetCard>
      <h3>{title}:</h3>
      <span>{amount}</span>
    </S.WidgetCard>
  );
};

export default WidgetCard;
