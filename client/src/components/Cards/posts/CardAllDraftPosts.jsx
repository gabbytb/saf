import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { spinner } from "../../../assets/images";
import { TableDropdown } from "../..";
import api from "../../../api";









const convertDate = (dateString) => {
    
    const date = new Date(dateString);
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',        
        hour12: true
    };

    return date.toLocaleString('en-GB', options);
};



const CardAllDraftPosts = ({ color, activeDisplay, search, pageLimit, leftArrow, rightArrow }) => {

        
    // ****************************************************************************
    // MANAGE STATE:-  TO FIND ALL DRAFT POSTS
    // ****************************************************************************
    const [blogDraftPosts, setBlogDraftPosts] = useState([]);
    console.log("ALL DRAFT POSTS: ", blogDraftPosts); 

    // eslint-disable-next-line
    const [totalDraftPosts, setTotalDraftPosts] = useState(null);
    console.log("TOTAL DRAFT BLOG POSTS: ", totalDraftPosts);
    
    const [totalPages, setTotalPages] = useState(0);  
    const [currentPage, setCurrentPage] = useState(1);

    // Number of items per page
    console.log("PAGE LIMIT: ", pageLimit);



    // ****************************************************************************
    // MANAGE STATE:-  SPECIAL FEATURES
    // ****************************************************************************
    const [isLoading, setIsLoading] = useState(true);



  
    useEffect(() => {
        const allDraftPostsLink = document.querySelector("#postsLinkID .draftPosts");
        // console.log("ALL DRAFT POSTS LINK", allPublishedPostsLink);
        if (activeDisplay === "draftPosts") {
            allDraftPostsLink?.classList.add("activePostView");

            setIsLoading(true);
            
            // ****************************************************************************
            // CALL TO API:-  TRIGGER FUNCTION TO FIND ALL PUBLISHED POSTS
            // ****************************************************************************             
                        // ****************************************************************************
            // CALL TO API:-  TRIGGER FUNCTION TO FIND ALL APPROVED STAFFS
            // ****************************************************************************             
            async function fetchAllDraftPosts() {
                const draftPosts = 'draft';
                await api.get(`/api/v1/admin/posts/manage?page=${currentPage}&limit=${pageLimit}&status=${draftPosts}`)
                .then((response) => {
                    const { success, data, message } = response.data;
                    const { allBlogPosts, pagination } = data;

                    if (!success && message === "No post found") {
                        console.log("Success: ", success);
                        console.log("Message: ", message);
                    };

                    setBlogDraftPosts(allBlogPosts);
                   
                    setTotalDraftPosts(pagination?.postsRecord);
                    setTotalPages(pagination?.lastPage);
                })
                .catch((error) => {
                            console.log("Error fetching data: ", error);
                })
                .finally(() => {
                    setIsLoading(false);
                });
            };

            var timerID = setTimeout(fetchAllDraftPosts, 300);   // Delay execution of findAllStaffs by 1800ms
            return () => {
                clearTimeout(timerID);                  // Clean up timer if component unmounts or token changes
            };
        } else {
            allDraftPostsLink?.classList.remove("activePostView");
        };

    }, [activeDisplay, search, pageLimit, currentPage]); // Fetch data when currentPage changes
    // ****************************************************************************
    // **************************************************************************** 
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    // ****************************************************************************
    // ****************************************************************************







    if (isLoading) {        
        return (        
            <div className={`w-full overflow-x-auto ${activeDisplay === "draftPosts" ? "block" : "hidden"}`}>
                {/* Draft Blog Posts table */}
                <table className="items-center w-full bg-transparent border-collapse">
                    <thead>
                        <tr>
                                                        <th
                                                            className={
                                                                "px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                                                (color === "light"
                                                                ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                                : "bg-blueGray-50 text-gray-500 border-lightBlue-300")
                                                            }
                                                        >
                                                            S/N
                                                        </th>
                                                        <th
                                                            className={
                                                                "px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                                                (color === "light"
                                                                ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                                : "bg-blueGray-50 text-gray-500 border-lightBlue-300")
                                                            }
                                                        >
                                                            Title
                                                        </th>
                                                        <th
                                                            className={
                                                                "px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                                                (color === "light"
                                                                ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                                : "bg-blueGray-50 text-gray-500 border-lightBlue-300")
                                                            }
                                                        >
                                                            Excerpt
                                                        </th>
                                                        <th
                                                            className={
                                                                "px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                                                (color === "light"
                                                                ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                                : "bg-blueGray-50 text-gray-500 border-lightBlue-300")
                                                            }
                                                        >
                                                            Status
                                                        </th> 
                                                        <th
                                                            className={
                                                                "px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                                                (color === "light"
                                                                ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                                : "bg-blueGray-50 text-gray-500 border-lightBlue-300")
                                                            }
                                                        >
                                                        Action
                                                        </th>              
                                                        <th
                                                            className={
                                                                "px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                                                (color === "light"
                                                                ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                                : "bg-blueGray-50 text-gray-500 border-lightBlue-300")
                                                            }
                                                        ></th>
                        </tr>
                    </thead>
                    <tbody className='w-16 h-16'>
                        <tr>
                            <td></td>
                            <td></td>
                            <td className="max-w-40 h-60 flex flex-col justify-center items-center">                                                                                             
                                <img src={spinner} alt="Spinning" className="ml-80 mx-auto" />                                                              
                                <p className="text-xl tracking-extratight font-semibold">Loading...</p>                                  
                            </td>
                            <td></td>
                        </tr>                
                    </tbody>
                </table>
            </div>
        );
    };


    return (
        <>
            {/* Views */}
            <div className={`w-full overflow-x-auto ${activeDisplay === "draftPosts" ? "block" : "hidden"}`}>
                                        {/* Projects table */}
                                        <table className="items-center w-full bg-transparent border-collapse">
                                            <thead>
                                                    <tr>
                                                        <th
                                                            className={
                                                                "px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                                                (color === "light"
                                                                ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                                : "bg-blueGray-50 text-gray-500 border-lightBlue-300")
                                                            }
                                                        >
                                                            S/N
                                                        </th>
                                                        <th
                                                            className={
                                                                "px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                                                (color === "light"
                                                                ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                                : "bg-blueGray-50 text-gray-500 border-lightBlue-300")
                                                            }
                                                        >
                                                            Featured Image
                                                        </th>
                                                        <th
                                                            className={
                                                                "px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center " +
                                                                (color === "light"
                                                                ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                                : "bg-blueGray-50 text-gray-500 border-lightBlue-300")
                                                            }
                                                        >
                                                            Post Title
                                                        </th>
                                                        <th
                                                            className={
                                                                "px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                                                (color === "light"
                                                                ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                                : "bg-blueGray-50 text-gray-500 border-lightBlue-300")
                                                            }
                                                        >
                                                            Date Published
                                                        </th>
                                                        <th
                                                            className={
                                                                "px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                                                (color === "light"
                                                                ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                                : "bg-blueGray-50 text-gray-500 border-lightBlue-300")
                                                            }
                                                        >
                                                            Status
                                                        </th> 
                                                        <th
                                                            className={
                                                                "px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                                                (color === "light"
                                                                ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                                : "bg-blueGray-50 text-gray-500 border-lightBlue-300")
                                                            }
                                                        >
                                                        Action
                                                        </th>              
                                                        <th
                                                            className={
                                                                "px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                                                (color === "light"
                                                                ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                                : "bg-blueGray-50 text-gray-500 border-lightBlue-300")
                                                            }
                                                        ></th>
                                                    </tr>
                                            </thead>
                                            {search(blogDraftPosts)?.length !== 0 ?
                                                    <tbody>                                                    
                                                        {search(blogDraftPosts)?.map((post, userIndex) => {
                                                                if (post?.status === "draft") {
                                                                    return (                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
                                                                        <tr key={userIndex}>
                                                                            <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap">
                                                                                #{userIndex+1}
                                                                            </td>
                                                                            <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-xl font-serif tracking-supertight whitespace-nowrap flex justify-center items-center">                                                                         
                                                                                {   
                                                                                    post?.images?.map((item, itemIndex) => {
                                                                                        if (item?.featured === true) {
                                                                                            return (
                                                                                                <div key={itemIndex} className="">
                                                                                                    <img src={item?.url} className="h-20 max-w-24 bg-white rounded-lg border" alt={item?.alt} />{" "}
                                                                                                </div>
                                                                                            );
                                                                                        }
                                                                                    })
                                                                                }    
                                                                 
                                                                            </td>
                                                                            <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-xl font-serif font-bold whitespace-nowrap capitalize">   
                                                                                <span
                                                                                    className={
                                                                                        "ml-3 font-bold " +
                                                                                        + (color === "light" ? "text-blueGray-600" : "text-white")
                                                                                    }>
                                                                                    {post?.title?.substring(0,50)+"..."}
                                                                                </span>
                                                                            </td>
                                                                            <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-xl font-serif tracking-supertight font-bold whitespace-nowrap">
                                                                                {convertDate(post?.createdAt)}                        
                                                                            </td>
                                                                            <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-xl font-serif font-bold whitespace-nowrap capitalize">
                                                                                <i className="fas fa-circle text-orange-500 mr-2"></i>{post?.status}
                                                                            </td>  
                                                                            <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-lg font-semibold whitespace-nowrap capitalize">
                                                                                <Link to={`/admin/blog/manage/${post?._id}`}>View details</Link>
                                                                            </td>                  
                                                                            <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap text-right">
                                                                                <TableDropdown />
                                                                            </td>
                                                                        </tr>               
                                                                    );
                                                                } else if (post?.status === "scheduled") {
                                                                    return (                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
                                                                        <tr key={userIndex}>
                                                                            <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap">
                                                                                #{userIndex+1}
                                                                            </td>
                                                                            <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-xl font-serif tracking-supertight whitespace-nowrap flex justify-center items-center">                                                                         
                                                                                {   
                                                                                    post?.images?.map((item, itemIndex) => {
                                                                                        if (item?.featured === true) {
                                                                                            return (
                                                                                                <div key={itemIndex} className="">
                                                                                                    <img src={item?.url} className="h-20 max-w-24 bg-white rounded-lg border" alt={item?.alt} />{" "}
                                                                                                </div>
                                                                                            );
                                                                                        }
                                                                                    })
                                                                                }    
                                                                 
                                                                            </td>
                                                                            <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-xl font-serif font-bold whitespace-nowrap capitalize">   
                                                                                <span
                                                                                    className={
                                                                                        "ml-3 font-bold " +
                                                                                        + (color === "light" ? "text-blueGray-600" : "text-white")
                                                                                    }>
                                                                                    {post?.title?.substring(0,50)+"..."}
                                                                                </span>
                                                                            </td>
                                                                            <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-xl font-serif tracking-supertight font-bold whitespace-nowrap">
                                                                                {convertDate(post?.createdAt)}                        
                                                                            </td>
                                                                            <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-xl font-serif font-bold whitespace-nowrap capitalize">
                                                                                <i className="fas fa-circle text-yellow-500 mr-2"></i>{post?.status}
                                                                            </td>  
                                                                            <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-lg font-semibold whitespace-nowrap capitalize">
                                                                                <Link to={`/admin/blog/manage/${post?._id}`}>View details</Link>
                                                                            </td>                  
                                                                            <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap text-right">
                                                                                <TableDropdown />
                                                                            </td>
                                                                        </tr>               
                                                                    );
                                                                } else {
                                                                    return (                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
                                                                        <tr key={userIndex}>
                                                                            <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap">
                                                                                #{userIndex+1}
                                                                            </td>
                                                                            <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-xl font-serif tracking-supertight whitespace-nowrap flex justify-center items-center">                                                                         
                                                                                {   
                                                                                    post?.images?.map((item, itemIndex) => {
                                                                                        if (item?.featured === true) {
                                                                                            return (
                                                                                                <div key={itemIndex} className="">
                                                                                                    <img src={item?.url} className="h-20 max-w-24 bg-white rounded-lg border" alt={item?.alt} />{" "}
                                                                                                </div>
                                                                                            );
                                                                                        }
                                                                                    })
                                                                                }    
                                                                 
                                                                            </td>
                                                                            <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-xl font-serif font-bold whitespace-nowrap capitalize">   
                                                                                <span
                                                                                    className={
                                                                                        "ml-3 font-bold " +
                                                                                        + (color === "light" ? "text-blueGray-600" : "text-white")
                                                                                    }>
                                                                                    {post?.title?.substring(0,50)+"..."}
                                                                                </span>
                                                                            </td>
                                                                            <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-xl font-serif tracking-supertight font-bold whitespace-nowrap">
                                                                                {convertDate(post?.createdAt)}                        
                                                                            </td>
                                                                            <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-xl font-serif font-bold whitespace-nowrap capitalize">
                                                                                <i className="fas fa-circle text-green-500 mr-2"></i>{post?.status}
                                                                            </td>  
                                                                            <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-lg font-semibold whitespace-nowrap capitalize">
                                                                                <Link to={`/admin/blog/manage/${post?._id}`}>View details</Link>
                                                                            </td>                  
                                                                            <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap text-right">
                                                                                <TableDropdown />
                                                                            </td>
                                                                        </tr>               
                                                                    );
                                                                };
                                                        })}
                                                    </tbody>
                                                    :
                                                    <tbody>                    
                                                        <tr>
                                                            <td className=""></td>
                                                            <td className=""></td>
                                                            <td className="text-left max-w-60 pl-6 h-60 flex justify-start items-center">No post found</td>
                                                            <td className=""></td>
                                                            <td className=""></td>
                                                            <td className=""></td>
                                                        </tr>
                                                    </tbody>
                                            }
                                        </table>
    
    
                                        {/* Pagination controls */}
                                        <div className="flex justify-between items-center py-2 mr-6">
                                            <div className="p-4 font-medium text-3xl font-firma tracking-supertight flex flex-row gap-6 items-center">
                                                {pageLimit} 
                                            <div className="text-xl normal-case">Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong></div>
                                            </div>
                                            
                                            <nav className="relative z-0 inline-flex shadow-sm">
                                                                    {/* Previous page button */}
                                                                    <button
                                                                        onClick={() => handlePageChange(currentPage - 1)}
                                                                        className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-xl font-black text-gray-500 hover:bg-gray-50 w-16 justify-center h-14 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                                        disabled={currentPage === 1}
                                                                    >{leftArrow}
                                                                    </button>
    
    
                                                                    {/* Page numbers */}
                                                                    {Array.from({ length: totalPages }, (_, index) => (
                                                                            <button
                                                                            key={index}
                                                                            onClick={() => handlePageChange(index + 1)}
                                                                            className={`-ml-px relative inline-flex items-center border border-gray-300 text-xl font-black outline-none focus:outline-none hover:bg-gray-50 w-16 justify-center h-14 ${currentPage === index + 1 ? 'bg-gray-100 text-blue-800' : ''}`}>
                                                                            {index + 1}
                                                                            </button>
                                                                    ))}
    
    
                                                                    {/* Next page button */}
                                                                    <button
                                                                        onClick={() => handlePageChange(currentPage + 1)}
                                                                        className={`-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-xl font-black text-gray-500 hover:bg-gray-50 w-16 justify-center h-14 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                                        disabled={currentPage === totalPages}
                                                                    >{rightArrow}
                                                                    </button>
                                            </nav>
                                        </div>
                                        {/* Pagination controls */}
            </div>
        </>           
    );

};


export default CardAllDraftPosts;
