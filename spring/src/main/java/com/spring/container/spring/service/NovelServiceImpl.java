package com.spring.container.spring.service;

import com.spring.container.spring.domain.Novel;
import com.spring.container.spring.domain.NovelStatus;
import com.spring.container.spring.dto.NovelDTO;
import com.spring.container.spring.repository.NovelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

//    @Override
//    public Optional<Novel> getNovelById(Long id) {
//        return novelRepository.findById(id);
//    }

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
}