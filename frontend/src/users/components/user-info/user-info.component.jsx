import React, {useContext, useState} from 'react';
import {useHistory} from 'react-router-dom';

import * as S from './user-info.styles';
import EditUser from '../edit-user/edit-user.component';
import { useHttpClient } from '../../../hooks/http.hook';
import { AuthContext } from '../../../shared/context/auth.context';
import { ClipLoader } from 'react-spinners';
import {UserInfoText} from "./user-info.styles";

const UserInfo = ({ user, setUser }) => {
  const [open, setOpen] = useState(false);
  const { loading, sendRequest } = useHttpClient();
  const auth = useContext(AuthContext);
  const history = useHistory();

  const handleUserDelete = async () => {
    try {
      const deletedUser = await sendRequest(
        `http://localhost:5000/api/users/${user.id}`,
        'DELETE',
        null,
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );

      history.push('/users');
    } catch (e) {}
  };

  return (
    <S.UserInfo>
      <UserInfoText>{user.username}</UserInfoText>
      <UserInfoText>{user.email}</UserInfoText>
      <UserInfoText isRole>{user.role}</UserInfoText>
      <div>
        {loading ? (
          <ClipLoader />
        ) : (
          <>
            <button onClick={() => setOpen(true)}>Edit</button>
            <button onClick={handleUserDelete}>Delete</button>
          </>
        )}
      </div>
      {open && <EditUser setOpen={setOpen} user={user} setUser={setUser} />}
    </S.UserInfo>
  );
};

export default UserInfo;
