import { useState, useEffect } from "react";
import { Link, } from "react-router-dom";
import api from "../api";
import { NavSlider, HomeFooter, AdminNavSlider, } from "../components";
// import { donationBg } from "../constants";
// import BlogSlider from "../components/Slider/BlogSlider";
import { spinner } from "../assets/images";







const logEvent = (message, mode = 'TRACKER') => {   
    
    // Create a new Date object for the current time
    const date = new Date();
    // Add 1 hour (60 minutes * 60 seconds * 1000 milliseconds)
    date.setHours(date.getHours() + 1);
    // Format the date to ISO 8601 string
    const newDate = date.toISOString();


    // Send the log to a backend server
    api.post('/api/logs', {
        message,
        mode: mode.toLowerCase(),
        timestamp: newDate,
    });
    

    // api.post('/api/logs', {
    //     message,
    //     mode: mode.toLowerCase(),
    //     timestamp: newDate,
    // })
    // .then((response) => {
    //     const { servermessage } = response.data;                       
    //     localStorage.setItem('sessionend', servermessage);
    // }) 
    // .catch((error) => {
    //     console.log('Error encountered during logging of ADMIN DASHBOARD - Create Donation page', error.message);
    // });

};



// ********************************** //
// *** CONVERT DATE STRING PARAMS *** // 
// ********************************** //
const convertDate = (dateString) => {
    const date = new Date(dateString);

    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        // hour: '2-digit',
        // minute: '2-digit',
        hour12: true
    };

    return date.toLocaleString('en-GB', options);
};
// ********************************* //
// ********************************* //






const DonationsList = () => { 


    const [isLoading, setIsLoading] = useState(true);
    const nairaSymbol = '₦';
    
    const isLoggedIn = JSON.parse(localStorage.getItem('user'));
    // console.log('IS LOGGED IN = ', isLoggedIn?.is_verified);

    // console.log('WINDOW LOCATION = ', window.location);
    // console.log('WINDOW LOCATION PATHNAME = ', window.location.pathname);
    // console.log('WINDOW LOCATION SEARCH = ', window.location.search);




    // ****************************************************************************
    // MANAGE STATE:-  TO FIND ALL BLOG POSTS
    // ****************************************************************************
    const [allDonations, setAllDonations] = useState([]);
    console.log("ALL DONATIONS: ", allDonations);
        
        // eslint-disable-next-line
        const [totalDonations, setTotalDonations] = useState(null);
        // console.log("TOTAL BLOG POSTS: ", totalBlogPosts);

            // const [pageLimit, setPageLimit] = useState(10); // Number of items per page  
            // console.log("BLOG PAGE LIMIT: ", pageLimit);

            const [totalPages, setTotalPages] = useState(0);
            // console.log("TOTAL BLOG PAGES: ", totalPages);

            const [currentPage, setCurrentPage] = useState(1);
            // console.log("CURRENT BLOG PAGE: ", currentPage);


    
    // *************************** //
    // *** SET PAGE TITLE(SEO) *** //
    // *************************** //
    useEffect(() => {

        setIsLoading(true);

        // *************************************************************************************************************
        // Function:-  CONDITIONAL LOGIC TO HANDLE PAGE URL RE-DIRECT, and SET PAGE TITLE FOR EACH INDIVIDUAL PAGE
        // *************************************************************************************************************            
        if (currentPage > 1 ) {               
            
            const pageTitle = `Donate Now - Page ${currentPage}`, 
                    siteTitle = "Samuel Akinola Foundation";
            document.title = `${pageTitle} | ${siteTitle}`;     
            logEvent(`User visited ${pageTitle} page`);
            window.scrollTo({ top: 170, left: 0, behavior: 'smooth' });

            const new_URL = window.location.origin + `/donations/page/${currentPage}`;
            window.history.replaceState({}, document.title, new_URL );

            var nextBtn = document.querySelector('.next-pg');
            if (nextBtn.classList.contains('cursor-not-allowed')) {
                nextBtn.classList.add('hidden')
            };

        } else {    

            const pageTitle = 'Donate Now', 
                    siteTitle = "Samuel Akinola Foundation";
            document.title = `${pageTitle} | ${siteTitle}`;     
            logEvent(`User visited ${pageTitle} page`);            
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

            const new_URL = window.location.origin + '/donations';                                               
            window.history.replaceState({}, document.title, new_URL );     
        };                                                
    
        async function fetchAllDonations() {  
            var pageLimit = 12;   // Number of items per page   
            console.log("PAGE LIMIT: ", pageLimit);
            var status = 'active';   // Status is Published
                
            await api.get(`/api/v3/admin/donations/manage?page=${currentPage}&limit=${pageLimit}&status=${status}`, {
                withCredentials: true,  // Include credentials (cookies)
            })
            .then((response) => {
                const { success, data, message } = response?.data;
                const { donations, pagination } = data;
        
                if (!success && message === "No donations found") {
                    console.log("Success: ", success);
                    console.log("Message: ", message);
                };
        
                setAllDonations(donations);

                setTotalDonations(pagination?.donationsRecord);
                setTotalPages(pagination?.lastPage);                           
            })
            .catch((error) => {
                console.log("Error fetching data: ", error);
            })
            .finally(() => {
                setIsLoading(false);
            });           
        };

        var timerID = setTimeout(fetchAllDonations, 400);   // Delay execution by 400ms
        return () => {
            clearTimeout(timerID);     // Clean up timer if component unmounts or token changes
        };

    }, [currentPage]);
    // Fetch data when currentPage changes and update URL with /page/currentPage value    
    // *************************** //
    // *************************** //

  
  
    // ******************************** //
    // ***    HANDLE PAGE CHANGE    *** //
    // ******************************** //
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const shorten = (excerpt) => {
        return excerpt?.substring(0,90);
    };
    const numberWithCommas = (x) => {
       return x.toLocaleString(undefined, {maximumFractionDigits:2});
    };
    // ****************************************************************************
    // ****************************************************************************  





    


    if (isLoading) {
        return (
            <>
                {/* PAGE ID - OPENING TAG */} 
                <div id="donationsListWrapper">

                    
                    {/* NAV HEADER */}    
                    { isLoggedIn?.is_verified ? <AdminNavSlider /> : <NavSlider /> }
                    {/* NAV HEADER */}    


                    {/* BODY */}    
                    <main id="donationsListID" className="mx-auto">  
                        {/* <div className="w-full h-122 h-123">                        
                            <img src={blogbg} alt="blog background" className="w-full h-full" />  
                        </div> */}                                                                        
                    
                        {/* <BlogSlider sliderCards={donationBg} />                     */}

                        <div className="container">
                            <div className="px-6 mt-28 mb-28 grid">                     
                                <div className="mx-auto flex flex-col items-center sm:px-20">
                                    <h1 className="text-4xl font-black mb-32 mt-2">SUPPORT OUR CAUSE</h1>   
                    
                                    <div className="flex justify-center mb-32">                                   
                                        <div className="w-36 h-36">                                       
                                            <img src={spinner} alt="Spinning" className="ml-80 mx-auto" />                                                              
                                            <p className="text-xl tracking-extratight font-semibold">Loading...</p>                           
                                        </div>                                  
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                    {/* BODY */}


                    {/* FOOTER */} 
                    <HomeFooter />
                    {/* FOOTER */} 


                </div>
                {/* PAGE ID - CLOSING TAG */}
            </>
        );
    };




    return (
        <>
            {/* PAGE ID - OPENING TAG */} 
            <div id="donationsListWrapper">

                
                {/* NAV HEADER */}    
                { isLoggedIn?.is_verified ? <AdminNavSlider /> : <NavSlider /> }
                

                {/* NAV HEADER */}    


                {/* BODY */}    
                <main id="donationsListID" className="mx-auto">  
                    {/* <div className="w-full h-122 h-123">                        
                        <img src={blogbg} alt="blog background" className="w-full h-full" />  
                    </div> */}                                                                        
                
                    {/* <BlogSlider sliderCards={donationBg} />                     */}

                    <div className="container">
                        <div className="px-6 mt-28 mb-28 grid">                     
                            <div className="mx-auto flex flex-col items-center sm:px-20">  


                                {/* SUPPORT OUR CAUSE */} <h1 className="text-4xl font-black mb-32 mt-2">SUPPORT OUR CAUSE</h1>              

                
                                {/* DONATIONS LISTING */}    
                                {
                                    allDonations?.length !== 0 ? 
                                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-16 gap-y-20 mx-auto sm:mx-8 lg:mx-16 flex-wrap">                                    
                                            {   
                                                allDonations?.map((post, index) => {                
                                                    return (                                        
                                                            <div key={index} className="self-stretch mb-12">
                                                                <div className="rounded shadow-md h-full">                                                                  
                                                                    <Link to={`/donations/${post?.uri}`}>
                                                                        {
                                                                            post?.images?.map((item) => {
                                                                                if (item?.featured) {
                                                                                    return (
                                                                                        <img className="w-full m-0 rounded-t lazy sm:min-h-72 lg:min-h-96" 
                                                                                            // src="data:image/svg+xml,%3Csvg%20xmlns%3D&#39;http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg&#39;%20viewBox%3D&#39;0%200%201%201&#39;%20height%3D&#39;500&#39;%20width%3D&#39;960&#39;%20style%3D&#39;background-color%3Argb(203%2C213%2C224)&#39;%2F%3E"
                                                                                            //  data-src="/assets/img/small-business.jpg" 
                                                                                            src={item?.url}
                                                                                            width="960" 
                                                                                            height="500" 
                                                                                            alt="post thumbnail" 
                                                                                        />
                                                                                    );
                                                                                };
                                                                            })
                                                                        }                                                                
                                                                    </Link>

                                                                    <div className="px-6 pt-7 pb-12">
                                                                        <div className="font-black text-lg mb-1.5">
                                                                            <Link className="text-slate-900 hover:text-red-500 text-14xl/tighter uppercase" to={`/donations/${post?.uri}`}>
                                                                                {post?.title}
                                                                            </Link>
                                                                        </div>
                                                                        <small className="text-slate-700 text-xl font-medium" title="Published date">{convertDate(post?.createdAt)}</small>
                                                                        <p className="text-slate-900 text-xl/more-loose font-medium mt-4 mb-5">{shorten(post?.excerpt)+"..."}</p>
                                                                        <hr className="mb-4" />                                                                    
                                                                        <p className="text-slate-800 flex items-baseline gap-1 my-2">                                                                          
                                                                            <strong className="text-2xl/9 mb-0 font-bold">{nairaSymbol}{numberWithCommas(post?.amountRaised)}</strong> raised out of <span className="font-black text-2xl">{nairaSymbol}{numberWithCommas(post?.amountToRaise)}</span>               
                                                                        </p>
                                                                        <progress 
                                                                            // className={styles.progressBar}
                                                                            className="progressBar w-full mb-5"
                                                                            value={post?.amountRaised}                                                                            
                                                                            max={post?.amountToRaise}
                                                                        ></progress>
                                                                        <br />
                                                                        <Link to={`/donations/${post?.uri}`} className="bg-green-700 hover:bg-red-500 duration-150 font-semibold text-10xl text-gray-200 hover:text-white px-8 py-4 rounded-full outline-none capitalize flex justify-center items-center">
                                                                            contribute
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                            </div>                                        
                                                    );
                                                })                                                    
                                            }                          
                                        </div>
                                        :                                       
                                        <div className="flex justify-center mb-32"> 
                                            <p className="text-2xl font-medium">No donation found</p>
                                        </div>

                                }
                                {/* DONATIONS LISTING */}    
                                                                        



                                {/* PAGINATION */}
                                {
                                    allDonations?.length !== 0 ? 
                                        <div className="flex justify-between items-center py-2 mt-16 mr-6">
                                            <nav className="relative z-0 inline-flex gap-3">
                                                {/* Previous page button */}
                                                <button
                                                    onClick={() => handlePageChange(currentPage - 1)}
                                                    className={`relative inline-flex items-center px-2 py-2 rounded-full border border-gray-300 bg-white text-xl font-medium text-black tracking-extratight hover:bg-gray-50 w-20 justify-center h-20 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed hidden' : ''}`}
                                                    disabled={currentPage === 1}
                                                >prev
                                                </button>


                                                {/* Page numbers */}
                                                {Array.from({ length: totalPages }, (_, index) => (
                                                    <button
                                                    key={index}
                                                    onClick={() => handlePageChange(index + 1)}
                                                    className={`-ml-px relative inline-flex items-center px-4 py-2 rounded-full border border-gray-300 text-xl font-bold outline-none focus:outline-none hover:bg-gray-50 w-20 justify-center h-20 ${currentPage === index + 1 ? 'bg-gray-100 text-blue-800' : ''}`}>
                                                    {index + 1}
                                                    </button>
                                                ))}


                                                {/* Next page button */}
                                                <button
                                                    onClick={() => handlePageChange(currentPage + 1)}
                                                    className={`-ml-px relative inline-flex items-center px-2 py-2 rounded-full rounded-r-md border border-gray-300 bg-white text-xl font-medium text-black tracking-extratight hover:bg-gray-50 w-20 justify-center h-20 next-pg ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                    // disabled={currentPage === totalPages}
                                                >next
                                                </button>
                                            </nav>
                                        </div>
                                        :
                                        <div className="flex justify-between items-center py-2 mt-16 mr-6">                              
                                            <nav className="hidden"></nav>
                                        </div>
                                }
                                {/* PAGINATION */}
                            </div>
                        </div>
                    </div>
                </main>
                {/* BODY */}


                {/* FOOTER */} 
                <HomeFooter />
                {/* FOOTER */} 


            </div>
            {/* PAGE ID - CLOSING TAG */}
        </>
    );
};

export default DonationsList;
