import { ChangeEvent, useState } from 'react';

const errorInitialState = {
  email: false,
  name: false,
  message: false,
};

const dataInitialState = {
  email: '',
  name: '',
  message: '',
};

export const useForm = () => {
  const [formData, setFormData] = useState(dataInitialState);
  const [formErrors, setFormErrors] = useState(errorInitialState);

  const validateField = (name: string, value: string) => {
    const isValidNameMessage = name !== 'email' && value.length <= 4;
    const isValidEmail =
      name === 'email' &&
      !new RegExp(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ).test(value);

    if (isValidNameMessage || isValidEmail) {
      // we will set the error state
      setFormErrors({
        ...formErrors,
        [name]: true,
      });
      return;
    }
    // set the error state empty or remove the error
    setFormErrors({
      ...formErrors,
      [name]: false,
    });
  };

  const handleChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    //To stop default events
    event.persist();

    const name = event.target.name;
    const val = event.target.value;
    validateField(name, val);

    setFormData({
      ...formData,
      [name]: val,
    });
  };

  const resetFormStates = () => {
    setFormData(dataInitialState);
    setFormErrors(errorInitialState);
  };

  return { handleChange, resetFormStates, formData, formErrors };
};
