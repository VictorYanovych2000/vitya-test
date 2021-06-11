import React, { useState, useContext } from 'react';

import ModalContainer from '../../../shared/components/modal/modal.component';
import FormInput from '../../../shared/components/form-input/form-input.component';

import { AuthContext } from '../../../shared/context/auth.context';

import { useHttpClient } from '../../../hooks/http.hook';
import { ClipLoader } from 'react-spinners';

const EditUser = ({ setOpen, user, setUser }) => {
  const [form, setForm] = useState(user);
  const auth = useContext(AuthContext);
  const { loading, error, sendRequest } = useHttpClient();

  const handleInputChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRadioChange = e => {
    console.log(e.target.value);
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const { username, email, role } = form;

    try {
      const res = await sendRequest(
        `http://localhost:5000/api/users/${user.id}`,
        'PATCH',
        JSON.stringify({ username, email, role }),
        {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.token}`,
        }
      );
      setUser(res.user);
      setOpen(false);
    } catch (e) {}
  };

  return (
    <ModalContainer setOpen={setOpen}>
      <form name={'edit-user'} onSubmit={handleSubmit}>
        <FormInput
          value={form.username}
          name={'username'}
          label={'Username'}
          handleChange={handleInputChange}
        />
        <FormInput
          value={form.email}
          name={'email'}
          label={'Email'}
          handleChange={handleInputChange}
        />
        <div>
          <input
            type="radio"
            name="role"
            value={'user'}
            checked={`${form.role}` === 'user'}
            onChange={handleRadioChange}
          />{' '}
          User
          <input
            type="radio"
            name="role"
            value={'admin'}
            checked={`${form.role}` === 'admin'}
            onChange={handleRadioChange}
          />{' '}
          Admin
        </div>
        {loading ? <ClipLoader /> : <button type={'submit'}>Update</button>}
      </form>
    </ModalContainer>
  );
};

export default EditUser;
