import { useState } from 'react';

const FormValidation = () => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [input, setInput] = useState([]);

  const handleChange = evt => {
    setValue(evt.target.value);
    validateInput(evt.target);
  };

  const validateInput = inputElement => {
    if (inputElement.validity.valid) {
      setError('');
      setIsValid(true);
    } else {
      setError(inputElement.validationMessage);
      setIsValid(false);
    }
  };

  return {
    value,
    error,
    isValid,
    input,
    handleChange
  };
};

export default FormValidation;
