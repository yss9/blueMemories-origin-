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
public class CustomerInquiry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long inquiryNo;

    @Column(nullable = false, length=20)
    private String title;

    @Column(nullable = false, length=20)
    private String content;

    @Column(nullable = false, length=20)
    private LocalDateTime writeDate;

    @Column(nullable = false, length=20)
    private String comment;

    @Column(nullable = false, length=20)
    private Boolean commentState;


}
