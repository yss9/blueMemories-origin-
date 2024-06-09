package com.spring.container.spring.repository;
import com.spring.container.spring.domain.BookContent;
import com.spring.container.spring.domain.NovelContent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface BookContentRepository extends JpaRepository<BookContent, Long> {
    @Query("SELECT nc FROM BookContent nc WHERE nc.book.id= :bookId ORDER BY nc.pageNumber ASC")
    List<BookContent> findByBookIdOrderByPageNumber(Long bookId);
    @Transactional
    void deleteByBookId(Long bookId);
}