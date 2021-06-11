import React from 'react';

import * as S from './form-input.styles';

const FormInput = ({ handleChange, label, ...otherProps }) => {
  return (
    <S.FormItem>
      <input onChange={handleChange} {...otherProps} />
      {label && (
        <label className={`${otherProps.value?.length ? 'shrink' : ''}`}>
          {label}
        </label>
      )}
    </S.FormItem>
  );
};

export default FormInput;
