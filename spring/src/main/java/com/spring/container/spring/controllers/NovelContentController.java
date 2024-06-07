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

    @GetMapping("/view")
    public ResponseEntity<List<NovelContent>> getContentsByNovelId(@RequestParam("novelId")Long novelId){
        List<NovelContent> contents = novelContentService.findByNovelIdOrderByPageNumber(novelId);
        if(contents!=null&&!contents.isEmpty()){
            return ResponseEntity.ok(contents);
        }else{
            return ResponseEntity.noContent().build();
        }
    }
}