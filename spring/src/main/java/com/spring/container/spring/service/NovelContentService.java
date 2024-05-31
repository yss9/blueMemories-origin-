package com.spring.container.spring.service;
import com.spring.container.spring.domain.NovelContent;

import java.util.List;

//public interface NovelContentService {
//    List<NovelContent> getAllContents();
//    NovelContent createContent(NovelContent novelContent);
//    List<NovelContent> createContents(List<NovelContent> novelContents);
//    void deleteContent(Long id);
//}
public interface NovelContentService {
    List<NovelContent> getAllContents();
    NovelContent createContent(NovelContent novelContent);
    List<NovelContent> createContents(List<NovelContent> novelContents);
    void deleteContent(Long id);
    void replaceContents(Long novelId, List<NovelContent> novelContents); // 새 메서드 추가
}