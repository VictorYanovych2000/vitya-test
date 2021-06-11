import React, { useState, useContext } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

import AuthContainer from '../../components/auth-container/auth-container.component';
import FormInput from '../../../shared/components/form-input/form-input.component';

import { AuthContext } from '../../../shared/context/auth.context';
import { useHttpClient } from '../../../hooks/http.hook';

const SignInPage = () => {
  const auth = useContext(AuthContext);
  const { loading, error, sendRequest } = useHttpClient();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const { email, password } = form;

    try {
      const res = await sendRequest(
        `http://localhost:5000/api/users/login`,
        'POST',
        JSON.stringify({
          email,
          password,
        }),
        {
          'Content-Type': 'application/json',
        }
      );

      auth.login(res.email, res.role, res.userId, res.token);
    } catch (e) {}
  };

  return (
    <AuthContainer title={'Sign in'}>
      {error && error}
      <form name={'sign-in-form'} onSubmit={handleSubmit}>
        <FormInput
          type={'email'}
          name={'email'}
          label={'Email'}
          value={form.email}
          handleChange={handleInputChange}
          required
        />
        <FormInput
          type={'password'}
          name={'password'}
          label={'Password'}
          value={form.password}
          handleChange={handleInputChange}
          required
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '3rem',
          }}
        >
          {loading ? <ClipLoader /> : <button type={'submit'}>Sign In</button>}
        </div>
      </form>
    </AuthContainer>
  );
};

export default SignInPage;
