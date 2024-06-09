package com.spring.container.spring.controllers;

import com.spring.container.spring.domain.Book;
import com.spring.container.spring.domain.BookStatus;
import com.spring.container.spring.domain.Novel;
import com.spring.container.spring.domain.NovelStatus;
import com.spring.container.spring.dto.BookDTO;
import com.spring.container.spring.dto.NovelDTO;
import com.spring.container.spring.service.BookService;
import com.spring.container.spring.service.NovelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Base64;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/books")
public class BookController {

    @Autowired
    private BookService bookService;

    /** storageBook에서 새로운 Book 생성할 때 사용
     */
    @PostMapping
    public Book createBook(@RequestBody Book book) {
        return bookService.createBook(book);
    }

    /** 생성되는 책의 사용자 memberId가져올때 사용
     */
    @GetMapping("/member/{memberId}")
    public List<Book> getBooksByMemberId(@PathVariable Long memberId) {
        return bookService.getBooksByMemberId(memberId);
    }

    /** [book id와 일치하는 row 가져오기]
     * writeBookPage.js 에서 '책 완성' 버튼 눌렀을 때
     * book db title, cover_image 가 수정되었는지 확인할 때 사용
     */
    @GetMapping("/complete/{id}")
    public ResponseEntity<List<BookDTO>> getAllBooksById(@PathVariable Long id) {
        List<BookDTO> bookDTOs = bookService.getAllBooksById(id);
        if (!bookDTOs.isEmpty()) {
            return ResponseEntity.ok(bookDTOs);
        } else {
            return ResponseEntity.noContent().build();
        }
    }

    //storage book 에서 '작성중'인 책의 title, cover_image가져오기
    @GetMapping("/storageBook/incomplete")
    public ResponseEntity<List<BookDTO>> getIncompleteBooks(@RequestParam("memberId") Long memberId) {
        List<BookDTO> bookDTOs = bookService.getIncompleteBooksByMemberId(memberId);
        return ResponseEntity.ok(bookDTOs);
    }
    //storage novel 에서 '작성완료'인 소설의 title, cover_image가져오기
    @GetMapping("/storageBook/complete")
    public ResponseEntity<List<BookDTO>> getCompleteBooks(@RequestParam("memberId") Long memberId) {
        List<BookDTO> bookDTOs = bookService.getCompleteBooksByMemberId(memberId);
        return ResponseEntity.ok(bookDTOs);
    }

    /** ['임시 저장', '저장하고 나가기', '책 완성'] - writeBookPage.js
     * 책 표지 데이터 저장 = cover[] 내용을 book 덮어 씌우기
     * @coverImage: base64로 인코딩된 이미지를 받아오기 때문에 Blob으로 변환 필요
     */
    @PostMapping("/updateBookCover")
    public ResponseEntity<String> replaceContents(@RequestParam("bookId") Long bookId,
                                                  @RequestParam("title") String title,
                                                  @RequestParam(value = "coverImage", required = false) String coverImage,
                                                  @RequestParam("titleX") int titleX,
                                                  @RequestParam("titleY") int titleY,
                                                  @RequestParam("titleSize") int titleSize,
                                                  @RequestParam("status") BookStatus status) {
        try {
            //파일이 존재하면 byte[] 로 변환, 비었다면 null 반환
            byte[] coverImageBytes = (coverImage != null && !coverImage.isEmpty()) ? Base64.getDecoder().decode(coverImage) : null;
            bookService.updateBook(bookId, title, coverImageBytes, titleX, titleY, titleSize, status);
            return ResponseEntity.ok("Book replaced successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

    /**
     * storageBook.js에서 book db가져올때
     * status가 TEMPORARY인것 삭제
     */
    @DeleteMapping("/deleteTemporary")
    public ResponseEntity<String> deleteTemporaryBooks(@RequestParam("memberId") Long memberId) {
        bookService.deleteTemporaryBooksByMemberId(memberId);
        return ResponseEntity.ok("Temporary books deleted successfully");
    }

    /** BookCoverOverlay.js에서 초기값 가져올 때 사용
     * [표지 설정]
     */
    @GetMapping("cover/{id}")
    public ResponseEntity<BookDTO> getBookById(@PathVariable Long id) {
        Optional<BookDTO> bookDTO = bookService.getBookById(id);
        return bookDTO.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.noContent().build());
    }
}