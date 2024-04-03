import React, { useState } from 'react';
import axios from 'axios';

function GeneralDiaryForm() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [response, setResponse] = useState('');

    const handleDiaryCreate = () => {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        if (image1) formData.append('image1', image1);
        if (image2) formData.append('image2', image2);

        axios.post('http://localhost:8080/api/{id}/posting', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(res => {
                setResponse(res.data);
                console.log(response);
            })
            .catch(error => {
                console.error('Error during diary creation:', error);
            });
    };

    return (
        <div>
            {/* Title */}
            <div>
                <label>Title</label>
                <textarea value={title} onChange={(e) => setTitle(e.target.value)}></textarea>
            </div>

            {/* Content */}
            <div>
                <label>Content</label>
                <textarea value={content} onChange={(e) => setContent(e.target.value)}></textarea>
            </div>

            {/* Images */}
            <div>
                <label>Image 1</label>
                <input type="file" onChange={(e) => setImage1(e.target.files[0])}/>
            </div>
            <div>
                <label>Image 2</label>
                <input type="file" onChange={(e) => setImage2(e.target.files[0])}/>
            </div>


            {/* Submit button */}
            <div>
                <button onClick={handleDiaryCreate}>Submit Diary</button>
            </div>
        </div>
    );
}

export default GeneralDiaryForm;
