import axios from 'axios';

export const loadImageFromBackend = async (prompt,style,aspect_ratio)=>{
    try{
        // FormData 객체 생성
        const formData = new FormData();
        formData.append('prompt', prompt);
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
        return URL.createObjectURL(blob); // 생성된 이미지의 URL 반환

    } catch (error) {
        console.error('Error generating image:', error);
        throw error;
    }
};
