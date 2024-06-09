package com.spring.container.spring.controllers;
import com.spring.container.spring.domain.BookContent;
import com.spring.container.spring.domain.NovelContent;
import com.spring.container.spring.service.BookContentService;
import com.spring.container.spring.service.NovelContentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/bookContents")
public class BookContentController {

    @Autowired
    private BookContentService bookContentService;

    @PostMapping("/replace")
    public ResponseEntity<String> replaceContents(@RequestParam("bookId") Long bookId,
                                                  @RequestParam("pageNumber") List<Integer> pageNumber,
                                                  @RequestParam("textContent") List<String> textContent,
                                                  @RequestParam("image") List<MultipartFile> image) {
        try {
            bookContentService.replaceBookContents(bookId, pageNumber, textContent, image);
            System.out.println("controll content: pageNumber=" + pageNumber.get(0) + ", textContent=" + textContent.get(0));
            return ResponseEntity.ok("Book contents replaced successfully");
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error replacing contents: " + e.getMessage());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

    @GetMapping("/view")
    public ResponseEntity<List<BookContent>> getContentsByBookId(@RequestParam("bookId")Long bookId){
        List<BookContent> contents = bookContentService.findByBookIdOrderByPageNumber(bookId);
        if(contents!=null&&!contents.isEmpty()){
            return ResponseEntity.ok(contents);
        }else{
            return ResponseEntity.noContent().build();
        }
    }
}