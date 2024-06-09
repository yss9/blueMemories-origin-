package com.spring.container.spring.controllers;

import com.spring.container.spring.domain.DiaryApplicationList;
import com.spring.container.spring.domain.ExchangeDiary;
import com.spring.container.spring.service.ExchangeDiaryRequestService;
import com.spring.container.spring.service.MemberServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class RequestExchangeDiaryController {

    @Autowired
    private MemberServiceImpl memberService;

    @Autowired
    private ExchangeDiaryRequestService exchangeDiaryRequestService;

    @GetMapping("/search-member")
    public String SearchMember(@RequestParam String memberId){
        return memberService.findNicknameByMemberId(memberId);
    }

    @PostMapping("/request-exDiary") // 친구 신청
    public DiaryApplicationList RequestExDiary(@RequestBody DiaryApplicationList diaryApplicationList){
        return exchangeDiaryRequestService.RequestExDiary(diaryApplicationList);
    }

    @GetMapping("/requestList") // 친구 신청 확인
    public List<DiaryApplicationList> ExApplicationList(){
        String receiver = "asd123";
        return exchangeDiaryRequestService.RequestApplicationList(receiver);
    }

    @GetMapping("/findAll")
    public List<DiaryApplicationList> RequestAllList(){
        return exchangeDiaryRequestService.AllRequestList();
    }

    @PostMapping("/request-accepted/{id}")
    public ExchangeDiary AcceptRequest(@PathVariable Long id){
        DiaryApplicationList diaryApplicationList = exchangeDiaryRequestService.DeleteApplication(id);
        return exchangeDiaryRequestService.InsertExchangeDiary(diaryApplicationList);

    }

    @PostMapping("/request-unaccepted/{id}")
    public void UnAcceptedRequest(@PathVariable Long id){
        exchangeDiaryRequestService.DeleteApplication(id);
    }

}
