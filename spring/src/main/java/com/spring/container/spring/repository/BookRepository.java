package com.spring.container.spring.repository;

import com.spring.container.spring.domain.Book;
import com.spring.container.spring.domain.BookStatus;
import com.spring.container.spring.domain.Novel;
import com.spring.container.spring.domain.NovelStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, Long> {
    List<Book> findByMemberId(Long memberId);
    List<Book> findAllById(Long id);
    List<Book> findByMemberIdAndStatus(Long memberId, BookStatus status);

}
