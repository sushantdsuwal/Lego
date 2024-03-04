import { render } from '@testing-library/react';
import { BasicList } from './list.composition.js';

it('should render the correct text', () => {
  const { getByText } = render(<BasicList />);
  const rendered = getByText('hello world!');
  expect(rendered).toBeTruthy();
});
