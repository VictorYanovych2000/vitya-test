import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';

import * as S from './user-card.styles';
import {UserCardText} from "./user-card.styles";

const UserCard = ({ id, username, email, profileCount }) => {
  const history = useHistory();
  const match = useRouteMatch();
  const handleUserClick = () => history.push(`${match.url}/${id}`);

  return (
    <S.UserCard onClick={handleUserClick}>
      <UserCardText isUsername>{username}</UserCardText>
      <UserCardText>{email}</UserCardText>
      <UserCardText>{profileCount}</UserCardText>
    </S.UserCard>
  );
};

export default UserCard;
