import { List } from './list.js';

interface Book {
  id: number;
  title: string;
  author: string;
}

export const BasicList = () => {
  const books: Book[] = [
    { id: 1, title: 'the catcher in the rye', author: 'J.D' },
    { id: 2, title: 'To kill a mockingbird', author: 'Harper' },
    { id: 4, title: '1984', author: 'George Orwell' },
  ];

  return (
    <div>
      <h2>Books</h2>
      <List
        of={books}
        render={(item: Book, index: number) => {
          return <p key={item.id}>{`${index} : ${item.title}`}</p>;
        }}
      />
    </div>
  );
};
