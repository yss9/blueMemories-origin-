import axios from 'axios';

export const translatePrompt = async (prompt) => {
    try {
        const response = await axios.post(
            'http://localhost:8080/api/translate', // 번역 엔드포인트
            { prompt}
        );
        return response.data.translatedText; // 응답 형식에 따라 수정 필요
    } catch (error) {
        console.error('Error translating prompt:', error);
        throw error;
    }
};

export const loadImageFromBackend = async (prompt,style,aspect_ratio)=>{
    try{
        // 1. 번역된 prompt 얻기
        const translatedPrompt = await translatePrompt(prompt);
        console.log('text prompt: ', prompt);
        console.log('translating prompt: ', translatedPrompt);
        // FormData 객체 생성
        const formData = new FormData();
        formData.append('prompt', translatedPrompt);
        formData.append('style_preset', style);
        formData.append('aspect_ratio', aspect_ratio);

        const response = await axios.post(
            'http://localhost:8080/api/generate-image',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data', // 명시적으로 설정
                },
                // 'Content-Type' 헤더를 설정하지 않음
                responseType: 'arraybuffer', // 이미지를 수신할 때 사용
            }
        );

        const blob = new Blob([response.data], { type: 'image/jpeg' });
        // return URL.createObjectURL(blob); // 생성된 이미지의 URL 반환
        return new File([blob], 'generated-image.jpg', {type: 'image/jpeg'});

    } catch (error) {
        console.error('Error generating image:', error);
        throw error;
    }
};
