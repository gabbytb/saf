import { useState, useEffect, } from 'react';
import { useParams } from 'react-router-dom';
// import { Editor } from '@tinymce/tinymce-react';
import api from '../../api';







const CardBlogDetails = ({ userId, firstName, lastName, userEmail, displayImg, userBio }) => { 


    // const [activeForm, setActiveForm] = useState('post-form');

  

    // ***************************************************************************
    // DESTRUCTURE CURRENT ACTIVE USER PROPS:-
    // ***************************************************************************
    console.log("Logged-In User ID: ", userId);
    console.log("Logged-In User First Name: ", firstName);           
    console.log("Logged-In User Last Name: ", lastName); 
    console.log("Logged-In User E-mail: ", userEmail);
    console.log("Logged-In User Display Image: ", displayImg);    
    console.log("Logged-In User Bio: ", userBio);



    // ************************************
    // MANAGE STATE:-  TO FIND USER BY ID
    // ************************************
    const { id } = useParams();
    // console.log("POST ID: ", id);
    const [ post, setPost ] = useState();
    // **************************************************************************************************
    // CALL TO API:-  ID TO TRIGGER FUNCTION TO FIND POST BY ID
    // **************************************************************************************************
    useEffect(() => {      
        async function findArticleByID() {
            const url = `/api/v1/admin/blogs/manage/post/${id}`;
            await api.get(url)
            .then((response) => {
                const { success, data, message } = response.data;
                if ((!success) || (message === "Post not found")) {
                    console.log("Message: ", message);
                    console.log("Success: ", success);
                };
                            
                // Perform Actions Here if Truthy
                setPost(data);

                // console.log("Success: ", success);
                // console.log("Data: ", data);
                // console.log("Message: ", message);
            })
            .catch((error) => {
                // Handle error state or logging here
                console.log("Error encountered: ", error);
            });
            // .finally(() => {
            //     setIsLoading(false);    // Always disable loading state, whether successful or not
            // });
        };
        
        var timerID = setTimeout(findArticleByID, 500);   // Delay execution of findArticleById by 1800ms
        return () => {
            // Clean up timer if component unmounts or token changes
            clearTimeout(timerID);
        };
    }, [id]);
    console.log("Found ARTICLE INFO: ", post);






    // **************************************************************************************************
    // FUNCTION TO RE-DIRECT TO PREVIOUS PAGE BASED ON USER'S ROLE
    // **************************************************************************************************
    // const [redirToUserPage, setRedirToUserPage] = useState(true);
    // useEffect(() => {      
    //     function handleRedirectBackTo() {
    //         for (var i = 0; i < user?.roles?.length; i++) {
    //             if (user?.roles[i]?.role === 'ROLE_USERS') {
    //                 setRedirToUserPage(true);                    
    //             } else {
    //                 setRedirToUserPage(false);
    //             };
    //         };
    //     };
    //     handleRedirectBackTo();
    // }, [user, redirToUserPage]);
    // *******************************************************************************************//
    // *******************************************************************************************// 




    
    // ON-CLICK:- SHOW UPDATE PAGE
    // function showUpdateForm() {
    //     window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
    //     setActiveForm('update-post-form');
    // };





    // ON-CLICK:- BACK BUTTON on THE UPDATE PAGE !
    // TO-RETURN:- TO USER DETAILS PAGE or STAFF DETAILS PAGE 
    // async function showUserInfo() {
    //     if (id !== null) {    
    //         window.scrollBy({ left: 0, top: 0, behavior: 'smooth' });

    //         for (var i = 0; i < user?.roles?.length; i++) {
    //             if (user?.roles[i]?.role === 'ROLE_USERS') {
    //                 window.location = `/admin/users/${id}`;
    //             } else {
    //                 window.location = `/admin/staffs/${id}`;
    //             };
    //         };       
    //     };
    // }; 
    



    // const [submitUpdate, setSubmitUpdate ] = useState(false);
  
    // async function handleChangeUserInfo(e) {
    //     const name = e.target.name,
    //           value = e.target.value;

    //     setUser({
    //         ...user,
    //         [name]: value
    //     });
    // };

    // async function handleSubmitUserInfo(e) {
    //     e.preventDefault();
     
    //     const uri = `/api/v1/admin/users/manage/update/${id}`;
    //     await api.put(uri, user)
    //     .then((response) => {
    //         const { success, data, message } = response.data;

    //         if (!success && message === "No match found") { 
    //             setSubmitUpdate(success);                
    //             console.log("Success: ", success);
    //             console.log("Message: ", message);                
    //         };
          
    //         setSubmitUpdate(success);
    //         setUser(data);

    //         console.log("Success: ", success);
    //         console.log("Data: ", data);
    //         console.log("Message: ", message);

    //         setTimeout(() => {              
    //             showUserInfo();
    //         }, 3000);        
    //     })
    //     .catch((error) => {
    //         console.log("Internal server error: ", error);
    //     });
    // };

    // useEffect(() => {              
    //     if (submitUpdate === true) {
    //         console.log('Update was Submitted: ', submitUpdate); 
            
    //         function findUpdatedUserID() {             
    //             const url = `/api/v1/auth/account/manage/${id}`;
    //             api.get(url)
    //             .then((response) => {
    //                 const { success, data, message } = response.data;
    //                 if (!success || message === "User not found") {
    //                     console.log("Message: ", message);
    //                     console.log("Success: ", success);
    //                 };
                                    
    //                 // Perform Actions Here if Truthy
    //                 // console.log("Success: ", success);
    //                 // console.log("Data: ", data);
    //                 // console.log("Message: ", message);                        
    //                 setUser(data);
    //             })
    //             .catch((error) => {
    //                     // Handle error state or logging here
    //                     console.log("Error encountered: ", error);
    //             });
    //         };                    
    //         findUpdatedUserID();
    //     };
    // }, [id, submitUpdate]);

    




    return (
        <>
            <div id="articleDetails" className="relative flex flex-col min-w-0 break-words xs:w-full lg:w-781 mb-16 shadow-lg rounded-lg bg-blueGray-100 border-0">


            </div>
        </>
    );
};

export default CardBlogDetails;



                // <div className={`activeDisplay ${activeForm === 'post-form' ? 'block' : 'hidden'}`}>
                //     <div className="rounded-t bg-white mb-0 p-6">
                //         <div className="text-center flex justify-start items-center gap-14">
                //             <Link to={redirToUserPage ? '/admin/users' : '/admin/staffs'}>
                //                 <button
                //                         className="bg-blue-500 text-white active:bg-lightBlue-500 font-bold uppercase text-3xl tracking-tightener px-7 py-1 rounded-lg shadow hover:bg-blue-600 hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-300"
                //                         type="button">{String.fromCharCode(8592)}
                //                 </button> 
                //             </Link>
                //             {                 
                //                 post?.roles?.map((item) => {                                
                //                     return (
                //                         item?.role === 'ROLE_USERS' ?
                //                             <h6 className="text-blueGray-700 text-42xl tracking-tightener font-black capitalize">user Information</h6>  
                //                             :
                //                             <h6 className="text-blueGray-700 text-42xl tracking-tightener font-black capitalize">staff Information</h6>                                            
                //                     );
                //                 })
                //             }
                //         </div>
                //     </div>

                //     <div className="flex-auto px-4 lg:px-10 py-10 pt-0">                                            
                //         <form id="showPostFormID">
                //             <h6 className="text-gray-500 text-2xl mt-12 mb-12 font-bold uppercase px-4">
                //                 {/* Post Information */}
                //             </h6>
                //             <div className="flex flex-wrap">

                //                 <div className="w-full lg:w-6/12 px-4">
                //                     <div className="relative w-full mb-3">
                //                         <label
                //                             className="block uppercase text-blueGray-600 text-lg tracking-tightener font-bold mb-2"
                //                             htmlFor="grid-password"
                //                         >
                //                             First Name
                //                         </label>
                //                         <input
                //                             type="text"
                //                             className="border-0 px-3 py-3 mt-0 mb-6 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-xl font-bold shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                //                             // defaultValue="Lucky"
                //                             value={user?.first_name}
                //                             disabled
                //                         />
                //                     </div>
                //                 </div>

                //                 <div className="w-full lg:w-6/12 px-4">
                //                     <div className="relative w-full mb-3">
                //                     <label
                //                         className="block uppercase text-blueGray-600 text-lg tracking-tightener font-bold mb-2"
                //                         htmlFor="grid-password"
                //                     >
                //                         Last Name
                //                     </label>
                //                     <input
                //                         type="text"
                //                         className="border-0 px-3 py-3 mt-0 mb-6 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-xl font-bold shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                //                         // defaultValue="Jesse"
                //                         value={user?.last_name}
                //                         disabled
                //                     />
                //                     </div>
                //                 </div>

                //                 <div className="w-full lg:w-6/12 px-4">
                //                     <div className="relative w-full mb-3">
                //                     <label
                //                         className="block uppercase text-blueGray-600 text-lg tracking-tightener font-bold mb-2"
                //                         htmlFor="email"
                //                     >
                //                         Email address
                //                     </label>
                //                     <input
                //                         type="email"
                //                         className="border-0 px-3 py-3 mt-0 mb-6 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-xl font-bold shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                //                         // defaultValue="jesse@example.com"
                //                         value={user?.email}
                //                         disabled
                //                     />
                //                     </div>
                //                 </div>

                //                 <div className="w-full lg:w-6/12 px-4">
                //                     <div className="relative w-full mb-3">
                //                         <label
                //                             className="block uppercase text-blueGray-600 text-lg tracking-tightener font-bold mb-2"
                //                             htmlFor="grid-password">
                //                             Phone Number
                //                         </label>
                //                         <input
                //                             type="text"
                //                             className="border-0 px-3 py-3 mt-0 mb-6 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-xl font-bold shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                //                             // defaultValue="Phone Number"
                //                             value={user?.phone}
                //                             disabled
                //                         />
                //                     </div>
                //                 </div>
                        
                //             </div>

                //             <hr className="mt-6 border-b-1 border-blueGray-300" />

                //             <h6 className="text-gray-500 text-xl mt-10 mb-8 px-4 font-bold uppercase">
                //                 Contact Information
                //             </h6>
                //             <div className="flex flex-wrap">
                //                 <div className="w-full lg:w-12/12 px-4 flex gap-8">
                                    
                //                     <div className="relative w-3/6 mb-3">
                //                         <label
                //                             className="block uppercase text-blueGray-600 text-lg tracking-tightener font-bold mb-2"
                //                             htmlFor="grid-password"
                //                         >
                //                             Address
                //                         </label>
                //                         <input
                //                             type="text"
                //                             className="border-0 px-3 py-3 mt-0 mb-6 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-xl font-bold shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                //                             // defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                //                             value={user?.address}
                //                             disabled
                //                         />
                //                     </div>
                                    
                //                     <div className="relative w-3/6 mb-3">
                //                         <label
                //                             className="block uppercase text-blueGray-600 text-lg tracking-tightener font-bold mb-2"
                //                             htmlFor="grid-password"
                //                         >
                //                             Address 2
                //                         </label>
                //                         <input
                //                             type="text"
                //                             className="border-0 px-3 py-3 mt-0 mb-6 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-xl font-bold shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                //                             // defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                //                             value={user?.address2}
                //                             disabled
                //                         />
                //                     </div>
                                    
                //                 </div>

                //                 <div className="w-full lg:w-12/12 px-4 flex gap-8">
                                    
                //                     <div className="relative w-3/6 mb-3">
                //                         <label
                //                             className="block uppercase text-blueGray-600 text-lg tracking-tightener font-bold mb-2"
                //                             htmlFor="city"
                //                         >
                //                             City
                //                         </label>
                //                         <input
                //                             type="text"
                //                             className="border-0 px-3 py-3 mt-0 mb-6 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-xl font-bold shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                //                             // defaultValue="New York"
                //                             value={user?.city}
                //                             disabled
                //                         />
                //                     </div>

                //                     <div className="relative w-3/6 mb-3">
                //                         <label
                //                             className="block uppercase text-blueGray-600 text-lg tracking-tightener font-bold mb-2"
                //                             htmlFor="state"
                //                         >
                //                             State
                //                         </label>
                //                         <input
                //                             type="text"
                //                             className="border-0 px-3 py-3 mt-0 mb-6 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-xl font-bold shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"                                           
                //                             value={user?.state}
                //                             disabled
                //                         />
                //                     </div>

                //                 </div>
                                
                //                 <div className="w-full lg:w-12/12 px-4 flex gap-8">
                //                     <div className="relative w-3/6 mb-3">
                //                         <label
                //                             className="block uppercase text-blueGray-600 text-lg tracking-tightener font-bold mb-2"
                //                             htmlFor="grid-password"
                //                         >
                //                             Country
                //                         </label>
                //                         <input
                //                             type="text"
                //                             className="border-0 px-3 py-3 mt-0 mb-6 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-xl font-bold shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                //                             // defaultValue="United States"
                //                             value={user?.country}
                //                             disabled
                //                         />
                //                     </div>

                //                     <div className="relative w-3/6 mb-3">
                //                         <label
                //                             className="block uppercase text-blueGray-600 text-lg tracking-tightener font-bold mb-2"
                //                             htmlFor="grid-password"
                //                         >
                //                             Postal Code
                //                         </label>
                //                         <input
                //                             type="text"
                //                             className="border-0 px-3 py-3 mt-0 mb-6 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-xl font-bold shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                //                             // defaultValue="Postal Code"
                //                             value={user?.postalCode}
                //                             disabled
                //                         />
                //                     </div>
                //                 </div>                    
                //             </div>

                //             <hr className="mt-6 border-b-1 border-blueGray-300" />

                //             <h6 className="text-gray-500 text-xl mt-10 mb-8 px-4 font-bold uppercase">
                //                 additional information
                //             </h6>
                //             <div className="flex flex-wrap">
                //                 <div className="w-full lg:w-12/12 px-4">
                //                     <div className="relative w-full mb-3">
                //                         <label
                //                             className="block uppercase text-blueGray-600 text-lg tracking-tightener font-bold mb-2"
                //                             htmlFor="grid-password"
                //                         >
                //                             bio
                //                         </label>
                //                         <textarea
                //                             type="text"
                //                             className="border-0 py-6 indent-4 mt-1.5 mb-6 placeholder-blueGray-300 text-blueGray-600 bg-slate-800 rounded text-xl font-bold shadow focus:outline-none w-full ease-linear transition-all duration-150 tracking-veryytight text-black"
                //                             // defaultValue="A beautiful UI Kit and Admin for React & Tailwind CSS. It is Free and Open Source."
                //                             value={user?.aboutMe}
                //                             disabled
                //                             rows="6"
                //                         ></textarea>
                //                     </div>
                //                 </div>
                //             </div>          
                //         </form>

                //         <div className="rounded-t px-6 mt-4 mb-4">
                //             <div className="text-center flex justify-start"> 
                //                 <button onClick={showUpdateForm}
                //                     className="bg-lightBlue-500 text-white hover:bg-blue-600 active:bg-lightBlue-600 font-semibold uppercase text-lg tracking-verytight px-8 py-4 rounded-xl shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                //                     type="button">Edit details
                //                 </button>
                //             </div>
                //         </div>
                //     </div>
                // </div>  

                // <div className={`activeDisplay ${activeForm === 'update-post-form' ? 'block' : 'hidden'}`}>
                //     <div className="rounded-t bg-white mb-0 p-6">
                //         <div className="text-center flex justify-start items-center gap-14">                           
                //             {/* <Link to={redirToUserPage ? showUserInfo : showUserInfo}> */}
                //                 <button onClick={showUserInfo}
                //                     className="bg-blue-500 text-white active:bg-lightBlue-500 font-bold uppercase text-3xl tracking-tightener px-7 py-1 rounded-lg shadow hover:bg-blue-600 hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-300"
                //                     type="button">{String.fromCharCode(8592)}
                //                 </button>   
                //             {/* </Link> */}
                            
                //             <h6 className="text-blueGray-700 text-42xl tracking-tightener font-bold capitalize">update information</h6>                                            
                //         </div>
                //     </div>


                //     <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                //         {/* FORM FOR UPDATING USER DATA */}
                //         <form id="userUpdateFormID" onSubmit={handleSubmitUserInfo}>
                //             <h6 className="text-gray-500 text-2xl mt-12 mb-12 font-black uppercase px-4">
                //                 {/* Update Information */}
                //             </h6>
                //             <div className="flex flex-wrap">
                                                                               
                //                 {/* First Name */}
                //                 <div className="w-full lg:w-6/12 px-4">
                //                     <div className="relative w-full mb-3">
                //                         <label
                //                             className="block uppercase text-blueGray-600 text-lg tracking-tightener font-bold mb-2"
                //                             htmlFor="first_name">
                //                             First Name
                                           
                //                             <input
                //                                 type="text"
                //                                 className="border-0 px-3 py-3 mt-1.5 mb-6 placeholder-gray-500 text-blueGray-600 rounded text-xl shadow focus:outline-none focus:ring-1 w-full ease-linear transition-all duration-150"
                //                                 placeholder={user?.first_name}
                //                                 name="first_name"
                //                                 onChange={handleChangeUserInfo}                                      
                //                             />
                //                         </label>
                //                     </div>
                //                 </div>

                //                 {/* Last Name */}
                //                 <div className="w-full lg:w-6/12 px-4">
                //                     <div className="relative w-full mb-3">
                //                         <label
                //                             className="block uppercase text-blueGray-600 text-lg tracking-tightener font-bold mb-2"
                //                             htmlFor="last_name">
                //                             Last Name     

                //                             <input
                //                                 type="text"
                //                                 className="border-0 px-3 py-3 mt-1.5 mb-6 placeholder-gray-500 text-blueGray-600 rounded text-xl shadow focus:outline-none focus:ring-1 w-full ease-linear transition-all duration-150"
                //                                 placeholder={user?.last_name}
                //                                 name="last_name"
                //                                 onChange={handleChangeUserInfo}                                            
                //                             />
                //                         </label>
                //                     </div>
                //                 </div>

                //                 {/* E-mail */}
                //                 <div className="w-full lg:w-6/12 px-4">
                //                     <div className="relative w-full mb-3">
                //                         <label
                //                             className="block uppercase text-blueGray-600 text-lg tracking-tightener font-bold mb-2"
                //                             htmlFor="email">
                //                             Email address
                                        
                //                             <input
                //                                 type="text"
                //                                 className="border-0 px-3 py-3 mt-1.5 mb-6 placeholder-gray-500 text-blueGray-600 rounded text-xl shadow focus:outline-none focus:ring-1 w-full ease-linear transition-all duration-150 hover:cursor-not-allowed"                                              
                //                                 placeholder={user?.email} 
                //                                 name="email"
                //                                 onChange={handleChangeUserInfo} 
                //                                 readOnly                                                                                           
                //                             />
                //                         </label>
                //                     </div>
                //                 </div>

                //                 {/* Phone Number */}
                //                 <div className="w-full lg:w-6/12 px-4">
                //                     <label
                //                         className="block uppercase text-blueGray-600 text-lg tracking-tightener font-bold mb-2"
                //                         htmlFor="phone">
                //                         Phone Number
                                    
                //                         <input
                //                             type="number"
                //                             min={0}
                //                             className="border-0 px-3 py-3 mt-1.5 mb-6 placeholder-gray-500 text-blueGray-600 rounded-lg text-xl tracking-verytight shadow focus:outline-none focus:ring-1 w-full ease-linear transition-all duration-150 h-168 indent-3 appearance-none"
                //                             placeholder={user?.phone}
                //                             name="phone"
                //                             onChange={handleChangeUserInfo}                                            
                //                         />
                //                     </label>
                //                 </div>  

                //             </div>

                //             <hr className="mt-6 border-b-1 border-blueGray-300" />

                //             <h6 className="text-gray-500 text-lg mt-10 mb-8 px-4 font-bold uppercase">
                //                 Contact Information
                //             </h6>
                //             <div className="flex flex-wrap">

                //                 {/* ADDRESS AND ADDRESS 2 */}
                //                 <div className="w-full lg:w-12/12 px-4 flex gap-8">

                //                     {/* Address */}
                //                     <div className="relative w-3/6 mb-3">
                //                         <label
                //                             className="block uppercase text-blueGray-600 text-lg tracking-tightener font-bold mb-2"
                //                             htmlFor="address">
                //                             Address

                //                             <input
                //                                 type="text"
                //                                 className="border-0 px-3 py-3 mt-1.5 mb-6 placeholder-gray-500 text-blueGray-600 rounded text-xl shadow focus:outline-none focus:ring-1 w-full ease-linear transition-all duration-150"                                                
                //                                 placeholder={user?.address}
                //                                 name="address"
                //                                 onChange={handleChangeUserInfo}                                              
                //                             />
                //                         </label>
                //                     </div>

                //                     {/* Address 2 */}
                //                     <div className="relative w-3/6 mb-3">
                //                         <label
                //                             className="block uppercase text-blueGray-600 text-lg tracking-tightener font-bold mb-2"
                //                             htmlFor="address2">
                //                             Address 2
                                       
                //                             <input
                //                                 type="text"
                //                                 className="border-0 px-3 py-3 mt-1.5 mb-6 placeholder-gray-500 text-blueGray-600 rounded text-xl shadow focus:outline-none focus:ring-1 w-full ease-linear transition-all duration-150"
                //                                 placeholder={user?.address2}
                //                                 name="address2"
                //                                 onChange={handleChangeUserInfo}                                        
                //                             />
                //                         </label>
                //                     </div>
                                    
                //                 </div>

                //                 {/* CITY AND STATE */}    
                //                 <div className="w-full lg:w-12/12 px-4 flex gap-8">
                                    
                //                     {/* City */}
                //                     <div className="relative w-3/6 mb-3">
                //                         <label
                //                             className="block uppercase text-blueGray-600 text-lg tracking-tightener font-bold mb-2"
                //                             htmlFor="city">
                //                             City
                                        
                //                             <input
                //                                 type="text"
                //                                 className="border-0 px-3 py-3 mt-1.5 mb-6 placeholder-gray-500 text-blueGray-600 rounded text-xl shadow focus:outline-none focus:ring-1 w-full ease-linear transition-all duration-150"                                            
                //                                 placeholder={user?.city}
                //                                 name="city"
                //                                 onChange={handleChangeUserInfo}                                                
                //                             />
                //                         </label>
                //                     </div>

                //                     {/* State */}
                //                     <div className="relative w-3/6 mb-3">
                //                         <label
                //                             className="block uppercase text-blueGray-600 text-lg tracking-tightener font-bold mb-2"
                //                             htmlFor="state">
                //                             State
                                       
                //                             <input
                //                                 type="text"
                //                                 className="border-0 px-3 py-3 mt-1.5 mb-6 placeholder-gray-500 text-blueGray-600 rounded text-xl shadow focus:outline-none focus:ring-1 w-full ease-linear transition-all duration-150"                                              
                //                                 placeholder={user?.state}
                //                                 name="state"
                //                                 onChange={handleChangeUserInfo}                                               
                //                             />
                //                         </label>
                //                     </div>
                               
                //                 </div>

                //                 {/* COUNTRY AND POSTAL CODE */}
                //                 <div className="w-full lg:w-12/12 px-4 flex gap-8">
                                    
                //                     {/* Country */}
                //                     <div className="relative w-3/6 mb-3">
                //                         <label
                //                             className="block uppercase text-blueGray-600 text-lg tracking-tightener font-bold mb-2"
                //                             htmlFor="country">
                //                             Country
                                       
                //                             <input
                //                                 type="text"
                //                                 className="border-0 px-3 py-3 mt-1.5 mb-6 placeholder-gray-500 text-blueGray-600 rounded text-xl shadow focus:outline-none focus:ring-1 w-full ease-linear transition-all duration-150"                                              
                //                                 placeholder={user?.country}
                //                                 name="country"
                //                                 onChange={handleChangeUserInfo}                                                
                //                             />
                //                         </label>
                //                     </div>

                //                     {/* Postal Code */}
                //                     <div className="relative w-3/6 mb-3">
                //                         <label
                //                             className="block uppercase text-blueGray-600 text-lg tracking-tightener font-bold mb-2"
                //                             htmlFor="postalCode">
                //                             Postal Code
                                     
                //                             <input
                //                                 type="text"
                //                                 className="border-0 px-3 py-3 mt-1.5 mb-6 placeholder-gray-500 text-blueGray-600 rounded-xl text-xl shadow focus:outline-none focus:ring-1 w-full ease-linear transition-all duration-150"
                //                                 placeholder={user?.postalCode}
                //                                 name="postalCode"
                //                                 onChange={handleChangeUserInfo}                                               
                //                             />
                //                         </label>
                //                     </div>

                //                 </div>

                //             </div>                              

                //             <hr className="mt-6 border-b-1 border-blueGray-300" />

                //             <h6 className="text-gray-500 text-lg mt-10 mb-8 px-4 font-bold uppercase">
                //                 additional information
                //             </h6>
                //             <div className="flex flex-wrap">
                                
                //                 {/* OPTIONALS: */}
                //                 <div className="w-full lg:w-12/12 px-4">

                //                     {/* BIO */}
                //                     <div className="relative w-full mb-3">
                //                         <label
                //                             className="block uppercase text-blueGray-600 text-lg tracking-tightener font-bold mb-2"
                //                             htmlFor="aboutMe">
                //                             bio
                                    
                //                             <textarea
                //                                 type="text"
                //                                 className="border-0 py-6 indent-4 mt-1.5 mb-6 placeholder-gray-500 text-blueGray-600 bg-gray-900 rounded text-xl shadow hover:bg-white focus:bg-white focus:outline-none focus:ring-1 w-full ease-linear transition-all duration-150"                                                
                //                                 placeholder={user?.aboutMe}
                //                                 name="aboutMe"
                //                                 onChange={handleChangeUserInfo}                                              
                //                                 rows="8">
                //                             </textarea>
                //                         </label>
                //                     </div>

                //                 </div>

                //             </div>

                //             <div className="rounded-t px-6 mt-4 mb-4">
                //                 <div className="text-center flex justify-start">
                //                     <button type="submit"
                //                         onClick={handleSubmitUserInfo}
                //                         className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-semibold uppercase text-lg tracking-verytight px-8 py-4 rounded-xl shadow hover:bg-blue-600 hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                //                     > Submit</button>
                //                 </div>
                //             </div>
                //         </form>
                //     </div>                   
                // </div>  
