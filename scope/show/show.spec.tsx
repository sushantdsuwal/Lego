import { render } from '@testing-library/react';
import { BasicShow } from './show.composition.js';

it('should render the correct text', () => {
  const { getByText } = render(<BasicShow />);
  const rendered = getByText('hello world!');
  expect(rendered).toBeTruthy();
});
