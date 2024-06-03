package com.spring.container.spring.controllers;
import com.spring.container.spring.domain.Novel;
import com.spring.container.spring.domain.NovelContent;
import com.spring.container.spring.repository.NovelContentRepository;
import com.spring.container.spring.service.NovelContentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
//
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
//    @PostMapping("/replace")
//    public ResponseEntity<Void> replaceContents(@RequestParam Long novelId, @RequestBody List<NovelContent> novelContents) {
//        novelContentService.replaceContents(novelId, novelContents);
//        return ResponseEntity.noContent().build();
//    }
//
//    @DeleteMapping("/{id}")
//    public ResponseEntity<Void> deleteContent(@PathVariable Long id) {
//        novelContentService.deleteContent(id);
//        return ResponseEntity.noContent().build();
//    }
//
//}

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/novelContents")
public class NovelContentController {

    @Autowired
    private NovelContentService novelContentService;

    @PostMapping("/replace")
    public ResponseEntity<String> replaceContents(@RequestParam("novelId") Long novelId,
                                                  @RequestParam("pageNumber") List<Integer> pageNumber,
                                                  @RequestParam("textContent") List<String> textContent,
                                                  @RequestParam("image") List<MultipartFile> image) {
        try {
            novelContentService.replaceNovelContents(novelId, pageNumber, textContent, image);
            return ResponseEntity.ok("Novel contents replaced successfully");
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error replacing contents: " + e.getMessage());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }
}