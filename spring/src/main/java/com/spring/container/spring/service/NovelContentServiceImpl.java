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
//
//    @Override
//    public void replaceContents(Long novelId, List<NovelContent> novelContents) {
//        // 기존 데이터 삭제
//        List<NovelContent> existingContents = novelContentRepository.findByNovelId(novelId);
//        novelContentRepository.deleteAll(existingContents);
//
//        // 새로운 데이터 추가
//        for (NovelContent novelContent : novelContents) {
//            Novel novel = novelRepository.findById(novelId)
//                    .orElseThrow(() -> new IllegalArgumentException("Invalid novel ID: " + novelId));
//            novelContent.setNovel(novel);
//        }
//        novelContentRepository.saveAll(novelContents);
//    }
//}

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@Service
public class NovelContentServiceImpl implements NovelContentService {

    @Autowired
    private NovelContentRepository novelContentRepository;

    @Autowired
    private NovelRepository novelRepository;


    @Override
    public void saveNovelContent(Long novelId, int pageNumber, String textContent, MultipartFile image) throws IOException {
        Optional<Novel> novelOptional = novelRepository.findById(novelId);
        if (novelOptional.isPresent()) {
            NovelContent novelContent = new NovelContent();
            novelContent.setNovel(novelOptional.get());
            novelContent.setPageNumber(pageNumber);
            novelContent.setTextContent(textContent);
            novelContent.setImage(image.getBytes());

            novelContentRepository.save(novelContent);
        } else {
            throw new IllegalArgumentException("Novel with id " + novelId + " not found");
        }
    }

    @Override
    public void saveNovelContentWithoutImage(Long novelId, int pageNumber, String textContent) throws IOException {
        Optional<Novel>novelOptional = novelRepository.findById(novelId);
        if(novelOptional.isPresent()){
            NovelContent novelContent = new NovelContent();
            novelContent.setNovel(novelOptional.get());
            novelContent.setPageNumber(pageNumber);
            novelContent.setTextContent(textContent);

            novelContentRepository.save(novelContent);
        }else{
            throw new IllegalArgumentException("Novel with id " + novelId + " not found");
        }
    }

    @Override
    public void replaceNovelContents(Long novelId, List<Integer> pageNumber, List<String> textContent, List<MultipartFile> image)  throws IOException {
        Optional<Novel> novelOptional = novelRepository.findById(novelId);
        if (novelOptional.isPresent()) {
            Novel novel = novelOptional.get();
            // 기존 내용 삭제
            novelContentRepository.deleteByNovelId(novelId);

            // 새 내용 추가
            for (int i = 0; i < image.size(); i++) {
                NovelContent novelContent = new NovelContent();
                novelContent.setNovel(novel);
                novelContent.setPageNumber(pageNumber.get(i));
                novelContent.setTextContent(textContent.get(i));
                MultipartFile file = image.get(i);
                if (!file.isEmpty()) {
                    novelContent.setImage(file.getBytes());
                }
                novelContentRepository.save(novelContent);
            }
        } else {
            throw new IllegalArgumentException("Novel with id " + novelId + " not found");
        }
    }
}