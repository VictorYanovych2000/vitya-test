import React, {useContext, useState} from 'react';

import EditProfile from '../edit-profile/edit-profile.component';

import {AuthContext} from '../../../shared/context/auth.context';

import {useHttpClient} from '../../../hooks/http.hook';
import {CustomProfileCard, ProfileCardActionButton, ProfileText} from './profile-card.styles';

const ProfileCard = ({ profile, setProfiles, profiles, user, setUser }) => {
  const [open, setOpen] = useState(false);
  const { name, city, birthDate, gender } = profile;
  const { sendRequest } = useHttpClient();
  const auth = useContext(AuthContext);

  console.log(birthDate, 'date')

  const handleDeleteProfile = async () => {
    try {
      const res = await sendRequest(
        `http://localhost:5000/api/profiles/${profile.id}`,
        'DELETE',
        null,
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );

      if (user) {
        setUser({
          ...user,
          profiles: user.profiles.filter(p => p.id !== profile.id),
        });
      }

      if (!user) {
        setProfiles(profiles.filter(p => p.id !== profile.id));
      }
    } catch (e) {}
  };

  return (
    <CustomProfileCard>
      <ProfileText isName>{name}</ProfileText>
      <ProfileText>{gender}</ProfileText>
      <ProfileText>{new Date(birthDate).toDateString()}</ProfileText>
      <ProfileText>{city}</ProfileText>
      <div className={'action'}>
        <ProfileCardActionButton
          isEditButton
          onClick={() => setOpen(true)}
        >
          edit
        </ProfileCardActionButton>
        <ProfileCardActionButton
          onClick={handleDeleteProfile}
        >
          delete
        </ProfileCardActionButton>
      </div>
      {open && (
        <EditProfile
          setProfiles={setProfiles}
          profiles={profiles}
          setOpen={setOpen}
          profile={profile}
          type={'update'}
          user={user}
          setUser={setUser}
        />
      )}
    </CustomProfileCard>
  );
};

export default ProfileCard;
