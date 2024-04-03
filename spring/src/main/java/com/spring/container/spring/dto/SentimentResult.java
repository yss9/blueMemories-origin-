package com.spring.container.spring.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SentimentResult {

    private Document document;

    @Getter
    @Setter
    public static class Document{
        private String sentiment;
        private Confidence confidence;
    }

    @Getter
    @Setter
    public static class Confidence{
        private double negative;
        private double positive;
        private double neutral;
    }

}
