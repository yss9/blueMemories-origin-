package com.spring.container.spring.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class ExchangeDiaryContent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pageNo;

    private Long diaryNo;

    private Long sender;

    private Long receiver;

    private String content;
    private String image;


    private LocalDateTime writeDate;
    private LocalDateTime updateDate;


    private String sentiment;

}
