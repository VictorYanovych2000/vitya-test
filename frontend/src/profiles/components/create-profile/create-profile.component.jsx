import React, {useState} from 'react';
import EditProfile from '../edit-profile/edit-profile.component';
import createProfileIcon from '../../../assets/icons/create-profile-icon.svg'

import {CreateProfileTitle, EditProfileWrapper, EditProfileWrapperIcon} from "./create-profile.styles";

const CreateProfile = ({setUser, user, setProfiles, profiles}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <EditProfileWrapper onClick={() => setOpen(true)}>
        <EditProfileWrapperIcon src={createProfileIcon} />
        <CreateProfileTitle>Create new profile</CreateProfileTitle>
      </EditProfileWrapper>
      {open && (
        <EditProfile
          setOpen={setOpen}
          profile={{name: '', gender: 'male', city: ''}}
          setUser={setUser}
          user={user}
          setProfiles={setProfiles}
          profiles={profiles}
          type={'new'}
        />
      )}
    </>
  );
};

export default CreateProfile;
