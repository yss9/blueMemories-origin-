package com.spring.container.spring.controllers;

import com.spring.container.spring.domain.Novel;
import com.spring.container.spring.domain.NovelStatus;
import com.spring.container.spring.dto.NovelDTO;
import com.spring.container.spring.service.NovelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/novels")
public class NovelController {

    @Autowired
    private NovelService novelService;

    /** storageNovel에서 새로운 Novel 생성할 때 사용
     */
    @PostMapping
    public Novel createNovel(@RequestBody Novel novel) {
        return novelService.createNovel(novel);
    }

    /** 생성되는 소설의 사용자 memberId가져올때 사용
     */
    @GetMapping("/member/{memberId}")
    public List<Novel> getNovelsByMemberId(@PathVariable Long memberId) {
        return novelService.getNovelsByMemberId(memberId);
    }

    /** [novel id와 일치하는 row 가져오기]
     * writeNovelPage.js 에서 '책 완성' 버튼 눌렀을 때
     * novel db title, cover_image 가 수정되었는지 확인할 때 사용
     */
    @GetMapping("/complete/{id}")
    public ResponseEntity<List<NovelDTO>> getAllNovelsById(@PathVariable Long id) {
        List<NovelDTO> novelDTOs = novelService.getAllNovelsById(id);
        if (!novelDTOs.isEmpty()) {
            return ResponseEntity.ok(novelDTOs);
        } else {
            return ResponseEntity.noContent().build();
        }
    }

    //storage novel 에서 '작성중'인 소설의 title, cover_image가져오기
    @GetMapping("/storageNovel/incomplete")
    public ResponseEntity<List<NovelDTO>> getIncompleteNovels(@RequestParam("memberId") Long memberId) {
        List<NovelDTO> novelDTOs = novelService.getIncompleteNovelsByMemberId(memberId);
        return ResponseEntity.ok(novelDTOs);
    }
    //storage novel 에서 '작성완료'인 소설의 title, cover_image가져오기
    @GetMapping("/storageNovel/complete")
    public ResponseEntity<List<NovelDTO>> getCompleteNovels(@RequestParam("memberId") Long memberId) {
        List<NovelDTO> novelDTOs = novelService.getCompleteNovelsByMemberId(memberId);
        return ResponseEntity.ok(novelDTOs);
    }

    /** [novel id와 일치하는 데이터 덮어 씌우기]
     * writeNovelPage.js 에서 '책 표지 -> 등록' 버튼 눌렀을 때
     * title, cover_image, titleX, titleY 정보 덮어씌우기
     */
    @PostMapping("/replace")
    public ResponseEntity<String> replaceContents(@RequestParam("novelId") Long novelId,
                                                  @RequestParam("title") String title,
                                                  @RequestParam(value = "coverImage", required = false) MultipartFile coverImage,
                                                  @RequestParam("titleX") int titleX,
                                                  @RequestParam("titleY") int titleY,
                                                  @RequestParam("titleSize") int titleSize) {
        try {
            //파일이 존재하면 byte[] 로 변환, 비었다면 null 반환
            byte[] coverImageBytes = coverImage != null ? coverImage.getBytes() : null;
            novelService.replaceNovel(novelId, title, coverImageBytes, titleX, titleY, titleSize);
            return ResponseEntity.ok("Novel replaced successfully");
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error replacing novel: " + e.getMessage());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

    /**[novel status => inComplete로 update]
     * writeNovelPage.js 에서 '책 완성 ' 버튼 눌렀을 때
     */
    @PostMapping("/updateStatus/inComplete")
    public ResponseEntity<String> replaceInContents(@RequestParam("novelId") Long novelId,
                                                  @RequestParam("status") NovelStatus status) {
        try{
            novelService.updateStatus(novelId, status);
            return ResponseEntity.ok("Novel replaced successfully");
        }
        catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }

    }

    /**[novel status => complete로 update]
     * writeNovelPage.js 에서 '책 완성 ' 버튼 눌렀을 때
     */
    @PostMapping("/updateStatus")
    public ResponseEntity<String> replaceContents(@RequestParam("novelId") Long novelId,
                                                  @RequestParam("status") NovelStatus status) {
        try{
            novelService.updateStatus(novelId, status);
            return ResponseEntity.ok("Novel replaced successfully");
        }
        catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }

    }

    /**
     * storageNovel.js에서 novel db가져올때
     * status가 TEMPORARY인것 삭제
     */
    @DeleteMapping("/deleteTemporary")
    public ResponseEntity<String> deleteTemporaryNovels(@RequestParam("memberId") Long memberId) {
        novelService.deleteTemporaryNovelsByMemberId(memberId);
        return ResponseEntity.ok("Temporary novels deleted successfully");
    }
}