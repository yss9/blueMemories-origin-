package com.spring.container.spring.service;

import com.spring.container.spring.domain.Book;
import com.spring.container.spring.domain.BookContent;
import com.spring.container.spring.repository.BookContentRepository;
import com.spring.container.spring.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class BookContentServiceImpl implements BookContentService {

    @Autowired
    private BookContentRepository bookContentRepository;

    @Autowired
    private BookRepository bookRepository;

    @Override
    public void replaceBookContents(Long bookId, List<Integer> pageNumber, List<String> textContent, List<MultipartFile> image)  throws IOException {
        Optional<Book> bookOptional = bookRepository.findById(bookId);
        if (bookOptional.isPresent()) {
            Book book = bookOptional.get();
            // 기존 내용 삭제
            bookContentRepository.deleteByBookId(bookId);

            // 새 내용 추가
            for (int i = 0; i < image.size(); i++) {
                BookContent bookContent = new BookContent();
                bookContent.setBook(book);
                bookContent.setPageNumber(pageNumber.get(i));
                if(textContent.get(i)!=null)
                    bookContent.setTextContent(textContent.get(i));
                else
                    bookContent.setTextContent(null);
                MultipartFile file = image.get(i);
                if (!file.isEmpty()) {
                    bookContent.setImage(file.getBytes());
                }
                else{
                    bookContent.setImage(null);
                }
                bookContentRepository.save(bookContent);
                System.out.println("service content: pageNumber=" + pageNumber.get(i) + ", textContent=" + textContent.get(i));
            }
        } else {
            throw new IllegalArgumentException("Book with id " + bookId + " not found");
        }
    }

    @Override
    public List<BookContent> findByBookIdOrderByPageNumber(Long bookId){
        return bookContentRepository.findByBookIdOrderByPageNumber(bookId);
    }
}