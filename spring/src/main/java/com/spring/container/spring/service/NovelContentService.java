package com.spring.container.spring.service;
import com.spring.container.spring.domain.NovelContent;

import java.util.List;


//public interface NovelContentService {
//    List<NovelContent> getAllContents();
//    NovelContent createContent(NovelContent novelContent);
//    List<NovelContent> createContents(List<NovelContent> novelContents);
//    void deleteContent(Long id);
//    void replaceContents(Long novelId, List<NovelContent> novelContents); // 새 메서드 추가
//}

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface NovelContentService {
    void saveNovelContent(Long novelId, int pageNumber, String textContent, MultipartFile image) throws IOException;
    void saveNovelContentWithoutImage(Long novelId, int pageNumber, String textContent) throws IOException;
    void replaceNovelContents(Long novelId, List<Integer> pageNumber, List<String> textContent, List<MultipartFile> image) throws IOException;
}
