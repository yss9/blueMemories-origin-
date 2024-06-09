package com.spring.container.spring.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Base64;

@Getter
public class BookDTO {
    @Setter
    private Long id;
    @Setter
    private String title;
    @Setter
    private int titleX;
    @Setter
    private int titleY;
    @Setter
    private int titleSize;
    @Setter
    private String status;
    @Setter
    private Long memberId;
    private String coverImage;


    public void setCoverImage(byte[] coverImage) {
        if (coverImage != null) {
            this.coverImage = Base64.getEncoder().encodeToString(coverImage);
        } else {
            this.coverImage = null;
        }
    }

}
