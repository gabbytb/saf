import { useEffect, useState } from 'react';
import { Editor, } from '@tinymce/tinymce-react';
import { useNavigate } from 'react-router-dom';
import api from "../../api";










const NewBlogPost = ({ userId, firstName, lastName, userEmail, displayImg, userBio, userRoles, logOut }) => {


    const navigate = useNavigate();
    function goBack() {    
        for (var i = 0; i < userRoles?.length; i++) {
            if (userRoles[i]?.role === "ROLE_USERS") {
                logOut();                            
            } else if (userRoles[i]?.role === "ROLE_STAFF") {
                navigate("/admin/blog/manage");
                window.scrollBy({ left: 0, top: 0, behavior: 'smooth' });                 
            } else if (userRoles[i]?.role === "ROLE_EDITOR") {
                navigate("/admin/blog/manage");
                window.scrollBy({ left: 0, top: 0, behavior: 'smooth' });                 
            } else {
                navigate("/admin/blog/manage");
                window.scrollBy({ left: 0, top: 0, behavior: 'smooth' });
            };
        };       
    };


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
    // const [attachingUser, setAttachingUser] = useState({ 
    //     _id: userId, 
    //     img: displayImg, 
    //     name: firstName + ' ' + lastName, 
    //     email: userEmail, 
    //     bio: userBio,
    // });
    const [post, setPost] = useState({
        // _id: null, // Assuming you'll set this when fetching or creating a post        
        title: '',
        description: ' ',
        excerpt: '',
        images: [
            { url: '', alt: '', featured: true },  // The first image is featured
            { url: '', alt: '', featured: false }  // The second image is not featured
        ],  // Initialize with one image
        author: [
            { _id: userId, img: displayImg, name: firstName + ' ' + lastName, email: userEmail, bio: userBio },
        ],
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
  




    // Handle changes to all Post data
    const handlePostData = (e) => {
        const { name, type, checked, } = e.target;    
        const value = type === 'checkbox' ? !checked : e.target.value;

        setPost({
            ...post,
            [name]: value
       });
    };

    // Handle changes to Post Image data
    const handleImageChange = (index, e) => {
        const { name, value, type, checked } = e.target;

        const newImages = [...post.images];
        
        // If we change the "featured" checkbox, make sure only one image is featured
        if (name === 'featured' && checked) {
            // Unset the featured flag for all images first
            newImages.forEach(image => image.featured = false);
        };

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
            ],
        });    
    };
 
    // Remove image input
    const removeImageInput = (index) => {
        setPost({
            ...post,
            images: post.images.filter((_, i) => i !== index),
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
            author: [post.author],
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
                window.scrollTo({ left: 0, top: 2000, behavior: 'smooth', });

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



    // SET FEATURED IMAGE TITLE
    useEffect(() => {
        function autoInitiate() {
            var pImg = document.querySelectorAll(".post_img");
            for (var n = 0; n < pImg?.length; n++) {
                if (n === 0) {
                   pImg[n].innerHTML='Featured Image: '; 
                };
            };   
        };
        autoInitiate();
    }, []);





    return (
        <div id="createArticle" className="relative flex flex-col min-w-0 break-words xs:w-full lg:w-781 mb-16 shadow-lg rounded-lg bg-blueGray-100 border-0">
            <div>

                {/* <div className={`activeDisplay ${activeForm === 'update-form' ? 'block' : 'hidden'}`}> */}
                <div className="rounded-t bg-white mb-0 p-6">
                    <div className="text-center flex justify-start items-center gap-6">           
                        <button onClick={goBack}
                            className="bg-blue-500 text-white active:bg-lightBlue-500 font-bold uppercase text-xl tracking-tightener px-7 py-3 rounded-lg shadow hover:bg-blue-600 hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-300"
                            type="button">
                            <span className="flex items-center gap-2">
                                {String.fromCharCode(8592)}
                                <p className="text-lg text-white">Back</p>
                            </span> 
                        </button>


                        <h6 className="text-blueGray-700 text-42xl tracking-tightener font-bold capitalize">Create Article</h6>
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
                                        className="flex flex-col uppercase text-blueGray-600 text-lg tracking-tightener font-bold mb-2"
                                        htmlFor="title">
                                        Post Title
                                    
                                        <input
                                            type="text"
                                            className="border-0 px-3 py-3 mt-3 mb-6 placeholder-blueGray-600 text-black bg-white rounded text-xl tracking-verytight font-bold shadow hover:bg-white focus:bg-white focus:outline-none focus:ring w-full ease-linear transition-all duration-150"                                                                                         
                                            id="title"  
                                            name="title"                                                                              
                                            placeholder=""
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
                                        className="flex flex-col uppercase text-blueGray-600 text-lg tracking-tightener font-bold mb-2"
                                        htmlFor="uri">
                                        Link URL 
                                    
                                        <input
                                            type="text"
                                            className="border-0 px-3 py-3 mt-3 mb-6 placeholder-blueGray-600 text-black bg-white rounded text-xl tracking-verytight font-medium shadow hover:bg-white focus:bg-white focus:outline-none focus:ring w-full ease-linear transition-all duration-150"                                                                                         
                                            placeholder=""   
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
                                <div className="relative w-full mb-9">                                    
                                    <label
                                        className="flex flex-col uppercase text-blueGray-600 text-lg tracking-tightener font-bold gap-3"
                                        htmlFor="description">                                       
                                        Description
                                                
                                        <Editor
                                            apiKey='b68jaid3qmtd8i45pcq2e32l0m0lxo2lt1kpnp4xv97kgppi'                                                                            
                                            // id="description" 
                                            name="description"
                                            init={{                                                                                             
                                                height: 300,
                                                // menubar: true,
                                                // language: editorLanguage,
                                                branding: false,
                                                plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount,paste',
                                                toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',                                                
                                                selector: "textarea",                    
                                                // plugins: [
                                                //    "autolink lists link image anchor",
                                                //    "searchreplace visualblocks",
                                                //    "insertdatetime media contextmenu paste"
                                                // ],
                                                 // plugins: [
                                                //    "autolink lists link image anchor",
                                                //    "searchreplace visualblocks",
                                                //    "insertdatetime media contextmenu paste"
                                                // ],
                                                menu: {
                                                    edit: { title: 'Edit', items: 'undo redo | cut copy paste | selectall' },
                                                    insert: { title: 'Insert', items: 'link image' },
                                                    view: { title: 'View', items: 'visualaid' },
                                                    format: { title: 'Format', items: 'bold italic underline strikethrough superscript subscript | formats | removeformat' }
                                                },
                                                convert_urls: false,
                                                paste_data_images: true
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
                                        className="flex flex-col uppercase text-blueGray-600 text-lg tracking-tightener font-bold mb-4"
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

                            {/* Post Images: Dynamic image inputs */}
                            <div id="postImgID" className="w-full lg:w-12/12 px-4 image_wrap">                   
                                {
                                    post.images.map((image, index) => (
                                        <div key={index} className="relative w-full mb-3">                                                                              
                                            <div className='flex w-full justify-start gap-4'>
                                                <div>
                                                    <label className="flex flex-col uppercase text-blueGray-600 text-lg tracking-tightener font-bold mb-3 post_img" htmlFor="url">
                                                        Image URL:   
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="url"
                                                        value={image.url}
                                                        className="border-0 px-3 py-3 mt-0 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-xl tracking-verytight font-bold shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 mb-3.5"
                                                        onChange={(e) => handleImageChange(index, e)}
                                                    />                                                   
                                                    <button onClick={() => removeImageInput(index)}>Remove</button>
                                                </div>
                                            </div>                                                                                   
                                               
                                               
                                            
                                            <div className='flex w-full justify-start gap-4'>
                                                <div>
                                                    <label className="flex flex-col capitalize text-blueGray-600 text-lg tracking-tightener font-bold mb-1" htmlFor="alt">
                                                        ALT TEXT (For SEO purpose):
                                                    </label>  
                                                    <input
                                                        type="text"
                                                        name="alt"
                                                        value={image.alt}
                                                        className="border-0 px-3 py-3 mt-0 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-lg tracking-verytight font-bold shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 mb-6 h-11"
                                                        onChange={(e) => handleImageChange(index, e)}
                                                    />                                                    
                                                </div>
                                                
                                            </div>
                                        </div>
                                    ))
                                }
                                
                                <button type="button" onClick={addImageInput}>
                                    Add Another Image
                                </button>                                
                            </div>

                        </div>

                        <hr className="mt-6 border-b-1 border-blueGray-300" />

                        <h6 className="text-slate-700 text-xl tracking-verytight mt-10 mb-8 px-4 font-bold uppercase">
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
                                            className="border-0 px-3 py-3 mt-0 mb-6 placeholder-gray-600 text-blueGray-600 bg-white rounded text-xl font-semibold shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"                                                
                                            id="tags"
                                            name="tags"
                                            placeholder="Enter Tags (comma separated)"
                                            onChange={(e) => updateTags(e.target.value.split(',').map(item => item.trim()))}                                                                          
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
                                            className="border-0 px-3 py-3 mt-0 mb-6 placeholder-gray-600 text-blueGray-600 bg-white rounded text-xl font-semibold shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"                                        
                                            id="categories"
                                            name="categories"
                                            placeholder="Categories (comma separated)"
                                            onChange={(e) => updateCategories(e.target.value.split(',').map(item => item.trim()))}                                                                                  
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
                            <div className="text-center flex justify-start">
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
