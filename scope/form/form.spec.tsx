import React from 'react';
import { render } from '@testing-library/react';
import { BasicForm } from './form.composition.js';

it('should render the correct text', () => {
  const { getByText } = render(<BasicForm />);
  const rendered = getByText('hello world!');
  expect(rendered).toBeTruthy();
});
