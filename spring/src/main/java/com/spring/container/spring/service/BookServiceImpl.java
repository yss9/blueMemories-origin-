package com.spring.container.spring.service;

import com.spring.container.spring.domain.Book;
import com.spring.container.spring.domain.BookStatus;
import com.spring.container.spring.dto.BookDTO;
import com.spring.container.spring.repository.BookRepository;
import com.spring.container.spring.repository.BookContentRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BookServiceImpl implements BookService {

    @Autowired
    private BookRepository bookRepository;

    @Override
    public Book createBook(Book book) {
        return bookRepository.save(book);
    }

    @Override
    public List<Book> getBooksByMemberId(Long memberId) {
        return bookRepository.findByMemberId(memberId);
    }

    @Override
    public List<BookDTO> getAllBooksById(Long id) {
        List<Book> books = bookRepository.findAllById(id);
        return books.stream().map(this::convertToDTO).collect(Collectors.toList());
    }
    private BookDTO convertToDTO(Book novel) {
        BookDTO bookDTO = new BookDTO();
        bookDTO.setId(novel.getId());
        bookDTO.setTitle(novel.getTitle());
        bookDTO.setCoverImage(novel.getCoverImage());
        bookDTO.setStatus(novel.getStatus().name());
        bookDTO.setMemberId(novel.getMember().getId());
        return bookDTO;
    }

    @Override
    public List<BookDTO> getIncompleteBooksByMemberId(Long memberId) {
        List<Book> books = bookRepository.findByMemberIdAndStatus(memberId, BookStatus.IN_COMPLETED);
        return books.stream()
                .map(this::coverConvertToDTO)
                .collect(Collectors.toList());
    }
    @Override
    public List<BookDTO> getCompleteBooksByMemberId(Long memberId) {
        List<Book> novels = bookRepository.findByMemberIdAndStatus(memberId, BookStatus.COMPLETED);
        return novels.stream()
                .map(this::coverConvertToDTO)
                .collect(Collectors.toList());
    }
    private BookDTO coverConvertToDTO(Book book) {
        BookDTO bookDTO = new BookDTO();
        bookDTO.setId(book.getId());
        bookDTO.setTitle(book.getTitle());
        bookDTO.setTitleX(book.getTitleX());
        bookDTO.setTitleY(book.getTitleY());
        bookDTO.setTitleSize(book.getTitleSize());
        bookDTO.setStatus(book.getStatus().toString());
        bookDTO.setMemberId(book.getMember().getId());
        bookDTO.setCoverImage(book.getCoverImage());
        return bookDTO;
    }

    @Override
    @Transactional
    public void deleteTemporaryBooksByMemberId(Long memberId) {
        List<Book> temporaryBooks = bookRepository.findByMemberIdAndStatus(memberId, BookStatus.TEMPORARY);
        bookRepository.deleteAll(temporaryBooks);
    }

    @Override
    public Optional<BookDTO> getBookById(Long id) {
        return bookRepository.findById(id).map(this::coverConvertToDTO);
    }

    @Override
    @Transactional
    public void updateBook(Long bookId, String title, byte[] coverImage, int titleX, int titleY, int titleSize, BookStatus status){
        Optional<Book> optionalNovel = bookRepository.findById(bookId);//novelId랑 일치하는거 가져옴
        if(optionalNovel.isPresent()){//null방지
            Book book = optionalNovel.get();
            if(title != null){
                book.setTitle(title);
            }
            if(coverImage != null) {
                book.setCoverImage(coverImage);
            }
            if(titleX != 0){
                book.setTitleX(titleX);
            }
            if(titleY != 0){
                book.setTitleY(titleY);
            }
            if(titleSize != 0){
                book.setTitleSize(titleSize);
            }
            book.setStatus(status);
            bookRepository.save(book);
        }
        else{
            throw new IllegalAccessError("Novel with ID " + bookId + " not found");
        }
    }
}