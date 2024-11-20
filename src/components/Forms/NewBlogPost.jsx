import { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import api from "../../api";






const NewBlogPost = () => {


    // console.clear();

    // localStorage.clear();





    // ******************************************************** //
    // ** MANAGE STATE OF:- Form Message and Form Submitted *** //
    // ******************************************************** //
    const [formMessage, setFormMessage] = useState(null);
    // console.log("Create Attempt: ", formMessage);
    
    // eslint-disable-next-line
    const [formSubmitted, setFormSubmitted] = useState(false);
    // console.log("Created Successful: ", formSubmitted);
    
 




    // ********************************* //
    // *** PAYLOAD FOR NEW BLOG POST *** //
    // ********************************* //    
    const [post, setPost] = useState({
        // _id: null, // Assuming you'll set this when fetching or creating a post        
        title: '',
        description: ' ',
        excerpt: '',
        images: [
            { id: 99, url: '', alt: '', featured: false }
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
    console.log("*** NEW BLOG POST ***\nBlog Post: ", post);
    // ********************************* //
    // *** PAYLOAD FOR NEW BLOG POST *** //
    // ********************************* //
  




    // Handle changes to post data
    const handlePostData = (e) => {
        const { name, type, checked, } = e.target;    
        const value = type === 'checkbox' ? !checked : e.target.value;

        setPost({
            ...post,
            [name]: value
       });
    };

    // Handle changes to image data
    const handleImageChange = (index, e) => {
        const { name, value, type, checked } = e.target;

        const newImages = [...post.images];
        
        newImages[index] = {
            ...newImages[index],
            [name]: type === 'checkbox' ? checked : value
        };

        setPost({
            ...post,
            images: newImages
        });
    };

    // Add another image input
    const addImageInput = async () => {
        
        setPost({
            ...post,           
            images: [
                ...post.images,
                { url: '', alt: '', featured: false }
            ]
        });
    };

    // Function to update post description
    const updateDescription = (content) => {   
        setPost((prevPost) => ({
            ...prevPost,
            description: content,
        }));
    };

    // Function to update post tags
    const updateTags = (newTags) => {
        setPost((prevPost) => ({
            ...prevPost,
            tags: newTags,
        }));
    };

    // Function to update post categories
    const updateCategories = (newCategories) => {
        setPost((prevPost) => ({
            ...prevPost,
            categories: newCategories,
        }));
    };

     


    // Function to format url appropriately
    const formatUrl = (uri) => {
        return uri.replace(/[^A-Z0-9]+/ig, "-");
    };



    // Function to handle form submission
    const handlePostFormSubmission = async (e) => {  
        
        e.preventDefault();         

        var payload = {
            images: post.images,
            title: post.title,
            description: post.description,
            excerpt: post.excerpt,
            uri: post.uri === '' ? formatUrl(post.title.toLowerCase()) : formatUrl(post.uri.toLowerCase()),
            // author: {
            //     img: '',
            //     name: '',
            //     bio: '',
            // }
            isPublished: post.isPublished,
            status: post.status,
            tags: post.tags,
            categories: post.categories, 
        };
 
        await api.post('/api/v1/admin/blogs/manage/create', payload) // Update the URL to your API endpoint
        .then((response) => {
            const { success, message, data } = response.data;
            var errMsg = document.querySelector('#newPostFormID .create_error'); 
            var successMsg = document.querySelector('#newPostFormID .create_success');
        
            if (!success || message === "Post title missing") {

                // Scroll to Top
                window.scrollTo({ left: 0, top: 0, behavior: 'smooth', });

                // Perform These Actions
                setFormSubmitted(success);
                setFormMessage(message);
                               
                errMsg?.classList.remove('create_error');
                errMsg?.classList.add('error-message-info');
            
                setTimeout(() => {
                    errMsg?.classList.remove('error-message-info');
                    errMsg?.classList.add('create_error');
                }, 3000);
                // Perform These Actions

            } else if (!success || message === "Post Exists") {

                // Scroll to Top
                window.scrollTo({ left: 0, top: 0, behavior: 'smooth', });

                // Perform These Actions
                setFormSubmitted(success);
                setFormMessage(message);
                               
                errMsg?.classList.remove('create_error');
                errMsg?.classList.add('error-message-info');
            
                setTimeout(() => {
                    errMsg?.classList.remove('error-message-info');
                    errMsg?.classList.add('create_error');
                }, 3000);
                // Perform These Actions

            } else {
                // Log the response
                console.log('Post created successfully:', data);
    
                // console.log("Success: ", success);
                // console.log("Data: ", data);
                // console.log("Message: ", message);
                setFormSubmitted(success);
                setFormMessage(message);

                // RESET FORM AFTER SUBMISSION
                document.getElementById("newPostFormID").reset();
                   
                successMsg.classList.remove('create_success');
                successMsg.classList.add('success-message-info'); 
                                    
                // Scroll to Bottom
                window.scrollTo({ left: 0, top: 1200, behavior: 'smooth', });

                setTimeout(() => {
                    successMsg.classList.remove('success-message-info');
                    successMsg.classList.add('create_success');            
                }, 3500);
                // Perform These Actions

                setTimeout(() => {
                    window.scrollTo({ left: 0, top: 0, behavior: 'smooth', });
                }, 3900);
                // Perform These Actions

            };
        }) 
        .catch ((error) => {
            console.error('Error saving post:', error);
        });
    };













    return (
        <div id="createArticle" className="relative flex flex-col min-w-0 break-words w-full mb-16 shadow-lg rounded-lg bg-blueGray-100 border-0">
            <div>

                {/* <div className={`activeDisplay ${activeForm === 'update-form' ? 'block' : 'hidden'}`}> */}
                <div className="rounded-t bg-white mb-0 p-6">
                    <div className="text-center flex justify-between items-center">
                        <h6 className="text-blueGray-700 text-42xl tracking-tightener font-bold capitalize">Create New Post</h6>                          
                        {/* <button onClick={showUserInfo}
                            className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-lg tracking-tightener px-8 py-2 rounded-lg shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                            type="button"> Back
                        </button> */}
                    </div>
                </div>


                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    {/* FORM FOR UPDATING USER DATA */}

                    <form id="newPostFormID" onSubmit={handlePostFormSubmission}>
                      
                        {/* Error Message */}
                        <div className="mx-auto mt-8 mb-6 create_error">
                            {formMessage}
                        </div>
                        {/* Error Message */}

                      
                        <h6 className="text-gray-500 text-2xl mt-12 mb-12 font-black uppercase px-4">
                            {/* Create New Post */}
                        </h6>
                        <div className="flex flex-wrap">                                                                          

                            {/* Post Title */}
                            <div className="w-full lg:w-12/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="flex flex-col uppercase text-blueGray-600 text-lg font-extrabold tracking-moretight mb-2"
                                        htmlFor="title">
                                        Post Title
                                    
                                        <input
                                            type="text"
                                            className="border-0 px-3 py-3 mt-3 mb-6 placeholder-gray-600 text-blueGray-600 bg-white rounded text-sm shadow hover:bg-white focus:bg-white focus:outline-none focus:ring w-full ease-linear transition-all duration-150"                                                                                         
                                            id="title"  
                                            name="title"                                                                              
                                            placeholder="Post Title"
                                            // value={post.title}
                                            onChange={handlePostData}                                                                                                                                                
                                        />
                                    </label>
                                </div>
                            </div>

                            {/* Post URL */}
                            <div className="w-full lg:w-12/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="flex flex-col uppercase text-blueGray-600 text-lg font-extrabold tracking-moretight mb-2"
                                        htmlFor="uri">
                                        URL 
                                    
                                        <input
                                            type="text"
                                            className="border-0 px-3 py-3 mt-3 mb-6 placeholder-gray-600 text-blueGray-600 bg-white rounded text-sm shadow hover:bg-white focus:bg-white focus:outline-none focus:ring w-full ease-linear transition-all duration-150"                                                                                         
                                            placeholder="Article Slug"   
                                            id="uri"   
                                            name="uri"   
                                            value={post.uri === '' ? formatUrl(post.title.toLowerCase()) : formatUrl(post.uri.toLowerCase())}                                      
                                            onChange={handlePostData}                                           
                                        />
                                    </label>
                                </div>
                            </div>

                            {/* Post Description */}
                            <div className="w-full lg:w-12/12 px-4">
                                <div className="relative w-full mb-3">                                    
                                    <label
                                        className="flex flex-col uppercase text-blueGray-600 text-lg font-extrabold tracking-moretight mb-2"
                                        htmlFor="description">                                       
                                        Description
                                                
                                        <Editor
                                            apiKey='b68jaid3qmtd8i45pcq2e32l0m0lxo2lt1kpnp4xv97kgppi'                                                                            
                                            // id="description" 
                                            name="description"
                                            init={{                                                                                             
                                                height: 300,
                                                // menubar: true,
                                                branding: false,
                                                plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
                                                toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
                                                // plugins: [
                                                  // Core editing features
                                                  // 'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
                                                  // Your account includes a free trial of TinyMCE premium features
                                                  // Try the most popular premium features until Oct 20, 2024:
                                                  // 'checklist', 'mediaembed', 'casechange', 'export', 'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste', 'advtable', 'advcode', 'editimage', 'advtemplate', 'ai', 'mentions', 'tinycomments', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss', 'markdown',
                                                // ],
                                                // toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                                                // toolbar: 'undo redo | styleselect | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | link image',
                                                // tinycomments_mode: 'embedded',
                                                // tinycomments_author: 'Author name',
                                                // mergetags_list: [
                                                //  { value: 'First.Name', title: 'First Name' },
                                                //  { value: 'Email', title: 'Email' },
                                                // ],
                                                // ai_request: (request, respondWith) => respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),
                                            }}           
                                            initialValue=""                        
                                            onEditorChange={updateDescription}
                                            id='description'                                                                                                                                                       
                                            className='description'                                            
                                        />
                                    </label>
                                </div>
                            </div>

                            {/* Post Excerpt */}
                            <div className="w-full lg:w-12/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="flex flex-col uppercase text-black text-lg font-extrabold tracking-moretight mb-2"
                                        htmlFor="excerpt">
                                        Excerpt

                                        <textarea
                                            type="text"
                                            className="border-0 px-6 py-6 mt-3 mb-6 placeholder-gray-600 text-black bg-white rounded text-xl font-medium shadow hover:bg-white focus:bg-white focus:outline-none focus:ring w-full ease-linear transition-all duration-150"                                                
                                            id="excerpt"
                                            name="excerpt"                                                             
                                            // placeholder="Post excerpt"
                                            // value={post.excerpt}
                                            onChange={handlePostData}                                              
                                            rows="3">
                                        </textarea>
                                    </label>
                                </div>
                            </div>

                            {/* Featured Image */}
                            <div className="w-full lg:w-12/12 px-4">
                                {
                                    post.images.map((image, index) => (
                                        <div key={index} className="relative w-full mb-3">                                               
                                            <label className="flex flex-col uppercase text-blueGray-600 text-lg font-extrabold tracking-moretight mb-2" htmlFor="url">Featured Image:
                                                <input
                                                    type="text"
                                                    name="url"
                                                    value={image.url}
                                                    onChange={(e) => handleImageChange(index, e)}
                                                />
                                            </label>
                                               
                                            
                                            <label className="flex flex-col uppercase text-blueGray-600 text-lg font-extrabold tracking-moretight mb-2" htmlFor="alt">Alt Text:
                                                <input
                                                    type="text"
                                                    name="alt"
                                                    value={image.alt}
                                                    onChange={(e) => handleImageChange(index, e)}
                                                />
                                            </label>
                                              
   
                                            <label className="flex flex-col uppercase text-blueGray-600 text-lg font-extrabold tracking-moretight mb-2" htmlFor="featured">
                                                <input                                                  
                                                    // className="hidden"                                                    
                                                    type="checkbox"
                                                    name="featured"                                                        
                                                    checked
                                                    onChange={(e) => handleImageChange(index, e)}
                                                />
                                            </label>                                               
                                        </div>
                                    ))
                                }
                            </div>

                            {/* Post Images: Dynamic image inputs */}
                            <div className="w-full lg:w-12/12 px-4">                   
                                {
                                    post.images.map((image, index) => (
                                        <div key={index} className="relative w-full mb-3"> 
                                            <label className="flex flex-col uppercase text-blueGray-600 text-lg font-extrabold tracking-moretight mb-2" htmlFor="url">Image URL:
                                                <input
                                                    type="text"
                                                    name="url"
                                                    value={image.url}
                                                    onChange={(e) => handleImageChange(index, e)}
                                                />
                                            </label>
                                               
                                            
                                            <label className="flex flex-col uppercase text-blueGray-600 text-lg font-extrabold tracking-moretight mb-2" htmlFor="alt">Alt Text:
                                                <input
                                                    type="text"
                                                    name="alt"
                                                    value={image.alt}
                                                    onChange={(e) => handleImageChange(index, e)}
                                                />
                                            </label>
                                              
   
                                            <label className="flex flex-col uppercase text-blueGray-600 text-lg font-extrabold tracking-moretight mb-2" htmlFor="img">
                                                <input
                                                    // className="hidden"
                                                    type="checkbox"
                                                    name="featured"                                                        
                                                    checked={image.featured}
                                                    onChange={(e) => handleImageChange(index, e)}
                                                />
                                            </label>                                               
                                        </div>
                                    ))
                                }
                                <button type="button" onClick={addImageInput}>
                                    Add Another Image
                                </button>
                            </div>

                        </div>

                        <hr className="mt-6 border-b-1 border-blueGray-300" />

                        <h6 className="text-slate-700 text-xl mt-10 mb-8 px-4 font-bold uppercase">
                            Post Attributes
                        </h6>
                        <div className="flex flex-wrap">

                            {/* TAGS AND CATEGORIES WRAPPER */}
                            <div className="w-full lg:w-12/12 px-4 flex gap-8">

                                {/* TAGS */}
                                <div className="relative w-3/6 mb-3">
                                    <label
                                        className="flex flex-col uppercase text-blueGray-600 text-lg font-extrabold tracking-moretight mb-2"
                                        htmlFor="tags">
                                        Tags

                                        <input
                                            type="text"
                                            className="border-0 px-3 py-3 mt-0 mb-6 placeholder-gray-600 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"                                                
                                            id="tags"
                                            name="tags"
                                            placeholder="Enter Tags (comma separated)"
                                            onChange={(e) => updateTags(e.target.value.split(','))}                                                                           
                                        />
                                    </label>
                                </div>

                                {/* CATEGORIES */}
                                <div className="relative w-3/6 mb-3">
                                    <label
                                        className="flex flex-col uppercase text-blueGray-600 text-lg font-extrabold tracking-moretight mb-2"
                                        htmlFor="categories">
                                        Categories
                                    
                                        <input
                                            type="text"
                                            className="border-0 px-3 py-3 mt-0 mb-6 placeholder-gray-600 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"                                        
                                            id="categories"
                                            name="categories"
                                            placeholder="Categories (comma separated)"
                                            onChange={(e) => updateCategories(e.target.value.split(','))}                                                                                  
                                        />
                                    </label>
                                </div>
                                
                            </div>

                        </div>    
                        <div className="flex flex-wrap">                           
             
                             {/* IS PUBLISHED */}               
                            <div className="relative mb-3 px-4">
                                <label
                                        className="flex flex-row gap-3 items-end uppercase text-blueGray-600 text-lg font-extrabold tracking-moretight mb-2"
                                        htmlFor="isPublished">

                                        <input
                                            type="checkbox"
                                            className="border-0 px-3 py-3 mt-0 placeholder-gray-600 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-8 h-8 ease-linear transition-all duration-150"                                        
                                            id="isPublished"    
                                            name="isPublished"                                                                                  
                                            onChange={handlePostData}                                                                                  
                                        /> Save as Draft

                                </label>                                                                                      
                            </div>

                        </div>    
                    
                        {/* SUBMIT BUTTON */}
                        <div className="rounded-t px-6 mt-4 mb-4">
                            <div className="text-center flex justify-end">
                                <button type="submit"                           
                                    className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-semibold uppercase text-lg tracking-verytight px-8 py-4 rounded-xl shadow hover:bg-blue-600 hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                > Submit</button>
                            </div>
                        </div>
                        {/* SUBMIT BUTTON */}   

                        {/* Success Message */}
                        <div className="mx-auto flex justify-center w-2/4">
                            <div className="create_success">
                                {formMessage}
                            </div>                           
                        </div>
                        {/* Success Message */}
                    </form>          
                </div>                   
                {/* </div>   */}

            </div>
        </div>
    );
};

export default NewBlogPost;
