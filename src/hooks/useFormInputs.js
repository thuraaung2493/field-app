import { useState } from 'react';

export const useFormInputs = (initInputs = {}) => {
  const [inputs, setInputs] = useState(initInputs);

  const handleInput = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  return {
    handleInput,
    setInputs,
    inputs,
  };
};
