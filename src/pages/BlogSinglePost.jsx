import { useEffect, useState, } from "react";
import { Link, useParams, } from "react-router-dom";
import { HomeFooter, NavSlider, } from "../components";
import api from "../api";
import PostDetailsSlider from "../components/Slider/PostDetailsSlider.js";









const convertDate = (dateString) => {
    const date = new Date(dateString);

    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    };

    return date.toLocaleString('en-GB', options);
};






const BlogSinglePost = () => {

    
    const { slug } = useParams();


    // eslint-disable-next-line
    const [isLoading, setIsLoading] = useState(true);
    // console.log("IS LOADING: ", isLoading);


    const [blogSinglePost, setBlogSinglePost] = useState(null);
    // console.log("Single Post: ", blogSinglePost);        

    
    // const formattedTagsTotal = blogSinglePost?.tags;
    // console.log("All Formatted Tags: ", formattedTagsTotal);


    // const formattedTagsLength = blogSinglePost?.tags?.length;
    // console.log("Formatted Tags Length: ", formattedTagsLength);

    
    // If tags exist and are not empty, join them.
    // Otherwise, show a message.
    const formattedTags = blogSinglePost?.tags?.length ? blogSinglePost.tags.join(", ") : "Empty tags";  // Fallback if no tags are present  
    console.log("Formatted Tags: ", formattedTags);

    

    // ************************ //
    // *** FIND POST BY URL *** //
    // ************************ //
    useEffect(() => {
        // const url = slug.replace(/-/g, ' '); // Convert slug back to title    
        window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
                
        const url = slug;
        api.get(`/api/v1/admin/blogs/manage/post/${url}`)
        .then((response) => {
            const { success, data, message } = response.data; 
            if (!success && message === "Post not found") {
                console.log("Success: ", success);
                console.log("Message: ", message);
            };

            // console.log("Success: ", success);
            // console.log("Data: ", data);
            // console.log("Message: ", message);
            setBlogSinglePost(data);

        })
        .catch((error) => {
            console.log("Error fetching data: ", error);
        })
        .finally(() => {
            setIsLoading(false);
        });
    }, [slug]);    
    // ************************ //
    // *** FIND POST BY URL *** //
    // ************************ //


    // *************************** //
    // *** SET PAGE TITLE(SEO) *** //
    // *************************** //
    useEffect(() => {
        if (!blogSinglePost?.title) {
            const pageTitle = "Post not found", 
                  siteTitle = "Samuel Akinola Foundation";
            document.title = `${pageTitle} | ${siteTitle}`;           
        } else {
            const pageTitle = `${blogSinglePost?.title?.toUpperCase()}`, 
                  siteTitle = "Samuel Akinola Foundation";
            document.title = `${pageTitle} | ${siteTitle}`;
        };

        // const uri = new URLSearchParams(window.location.search);
        // const = uri.getItem('');
        // const = uri.getItem('');
        // const = uri.getItem('');
        
    }, [blogSinglePost]);
    // *************************** //
    // *** SET PAGE TITLE(SEO) *** //
    // *************************** //

    




    const [sidebarPosts, setSidebarPosts] = useState([]);
    console.log("Sidebar Post: ", sidebarPosts);
  
    // eslint-disable-next-line
    const [currentPage, setCurrentPage] = useState(1);

    // let leftArrow = '>';

    useEffect(() => {
        async function fetchAllSidebarBlogPosts() {
            const limit = 3; // Number of items per page
            var status = 'published';
            var sort = 'recent';
            
            await api.get(`/api/v1/admin/blogs/manage?page=${currentPage}&limit=${limit}&status=${status}&sort=${sort}`)
            .then((response) => {
                const { success, data, message } = response.data;
                const { allBlogPosts, } = data;
  
                if (!success && message === "No article found") {
                    console.log("Success: ", success);
                    console.log("Message: ", message);
                };
  
                setSidebarPosts(allBlogPosts);                                            
            })
            .catch((error) => {
                console.log("Error fetching data: ", error);
            });
    
        };
        var timerID = setTimeout(fetchAllSidebarBlogPosts, 400);   // Delay execution of findAllStaffs by 1800ms
        return () => {
            clearTimeout(timerID);                  // Clean up timer if component unmounts or token changes
        };
    }, [currentPage]);




    async function updateComments() {

    };








    return (
        <div id="singlePostWrapper">
            <NavSlider />

            <main id="blogSinglePost" className="container mx-auto">                                       
               
                <div className="mx-12 lg:mx-16 mb-28 mt-16 flex sm:grid">                     
                    <div className="mx-auto w-full flex flex-col items-center xs:px-0 sm:px-32">                
                                        
                        <PostDetailsSlider blogSinglePost={blogSinglePost} /> 

                        <div className="w-full sm:mx-24 lg:mx-8 mt-0 lg:grid lg:grid-cols-28 gap-28">                                             

                            <section className="p-0 mb-24">   
                                <div className="max-w-full mx-auto flex flex-col items-center p-0">  
                                        
                                    {/* SINGLE POST PAGE */}           
                                    <div className="block w-full">
                                                    
                                        <div className="self-stretch p-0 mb-0">
                                                    <div className="rounded shadow-md h-full">                                                                                                                                                 
                                                        <div className="px-8 pt-10 pb-20 flex flex-col gap-8">
                                                            <div className="font-semibold text-lg mb-2 border-gray-500 border-b-2 pb-2">
                                                                <p className="text-slate-900 text-14xl/tight sm:text-4xl/tight font-black capitalize">{blogSinglePost?.title}</p>
                                                                <div className="mt-3 pb-1 text-lg/tight sm:text-10xl italic font-bold">{convertDate(blogSinglePost?.createdAt)}</div>
                                                            </div>
                                                            {/* <p class="text-slate-700 mb-1" title="Post Author">{blogSinglePost?.author?.name}</p> */}                                             
                                                            
                                                            
                                                            <div className="rendered-output" dangerouslySetInnerHTML={{ __html: blogSinglePost?.description }} // Render HTML content here
                                                            />

                                                            <div className="pt-0 pb-6 flex flex-col gap-8">
                                                                
                                                                <div className="mt-0 pt-0 pb-6 text-14xl italic font-bold flex flex-col justify-center items-center gap-5">Categorized in
                                                                    <button type="button" className="bg-gray-100 text-slate-700 px-6 py-3.5 rounded-xl border-none outline-none hover:outline-none focus:outline-none hover:border-none focus:border-none">{blogSinglePost?.categories}</button>
                                                                </div>

                                                                <div className="mt-0 pt-0 pb-2 text-14xl font-bold grid grid-cols-32 gap-2 items-baseline">Tagged in: 
                                                                    <Link to={`/blog/tags/${blogSinglePost?.tags.tags}`} className="text-xl items-start border-none outline-none hover:outline-none focus:outline-none hover:border-none focus:border-none">{formattedTags}</Link>
                                                                </div >

                                                                <form onSubmit={updateComments} className="flex flex-col gap-4">
                                                                    <label htmlFor="comments" className="mb-0 text-xl font-medium">Leave a comment
                                                                        <textarea name="comments" id="comments" placeholder="Your comment" className="mt-3 w-full h-52 border-slate-200 rounded-xl shadow-sm p-4">{blogSinglePost?.comments}</textarea>    
                                                                    </label>  

                                                                    <div className="grid grid-cols-2 gap-8">
                                                                        <label htmlFor="firstName" className="mb-0 text-xl font-medium">First Name
                                                                            <input type="text" name="firstName" id="firstName" className="mt-1 rounded-xl" />
                                                                        </label>
                                                                        <label htmlFor="lastName" className="mb-0 text-xl font-medium">Last Name
                                                                            <input type="text" name="lastName" id="lastName" className="mt-1 rounded-xl" />
                                                                        </label>
                                                                    </div>

                                                                    <label htmlFor="email" className="mb-0 text-xl font-medium">E-mail Address
                                                                        <input type="email" name="email" id="email" className="mt-1 rounded-xl" />
                                                                    </label>

                                                                    <div className="flex justify-end">
                                                                        <button type="submit" className="bg-green-400 hover:bg-green-500 focus:bg-green-600 px-8 py-4 text-xl tracking-tightener font-medium text-white rounded-lg">Comment</button>
                                                                    </div>
                                                                </form>                                                        

                                                            </div>                
                                                        </div>
                                                    </div>
                                        </div>

                                    </div>
                                    {/* SINGLE POST PAGE */}    

                                </div>
                            </section>

                            <aside className="">
                                <div className="max-w-full mx-0">                        
                                    <div className="flex flex-wrap mx-auto gap-12 pt-10">                            
                                        <h2 className="text-4xl capitalize font-black pb-2 tracking-tightened border-b-2 border-b-black w-full ">Recent Posts</h2>
                                        {
                                            sidebarPosts?.map((post) => {                
                                                return (                                        
                                                    <div key={post?._id} className="w-full sm:w-1/2 md:w-1/3 self-stretch p-0 mb-6">
                                                        <div className="rounded shadow-md h-full">                                                                                                                              
                                                                    {
                                                                        post?.images.map((item, index) => {
                                                                                if (item?.featured) {
                                                                                    return (    
                                                                                        <Link key={index} to={`/blog/${post?.uri}`}> 
                                                                                            <img className="w-full m-0 rounded-t lazy sm:min-h-44 lg:min-h-44"
                                                                                                src={item?.url}                                                                                 
                                                                                                alt={item?.alt}
                                                                                            />     
                                                                                        </Link>
                                                                                    );
                                                                                }
                                                                        })
                                                                    } 
                                                               
                                                                    <div className="px-6 py-5">
                                                                        <div className="mb-0">
                                                                            <Link 
                                                                                to={`/blog/${post?.uri}`}
                                                                                className="text-slate-900 text-15xl/more-loose font-bold hover:text-slate-700">
                                                                                {post?.title}
                                                                            </Link>
                                                                        </div>
                                                                        <p className="text-slate-700 mb-3.5" title="Published date">{convertDate(post?.createdAt)}</p>
                                                                        <p className="text-slate-800 text-xl/normal">                                                              
                                                                            {post?.excerpt?.substring(0,90)+"..."}
                                                                        </p>
                                                                    </div>
                                                        </div>
                                                    </div>                                        
                                                );
                                            })                                
                                        }                                             
                                    </div>                           
                                </div>
                            </aside>

                        </div>
                    </div>
                </div>

            </main>

            <HomeFooter />
        </div>
    );

};

export default BlogSinglePost;









// <img className="w-full m-0 rounded-t lazy" 
// data-src="/assets/img/small-business.jpg"                                                  
// src={blogSinglePost?.img}                                     
// alt="post cover" 
// />  