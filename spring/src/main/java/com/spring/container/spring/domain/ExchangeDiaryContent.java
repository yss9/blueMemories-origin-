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
    private Long id;

    @ManyToOne
    @JoinColumn(name="ExchangeDiary_Id")
    private ExchangeDiary exchangeDiary;

    private Long diaryNo;
    private String writer;

    private String year;
    private String month;
    private String day;

    private String title;
    private String weather;

    @Column(nullable = false, length = 30000)
    private String content;

    private String image1;

    private String sentiment;

    private Double confidenceNegative;
    private Double confidencePositive;
    private Double confidenceNeutral;


}
