import { useState } from 'react';

const FormValidation = () => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [input, setInput] = useState([]);

  const handleChange = evt => {
    const name = evt.target.name;
    const value = evt.target.value;
    const validationMessage = evt.target.validationMessage;
    const isValid = evt.target.validity.valid;
    const form = evt.target.form;
    setValue(obj => {
      return { ...obj, [name]: value };
    });
    setError(err => {
      return { ...err, [name]: validationMessage };
    });
    setInput(obj => {
      return { ...obj, [name]: isValid };
    });
    setIsValid(form.checkValidity());
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
