import React, { useEffect, useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

import { useHttpClient } from '../../hooks/http.hook';

import UsersGrid from '../components/users-grid/users-grid.component';
import UserCard from '../components/user-card/user-card.component';
import { PageTitle } from "../../styles/global.styles";

const UsersPage = () => {
  const [users, setUsers] = useState(null);
  const { loading, sendRequest } = useHttpClient();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await sendRequest(`http://localhost:5000/api/users`);
        setUsers(res.users);
      } catch (e) {}
    };
    getUsers();
  }, [sendRequest]);

  return (
    <div className={'container'}>
      {loading && (
        <div className={'center'}>
          <ClipLoader />
        </div>
      )}
      <PageTitle>Users:</PageTitle>
      {users && !loading && (
        <>
          <UsersGrid>
            {users.length === 0 ? (
              <div>Users not found</div>
            ) : (
              <>
                {users.map(({ id, username, email, profiles }) => (
                  <UserCard
                    key={id}
                    id={id}
                    username={username}
                    email={email}
                    profileCount={profiles.length}
                  />
                ))}
              </>
            )}
          </UsersGrid>
        </>
      )}
    </div>
  );
};

export default UsersPage;
