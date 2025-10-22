package com.rin.booknet.feature.book.repository;

import com.rin.booknet.feature.book.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Long> {
}
