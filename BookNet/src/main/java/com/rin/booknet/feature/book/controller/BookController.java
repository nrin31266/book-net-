package com.rin.booknet.feature.book.controller;

import com.rin.booknet.feature.book.entity.Book;
import com.rin.booknet.feature.book.service.BookService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/books")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class BookController {
    BookService bookService;
    @GetMapping
    public List<Book> getBooks() {
        return bookService.getAllBooks();
    }
}
