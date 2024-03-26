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

    @Column(nullable = false, length = 300)
    private String content;

    private String image1;
    private String image2;

    private LocalDateTime writeDate;
    private LocalDateTime updateDate;

    @Column(length = 20)
    private String toDo1;

    @Column(length = 20)
    private String toDo2;

    @Column(length = 20)
    private String toDo3;

    @Column(length = 20)
    private String toDo4;

    @Column(length = 20)
    private String toDo5;

    @Column(length = 100)
    private String memo;

    private String sentiment;

}
