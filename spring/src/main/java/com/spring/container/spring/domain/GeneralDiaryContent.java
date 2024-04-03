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
public class GeneralDiaryContent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "generalDiary_id")
    private GeneralDiary generalDiary;

    private Integer pageNo = 1;

    private String title;

    @Column(nullable = false, length = 300)
    private String content;

    private String image1;
    private String image2;

    private LocalDateTime writeDate;
    private LocalDateTime updateDate;

    private String sentiment;

    private Double confidenceNegative;
    private Double confidencePositive;
    private Double confidenceNeutral;
}
