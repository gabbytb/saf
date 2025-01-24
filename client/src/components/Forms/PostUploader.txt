import React, { useState } from 'react';
import api from '../../api';







function PostUploader() {
    
    const [postData, setPostData] = useState({
        title: '',
        excerpt: '',
        images: [
            { createdTime: '', id: '', url: '', featured: false }
        ],  // Initialize with one image
        // author: {
        //     img: '',
        //     name: '',
        //     bio: '',
        // },
        uri: '',
        isPublished: true,
        status: '',
        tags: [],
        categories: [],
        // statuses: '',      
    });

    // Handle changes to post data
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPostData({
            ...postData,
            [name]: value
        });
    };

    // Handle changes to image data
    const handleImageChange = (index, e) => {
        const { name, value, type, checked } = e.target;

        const newImages = [...postData.images];
        newImages[index] = {
            ...newImages[index],
            [name]: type === 'checkbox' ? checked : value
        };

        setPostData({
            ...postData,
            images: newImages
        });
    };

    // Add another image input
    const addImageInput = () => {
        setPostData({
            ...postData,           
            images: [
                ...postData.images,
                { createdTime: '', id: '', url: '', featured: false }
            ]
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send the post data, including images, to the backend
            const response = await api.post('/api/posts', postData);

            // Log the response
            console.log('Post created successfully:', response.data);

            alert('Post and images created successfully!');

        } catch (error) {
            console.error('Error creating post and images:', error);
        };
    };





    return (
        <div>
            <h1>Create New Post with Images</h1>

            <form onSubmit={handleSubmit}>

                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={postData.title}
                        onChange={handleChange}
                    />
                </div>




                <div>
                    <label>Description:</label>
                    <textarea
                        name="description"
                        value={postData.description}
                        onChange={handleChange}
                    />
                </div>




                {/* Dynamic image inputs */}
                <div>
                    <h2>Images</h2>
                        {
                            postData.images.map((image, index) => (
                                <div key={index}>                                               
                                    <div>
                                        <label>Image URL:
                                            <input
                                            type="url"
                                            name="url"
                                            value={image.url}
                                            onChange={(e) => handleImageChange(index, e)}
                                            />
                                        </label>
                                    </div>
                                    
                                    
                                    <div>
                                        <label>Image Alt:
                                            <input
                                            type="text"
                                            name="alt"
                                            value={image.alt}
                                            onChange={(e) => handleImageChange(index, e)}
                                            />
                                        </label>
                                    </div>


                                    <div>
                                        <label>Featured:
                                            <input
                                            type="checkbox"
                                            name="featured"
                                            checked={image.featured}
                                            onChange={(e) => handleImageChange(index, e)}
                                            />
                                        </label>
                                    </div>
                                </div>
                            ))
                        }
                    <button type="button" onClick={addImageInput}>
                        Add Another Image
                    </button>
                </div>



                <button type="submit">Submit Post</button>
            </form>
        </div>
    );
};

export default PostUploader;
