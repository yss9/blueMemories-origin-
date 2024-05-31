package com.spring.container.spring.service;

import com.spring.container.spring.domain.Novel;
import com.spring.container.spring.domain.NovelContent;
import com.spring.container.spring.repository.NovelContentRepository;
import com.spring.container.spring.repository.NovelRepository;
import com.spring.container.spring.service.NovelContentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
//
//@Service
//public class NovelContentServiceImpl implements NovelContentService {
//    @Autowired
//    private NovelContentRepository novelContentRepository;
//
//    @Autowired
//    private NovelRepository novelRepository;
//
//    @Override
//    public List<NovelContent> getAllContents() {
//        return novelContentRepository.findAll();
//    }
//
//    @Override
//    public NovelContent createContent(NovelContent novelContent) {
//        // NovelContent 객체에 Novel 객체 설정
//        Novel novel = novelRepository.findById(novelContent.getNovel().getId())
//                .orElseThrow(() -> new IllegalArgumentException("Invalid novel ID: " + novelContent.getNovel().getId()));
//        novelContent.setNovel(novel);
//        return novelContentRepository.save(novelContent);
//    }
//
//    @Override
//    public List<NovelContent> createContents(List<NovelContent> novelContents) {
//        for (NovelContent novelContent : novelContents) {
//            Novel novel = novelRepository.findById(novelContent.getNovel().getId())
//                    .orElseThrow(() -> new IllegalArgumentException("Invalid novel ID: " + novelContent.getNovel().getId()));
//            novelContent.setNovel(novel);
//        }
//        return novelContentRepository.saveAll(novelContents);
//    }
//
//    @Override
//    public void deleteContent(Long id) {
//        novelContentRepository.deleteById(id);
//    }
//}

@Service
public class NovelContentServiceImpl implements NovelContentService {
    @Autowired
    private NovelContentRepository novelContentRepository;

    @Autowired
    private NovelRepository novelRepository;

    @Override
    public List<NovelContent> getAllContents() {
        return novelContentRepository.findAll();
    }

    @Override
    public NovelContent createContent(NovelContent novelContent) {
        Novel novel = novelRepository.findById(novelContent.getNovel().getId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid novel ID: " + novelContent.getNovel().getId()));
        novelContent.setNovel(novel);
        return novelContentRepository.save(novelContent);
    }

    @Override
    public List<NovelContent> createContents(List<NovelContent> novelContents) {
        for (NovelContent novelContent : novelContents) {
            Novel novel = novelRepository.findById(novelContent.getNovel().getId())
                    .orElseThrow(() -> new IllegalArgumentException("Invalid novel ID: " + novelContent.getNovel().getId()));
            novelContent.setNovel(novel);
        }
        return novelContentRepository.saveAll(novelContents);
    }

    @Override
    public void deleteContent(Long id) {
        novelContentRepository.deleteById(id);
    }

    @Override
    public void replaceContents(Long novelId, List<NovelContent> novelContents) {
        // 기존 데이터 삭제
        List<NovelContent> existingContents = novelContentRepository.findByNovelId(novelId);
        novelContentRepository.deleteAll(existingContents);

        // 새로운 데이터 추가
        for (NovelContent novelContent : novelContents) {
            Novel novel = novelRepository.findById(novelId)
                    .orElseThrow(() -> new IllegalArgumentException("Invalid novel ID: " + novelId));
            novelContent.setNovel(novel);
        }
        novelContentRepository.saveAll(novelContents);
    }
}