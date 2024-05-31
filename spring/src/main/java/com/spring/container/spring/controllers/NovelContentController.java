package com.spring.container.spring.controllers;
import com.spring.container.spring.domain.NovelContent;
import com.spring.container.spring.service.NovelContentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//@RestController
//@RequestMapping("/api/novelContents")
//public class NovelContentController {
//    @Autowired
//    private NovelContentService novelContentService;
//
//    @GetMapping
//    public List<NovelContent> getAllContents() {
//        return novelContentService.getAllContents();
//    }
//
//    @PostMapping
//    public NovelContent createContent(@RequestBody NovelContent novelContent) {
//        return novelContentService.createContent(novelContent);
//    }
//
//    @PostMapping("/batch")
//    public ResponseEntity<List<NovelContent>> createContents(@RequestBody List<NovelContent> novelContents) {
//        List<NovelContent> savedContents = novelContentService.createContents(novelContents);
//        return ResponseEntity.ok(savedContents);
//    }
//
//    @DeleteMapping("/{id}")
//    public ResponseEntity<Void> deleteContent(@PathVariable Long id) {
//        novelContentService.deleteContent(id);
//        return ResponseEntity.noContent().build();
//    }
//}
@RestController
@RequestMapping("/api/novelContents")
public class NovelContentController {
    @Autowired
    private NovelContentService novelContentService;

    @GetMapping
    public List<NovelContent> getAllContents() {
        return novelContentService.getAllContents();
    }

    @PostMapping
    public NovelContent createContent(@RequestBody NovelContent novelContent) {
        return novelContentService.createContent(novelContent);
    }

    @PostMapping("/batch")
    public ResponseEntity<List<NovelContent>> createContents(@RequestBody List<NovelContent> novelContents) {
        List<NovelContent> savedContents = novelContentService.createContents(novelContents);
        return ResponseEntity.ok(savedContents);
    }

    @PostMapping("/replace")
    public ResponseEntity<Void> replaceContents(@RequestParam Long novelId, @RequestBody List<NovelContent> novelContents) {
        novelContentService.replaceContents(novelId, novelContents);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteContent(@PathVariable Long id) {
        novelContentService.deleteContent(id);
        return ResponseEntity.noContent().build();
    }
}