package com.spring.container.spring.service;

import com.spring.container.spring.domain.BookContent;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface BookContentService {

    void replaceBookContents(Long bookId, List<Integer> pageNumber, List<String> textContent, List<MultipartFile> image) throws IOException;
    List<BookContent> findByBookIdOrderByPageNumber(Long bookId);
}
