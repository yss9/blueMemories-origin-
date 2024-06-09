package com.spring.container.spring.service;

import com.spring.container.spring.domain.Novel;
import com.spring.container.spring.domain.NovelStatus;
import com.spring.container.spring.dto.NovelDTO;
import com.spring.container.spring.repository.NovelContentRepository;
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
        novelDTO.setTitleSize(novel.getTitleSize());
        novelDTO.setStatus(novel.getStatus().toString());
        novelDTO.setMemberId(novel.getMember().getId());
        novelDTO.setCoverImage(novel.getCoverImage());
        return novelDTO;
    }

    @Override
    @Transactional
    public void updateNovel(Long novelId, String title, byte[] coverImage, int titleX, int titleY, int titleSize, NovelStatus status){
        Optional<Novel> optionalNovel = novelRepository.findById(novelId);//novelId랑 일치하는거 가져옴
        if(optionalNovel.isPresent()){//null방지
            Novel novel = optionalNovel.get();
            if(title != null){
                novel.setTitle(title);
            }
            if(coverImage != null) {
                novel.setCoverImage(coverImage);
            }
            if(titleX != 0){
                novel.setTitleX(titleX);
            }
            if(titleY != 0){
                novel.setTitleY(titleY);
            }
            if(titleSize != 0){
                novel.setTitleSize(titleSize);
            }
            novel.setStatus(status);
            novelRepository.save(novel);
        }
        else{
            throw new IllegalAccessError("Novel with ID " + novelId + " not found");
        }
    }

    @Override
    @Transactional
    public void deleteTemporaryNovelsByMemberId(Long memberId) {
        List<Novel> temporaryNovels = novelRepository.findByMemberIdAndStatus(memberId, NovelStatus.TEMPORARY);
        novelRepository.deleteAll(temporaryNovels);
    }

    @Override
    public Optional<NovelDTO> getNovelById(Long id) {
        return novelRepository.findById(id).map(this::coverConvertToDTO);
    }
}