import { ReactNode, ReactElement } from 'react';

export interface ListProps<T> {
  render: (item: T, index: number) => ReactNode;
  of: T[];
}

export function List<T>({ render, of }: ListProps<T>): ReactElement {
  return <>{of.map((item, index) => render(item, index))}</>;
}
