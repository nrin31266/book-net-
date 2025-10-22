

// BookItem.tsx
import React from 'react';
import type { IBook } from '../../../types';

interface BookItemProps {
  book: IBook;
}

const BookItem: React.FC<BookItemProps> = ({ book }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center w-60">
      <img
        src={book.imageUrl}
        alt={book.title}
        className="w-full h-64 object-cover rounded-md mb-4"
      />
      <h3 className="text-lg font-semibold text-gray-800">{book.title}</h3>
      <p className="text-sm text-gray-500">{book.author}</p>
    </div>
  );
};

export default BookItem;
