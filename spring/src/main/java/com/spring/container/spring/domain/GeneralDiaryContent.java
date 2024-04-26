package com.spring.container.spring.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class GeneralDiaryContent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    private String year;
    private String month;
    private String day;

    private String title;
    private String weather;

    @Column(nullable = false, length = 300)
    private String content;

    private String image1;

    private String sentiment;

    private Double confidenceNegative;
    private Double confidencePositive;
    private Double confidenceNeutral;
}
