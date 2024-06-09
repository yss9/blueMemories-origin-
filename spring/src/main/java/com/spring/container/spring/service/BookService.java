package com.spring.container.spring.service;

import com.spring.container.spring.domain.Book;
import com.spring.container.spring.domain.BookStatus;
import com.spring.container.spring.dto.BookDTO;

import java.util.List;
import java.util.Optional;

public interface BookService {
    Book createBook(Book book);
    List<Book> getBooksByMemberId(Long memberId);
    List<BookDTO> getAllBooksById(Long id);
    List<BookDTO> getIncompleteBooksByMemberId(Long memberId);
    List<BookDTO> getCompleteBooksByMemberId(Long memberId);
    void deleteTemporaryBooksByMemberId(Long memberId);
    Optional<BookDTO> getBookById(Long id);
    void updateBook(Long bookId, String title, byte[] coverImage, int titleX, int titleY, int titleSize, BookStatus status);
}