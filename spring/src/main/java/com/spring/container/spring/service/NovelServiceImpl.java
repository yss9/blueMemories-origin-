package com.spring.container.spring.service;

import com.spring.container.spring.domain.Novel;
import com.spring.container.spring.domain.NovelStatus;
import com.spring.container.spring.dto.NovelDTO;
import com.spring.container.spring.repository.NovelRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class NovelServiceImpl implements NovelService {

    @Autowired
    private NovelRepository novelRepository;

    @Override
    public Novel createNovel(Novel novel) {
        return novelRepository.save(novel);
    }

    @Override
    public List<Novel> getNovelsByMemberId(Long memberId) {
        return novelRepository.findByMemberId(memberId);
    }

    @Override
    public List<NovelDTO> getAllNovelsById(Long id) {
        List<Novel> novels = novelRepository.findAllById(id);
        return novels.stream().map(this::convertToDTO).collect(Collectors.toList());
    }
    private NovelDTO convertToDTO(Novel novel) {
        NovelDTO novelDTO = new NovelDTO();
        novelDTO.setId(novel.getId());
        novelDTO.setTitle(novel.getTitle());
        novelDTO.setCoverImage(novel.getCoverImage());
        novelDTO.setStatus(novel.getStatus().name());
        novelDTO.setMemberId(novel.getMember().getId());
        return novelDTO;
    }

    @Override
    public List<NovelDTO> getIncompleteNovelsByMemberId(Long memberId) {
        List<Novel> novels = novelRepository.findByMemberIdAndStatus(memberId, NovelStatus.IN_COMPLETED);
        return novels.stream()
                .map(this::coverConvertToDTO)
                .collect(Collectors.toList());
    }
    @Override
    public List<NovelDTO> getCompleteNovelsByMemberId(Long memberId) {
        List<Novel> novels = novelRepository.findByMemberIdAndStatus(memberId, NovelStatus.COMPLETED);
        return novels.stream()
                .map(this::coverConvertToDTO)
                .collect(Collectors.toList());
    }
    private NovelDTO coverConvertToDTO(Novel novel) {
        NovelDTO novelDTO = new NovelDTO();
        novelDTO.setId(novel.getId());
        novelDTO.setTitle(novel.getTitle());
        novelDTO.setTitleX(novel.getTitleX());
        novelDTO.setTitleY(novel.getTitleY());
        novelDTO.setStatus(novel.getStatus().toString());
        novelDTO.setMemberId(novel.getMember().getId());
        novelDTO.setCoverImage(novel.getCoverImage());
        return novelDTO;
    }

    @Override
    @Transactional
    public void replaceNovel(Long novelId, String title, byte[] coverImage, int titleX, int titleY, int titleSize) {
        Optional<Novel> optionalNovel = novelRepository.findById(novelId);//novelId랑 일치하는거 가져옴
        if(optionalNovel.isPresent()){//null방지
            Novel novel = optionalNovel.get();
            novel.setTitle(title);
            novel.setCoverImage(coverImage);
            novel.setTitleX(titleX);
            novel.setTitleY(titleY);
            novel.setTitleSize(titleSize);
            novelRepository.save(novel);
        }
        else{
            throw new IllegalAccessError("Novel with ID " + novelId + " not found");
        }
    }

    @Override
    @Transactional
    public void updateStatus(Long novelId, NovelStatus novelStatus) {
        Optional<Novel> optionalNovel = novelRepository.findById(novelId);//novelId랑 일치하는거 가져옴
        if(optionalNovel.isPresent()) {//null방지
            Novel novel = optionalNovel.get();
            novel.setStatus(novelStatus);
            novelRepository.save(novel);
        }
        else{
            throw new IllegalAccessError("Novel with ID " + novelId + " not found");
        }
    }
}