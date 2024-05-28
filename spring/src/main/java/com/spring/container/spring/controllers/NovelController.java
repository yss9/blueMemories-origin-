package com.spring.container.spring.controllers;

import com.spring.container.spring.domain.Novel;
import com.spring.container.spring.domain.NovelStatus;
import com.spring.container.spring.service.NovelService;
import org.springframework.beans.factory.annotation.Autowired;
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

    @GetMapping("/member/{memberId}/status/{status}")
    public List<Novel> getNovelsByMemberIdAndStatus(@PathVariable Long memberId, @PathVariable NovelStatus status) {
        return novelService.getNovelsByMemberIdAndStatus(memberId, status);
    }

    @PutMapping("/{novelId}/status")
    public Novel updateNovelStatus(@PathVariable Long novelId, @RequestBody NovelStatus status) {
        return novelService.updateNovelStatus(novelId, status);
    }
}