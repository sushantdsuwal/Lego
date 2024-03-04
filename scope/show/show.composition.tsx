import { Show } from './show.js';

export const BasicShow = () => {
  const amount = 6;
  const hasLink = false;

  return (
    <Show>
      <Show.When isTrue={amount === 6 && !hasLink}>
        <b>Lucky number 6!</b>
        <a href="https://google.com">Click Here</a>
      </Show.When>

      <Show.When isTrue={amount === 6 && hasLink}>
        <b>Lucky number 6!</b>
        <a href="https://google.com">Click Here</a>
      </Show.When>

      <Show.Else>
        <b>Conditions are not met!</b>
      </Show.Else>
    </Show>
  );
};
