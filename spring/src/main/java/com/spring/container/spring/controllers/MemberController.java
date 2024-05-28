package com.spring.container.spring.controllers;

import com.spring.container.spring.domain.Member;
import com.spring.container.spring.dto.LoginRequest;
import com.spring.container.spring.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import java.util.Collections;
import java.util.Optional;

@RestController //RESTful 웹 서비스의 컨트롤러로 동작 (@Controller + @ResponseBody)
public class MemberController {

    @Autowired
    private MemberService memberService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        //사용자가 로그인 요청 시 제공한 아이디를 가진 객체를 member에서 조회 후 존재한다면 그 객체 반환
        Optional<Member> member = memberService.findByMemberId(loginRequest.getMemberId());
        //member.isPresent(): 객체 member에 값이 포함되어 있는지 확인
        //member.get().getPassword().equals(loginRequest.getPassword())
        //: 실제 member객제의 비밀번호와 사용자가 로그인 요청 시 제공한 비밀번호가 같은지 비교
        if (member.isPresent() && member.get().getPassword().equals(loginRequest.getPassword())) {
            // 로그인 성공 시, 사용자 정보를 포함하여 응답 반환
            Member loggedInMember = member.get();
            return ResponseEntity.ok(loggedInMember);
            // JSON 객체로 성공 메시지 반환
//            return ResponseEntity.ok(Collections.singletonMap("message", "Login successful"));
        } else {
            // JSON 객체로 에러 메시지 반환
            return ResponseEntity.badRequest().body(Collections.singletonMap("error", "Invalid member ID or password"));
        }
    }
}