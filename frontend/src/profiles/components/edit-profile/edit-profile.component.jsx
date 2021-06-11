import React, {useContext, useState} from 'react';

import ModalContainer from '../../../shared/components/modal/modal.component';
import FormInput from '../../../shared/components/form-input/form-input.component';

import {AuthContext} from '../../../shared/context/auth.context';
import {useHttpClient} from '../../../hooks/http.hook';
import {ModalButton, ModalButtonsWrapper} from "./styled";


const EditProfile = ({
                       setOpen,
                       profile,
                       setUser,
                       user,
                       setProfiles,
                       profiles = [],
                       type,
                     }) => {
  const [form, setForm] = useState(profile);
  const {sendRequest} = useHttpClient();
  const auth = useContext(AuthContext);

  const handleInputChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRadioChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const {name, city, gender, birthDate} = form;

    try {
      const res = await sendRequest(
        type === 'new'
          ? 'http://localhost:5000/api/profiles'
          : `http://localhost:5000/api/profiles/${profile.id}`,
        type === 'new' ? 'POST' : 'PATCH',
        JSON.stringify({
          name,
          city,
          gender,
          birthDate: new Date(birthDate).getTime(),
          userId: user ? user.id : auth.userId,
        }),
        {
          Authorization: `Bearer ${auth.token}`,
          'Content-Type': 'application/json',
        }
      );

      if (user) {
        if (type === 'new') {
          setUser({
            ...user,
            profiles: [...user.profiles, res.profile],
          });
        } else {
          setUser({
            ...user,
            profiles: user.profiles.map(p => {
              if (p.id === res.profile.id) {
                return {...res.profile};
              }
              return p;
            }),
          });
        }
      }

      if (!user) {
        if (type === 'new') {
          setProfiles([...profiles, res.profile]);
        } else {
          setProfiles(
            profiles.map(p => {
              if (p.id === res.profile.id) {
                return {
                  ...res.profile,
                };
              }
              return p;
            })
          );
        }
      }
      setOpen(false);
    } catch (e) {
    }
  };

  return (
    <ModalContainer setOpen={setOpen}>
      <form name={'edit-user'} onSubmit={handleSubmit}>
        <FormInput
          value={form.name}
          name={'name'}
          label={'name'}
          handleChange={handleInputChange}
        />
        <div>
          <input
            type="radio"
            name="gender"
            value={'male'}
            checked={`${form.gender}` === 'male'}
            onChange={handleRadioChange}
          />{' '}
          Male
          {' '}
          <input
            type="radio"
            name="gender"
            value={'female'}
            checked={`${form.gender}` === 'female'}
            onChange={handleRadioChange}
          />
          {' '}
          Female
        </div>
        <FormInput
          value={form.city}
          name={'city'}
          label={'City'}
          handleChange={handleInputChange}
        />
        <FormInput
          type={'date'}
          value={form.birthDate}
          name={'birthDate'}
          label={'BirthDate'}
          handleChange={handleInputChange}
        />
        <ModalButtonsWrapper>
          <ModalButton type={'submit'}>
            <svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.99989 10.17L2.52989 6.70001C2.13989 6.31001 1.50989 6.31001 1.11989 6.70001C0.729893 7.09001
          0.729893 7.72001 1.11989 8.11001L5.29989 12.29C5.68989 12.68 6.31989 12.68 6.70989 12.29L17.2899
          1.71001C17.6799 1.32001 17.6799 0.690007 17.2899 0.300007C16.8999 -0.0899927 16.2699 -0.0899927 15.8799
          0.300007L5.99989 10.17Z" fill="#4E4B66"/>
            </svg>
          </ModalButton>
          <ModalButton type={'submit'}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.3 0.710001C12.91 0.320001 12.28 0.320001 11.89 0.710001L6.99997 5.59L2.10997 0.700001C1.71997
          0.310001 1.08997 0.310001 0.699971 0.700001C0.309971 1.09 0.309971 1.72 0.699971 2.11L5.58997 7L0.699971
           11.89C0.309971 12.28 0.309971 12.91 0.699971 13.3C1.08997 13.69 1.71997 13.69 2.10997 13.3L6.99997 8.41L11.89
            13.3C12.28 13.69 12.91 13.69 13.3 13.3C13.69 12.91 13.69 12.28 13.3 11.89L8.40997 7L13.3 2.11C13.68
             1.73 13.68 1.09 13.3 0.710001Z" fill="#323232"/>
            </svg>
          </ModalButton>
        </ModalButtonsWrapper>
      </form>
    </ModalContainer>
  );
};

export default EditProfile;
