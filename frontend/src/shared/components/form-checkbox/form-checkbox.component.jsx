import React from 'react';

import * as S from './form-checkbox.styles';

const FormCheckbox = ({ handleChange, label, ...otherProps }) => {
  return (
    <S.FormItem>
      {label && <label htmlFor={otherProps.name}>{label}</label>}
      <input type={'checkbox'} onChange={handleChange} {...otherProps} />
    </S.FormItem>
  );
};

export default FormCheckbox;
