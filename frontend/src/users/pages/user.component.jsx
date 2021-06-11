import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserInfo from '../components/user-info/user-info.component';
import ProfilesGrid from '../../profiles/components/profiles-grid/profiles-grid.component';
import ProfileCard from '../../profiles/components/profile-card/profile-card.component';
import CreateProfile from '../../profiles/components/create-profile/create-profile.component';

import { useHttpClient } from '../../hooks/http.hook';
import ClipLoader from 'react-spinners/ClipLoader';

const UserPage = () => {
  const [user, setUser] = useState(null);
  const params = useParams();
  const { loading, error, sendRequest } = useHttpClient();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await sendRequest(
          `http://localhost:5000/api/users/${params.id}`
        );
        setUser(res.user);
      } catch (e) {}
    };
    getUser();
  }, [sendRequest]);

  return (
    <div className={'container'}>
      {loading && (
        <div className={'center'}>
          <ClipLoader />
        </div>
      )}
      {user && !loading && (
        <>
          <UserInfo user={user} setUser={setUser} />
          <h2>Profiles:</h2>
          <ProfilesGrid>
            {user?.profiles?.length === 0 ? (
              <div>No profile found</div>
            ) : (
              <>
                {user.profiles.map(profile => (
                  <ProfileCard
                    key={profile.id}
                    profile={profile}
                    user={user}
                    setUser={setUser}
                  />
                ))}
              </>
            )}
            <CreateProfile user={user} setUser={setUser} />
          </ProfilesGrid>
        </>
      )}
    </div>
  );
};

export default UserPage;
