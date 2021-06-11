import React, {useContext, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

import ProfilesGrid from '../components/profiles-grid/profiles-grid.component';
import ProfileCard from '../components/profile-card/profile-card.component';
import CreateProfile from '../components/create-profile/create-profile.component';

import {useHttpClient} from '../../hooks/http.hook';
import {ClipLoader} from 'react-spinners';
import {AuthContext} from '../../shared/context/auth.context';
import {PageTitle} from "../../styles/global.styles";

const ProfilesPage = () => {
  const params = useParams();
  const auth = useContext(AuthContext);
  const [profiles, setProfiles] = useState([]);
  const {loading, sendRequest} = useHttpClient();

  const getUserProfiles = async () => {
    try {
      const res = await sendRequest(
        `http://localhost:5000/api/profiles/user/${params.id}`,
        'GET',
        null,
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      setProfiles(res.profiles);
    } catch (e) {
    }
  };

  useEffect(() => {
    getUserProfiles();
  }, [sendRequest]);

  return (
    <div className={'container'}>
      {loading && <ClipLoader/>}
      <PageTitle>Profiles:</PageTitle>
      <ProfilesGrid>
        {profiles && !loading && (
          <>
            {profiles.length !== 0 && (
              <>
                {profiles.map(profile => (
                  <ProfileCard
                    key={profile.id}
                    profile={profile}
                    profiles={profiles}
                    setProfiles={setProfiles}
                  />
                ))}
              </>
            )}
          </>
        )}
        <CreateProfile
          profiles={profiles}
          setProfiles={setProfiles}
        />
      </ProfilesGrid>
    </div>
  );
};

export default ProfilesPage;
