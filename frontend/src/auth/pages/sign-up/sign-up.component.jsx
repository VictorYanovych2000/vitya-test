import React, { useContext, useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

import AuthContainer from '../../components/auth-container/auth-container.component';
import FormInput from '../../../shared/components/form-input/form-input.component';
import FormCheckbox from '../../../shared/components/form-checkbox/form-checkbox.component';
import { AuthContext } from '../../../shared/context/auth.context';
import { useHttpClient } from '../../../hooks/http.hook';

const SignUpPage = () => {
  const auth = useContext(AuthContext);
  const { loading, error, sendRequest } = useHttpClient();
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    admin: false,
  });

  const handleInputChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.checked,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const { username, email, password, admin } = form;

    try {
      const res = await sendRequest(
        `http://localhost:5000/api/users/signup`,
        'POST',
        JSON.stringify({
          username,
          email,
          password,
          role: admin ? 'admin' : 'user',
        }),
        {
          'Content-Type': 'application/json',
        }
      );

      console.log(res);

      auth.login(res.email, res.role, res.userId, res.token);
    } catch (e) {}
  };

  return (
    <AuthContainer title={'Create your account'}>
      {error && error}
      <form name={'sign-up-form'} onSubmit={handleSubmit}>
        <FormInput
          type={'text'}
          name={'username'}
          label={'Username'}
          value={form.username}
          handleChange={handleInputChange}
          required
        />
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
        <FormCheckbox
          name={'admin'}
          checked={form.admin}
          value={form.admin}
          label={'Is Admin'}
          handleChange={handleCheckboxChange}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '3rem',
          }}
        >
          {loading ? <ClipLoader /> : <button type={'submit'}>Sign Up</button>}
        </div>
      </form>
    </AuthContainer>
  );
};

export default SignUpPage;
