package com.spring.container.spring.controllers;

import com.spring.container.spring.domain.Novel;
import com.spring.container.spring.domain.NovelStatus;
import com.spring.container.spring.dto.NovelDTO;
import com.spring.container.spring.service.NovelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/novels")
public class NovelController {

    @Autowired
    private NovelService novelService;

    @PostMapping
    public Novel createNovel(@RequestBody Novel novel) {
        return novelService.createNovel(novel);
    }

    @GetMapping("/member/{memberId}")
    public List<Novel> getNovelsByMemberId(@PathVariable Long memberId) {
        return novelService.getNovelsByMemberId(memberId);
    }

//    @GetMapping("/complete/{id}")
//    public ResponseEntity<List<Novel>> getAllNovelsById(@PathVariable Long id) {
//        List<Novel> novels = novelService.getAllNovelsById(id);
//        if (!novels.isEmpty()) {
//            return ResponseEntity.ok(novels);
//        } else {
//            return ResponseEntity.noContent().build();
//        }
//    }
@GetMapping("/complete/{id}")
public ResponseEntity<List<NovelDTO>> getAllNovelsById(@PathVariable Long id) {
    List<NovelDTO> novelDTOs = novelService.getAllNovelsById(id);
    if (!novelDTOs.isEmpty()) {
        return ResponseEntity.ok(novelDTOs);
    } else {
        return ResponseEntity.noContent().build();
    }
}
}