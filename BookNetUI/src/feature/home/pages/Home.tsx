import React, { use, useEffect, useState } from 'react'
import handleAPI from '../../../apis/handleAPI';
import type { IBook } from '../../../types';
import BookItem from '../components/BookItem';

const Home = () => {
  const [books, setBooks] = useState<IBook[]>([]);
  useEffect(() => {
    handleAPI<IBook[]>({
      isAuth: true,
      endpoint: '/books',
      method: 'GET'
    }).then(data => {
      setBooks(data);
      console.log("Books data:", data);
    }).catch(error => {
      console.error("Error fetching books:", error);
    });
  }, []);
  return (
    <div className='flex flex-wrap gap-4 p-4 justify-center '>
      {books.map(book => (
        <BookItem key={book.id} book={book} />
      ))}
    </div>
  )
}

export default Home