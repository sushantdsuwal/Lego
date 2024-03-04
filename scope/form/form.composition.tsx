import { Form } from './form.js';

// Define the schema for your form
const schema = [
  {
    name: 'firstName',
    label: 'First Name',
    type: 'text',
    // validation: [{ required: 'First Name is required' }],
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    // validation: [
    //   { required: 'Email is required' },
    //   { pattern: /^\S+@\S+$/i, message: 'Invalid email address' },
    // ],
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
    <Form schema={schema} onSubmit={onSubmit} initialValues={initialValues} />
  );
};
