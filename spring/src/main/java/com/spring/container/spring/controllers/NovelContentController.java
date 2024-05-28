package com.spring.container.spring.controllers;

import com.spring.container.spring.domain.NovelContent;
import com.spring.container.spring.service.NovelContentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/novelContents")
public class NovelContentController {

    @Autowired
    private NovelContentService novelContentService;

    @PostMapping
    public NovelContent createNovelContent(@RequestBody NovelContent novelContent) {
        return novelContentService.createNovelContent(novelContent);
    }
}