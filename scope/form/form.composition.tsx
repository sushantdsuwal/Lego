import { Form } from './form.js';
import * as yup from 'yup';

const formSchema = [
  {
    name: 'username',
    label: 'Username',
    type: 'text',
    validation: yup.string().required('Username is required'),
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    validation: yup
      .string()
      .email('Invalid email')
      .required('Email is required'),
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    validation: yup
      .string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
  },
];

export const BasicForm = () => {
  const onSubmit = (data) => {
    console.log('Form data:', data);
  };

  const initialValues = {
    firstName: '',
    email: '',
  };

  return (
    <Form
      schema={formSchema}
      onSubmit={onSubmit}
      initialValues={initialValues}
    />
  );
};
