// import { useEffect } from "react";
// import ReactGA from 'react-ga';
import { Routes, Route, } from "react-router-dom";
// import { googleAnalytics } from "./constants";
import {   
    Home,
    DonateNow,
    BlogPosts,
    BlogSinglePost,
    OurProgress,     
    // DonationPage,
    // SignUp,
    // SignIn,
    // AdminDashboard, 
    // DashboardUsersPage, 
    // DashboardUsersDetailsPage,
    // DashboardStaffsPage, DashboardStaffsDetailsPage,
    // AccountUsers,
} from "./pages";
import { 
    SignUp,
    VerifySignUp,
    SignIn,

    Dashboard,
    DashboardBlogPosts,
    DashboardCreateBlog,
    DashboardUsers, 
    DashboardUsersDetails,
    DashboardStaffs,
    DashboardStaffsDetails,
} from "./layouts";
import { 
    Posts, 
} from "./redirects";






// const reactGA =`{ ${reactGA} }`;
// const reactGA =`${googleAnalytics.map(item => item.key)}`;



// The clearTimeout() method is a powerful JavaScript tool 
// that allows developers to clear and reset the timer 
// created by the setTimeout() method. 
// It is an invaluable asset to have in any software development project, 
// especially when you need to reset the timer 
// or delay a certain action within the code.
export default function App() {                                    

    // Initialize Google Analytics
    // ReactGA.initialize(`${reactGA}`);

    // useEffect(() => {
    //     // Optionally, you can use ReactGA.pageview to track page views
    //     ReactGA.pageview(window.location.pathname + window.location.search);   
    //     // ReactGA.pageview(console.log('WINDOW PATHNAME = ', window.location.pathname + window.location.search));
    //     // ReactGA.set({ page: window.location.pathname });
    // }, []);
    

    return (
        <Routes>
          {/* add routes without layouts */}
          {/* <Route path="/landing" exact component={Landing} /> */}
          {/* <Route path="/profile" exact component={Profile} /> */}
          <Route path="/user/signup" element={<SignUp />} />
          <Route path="/user/verify" element={<VerifySignUp />} />          
          <Route path="/user/login" element={<SignIn />} />        
          <Route path="/donations" element={<DonateNow />} />
          <Route path="/blog" element={<BlogPosts />} />  
          <Route path="/blog/page/:id" element={<BlogPosts />} />  
          <Route path="/blog/:slug" element={<BlogSinglePost />} />      
          {/* <Route path="/blog/page/:id" element={<BlogPostPages />} />   */}  
          {/* <Route path="/blog/page/:id" element={<BlogPostPages />} children=[] /> */}   
          <Route path="/blog/post" element={<Posts />} />      
          <Route path="/home" element={<OurProgress />} />
          <Route path="/" element={<Home />} />          



          {/* add routes with layouts */}
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/blog/manage" element={<DashboardBlogPosts />} />
          <Route path="/admin/blog/create" element={<DashboardCreateBlog />} />
          <Route path="/admin/users" element={<DashboardUsers />} />
          <Route path="/admin/users/:id" element={<DashboardUsersDetails />} />
          <Route path="/admin/staffs" element={<DashboardStaffs />} />  
          <Route path="/admin/staffs/:id" element={<DashboardStaffsDetails />}></Route>
        

          {/* add redirect for first page */}
          {/* <Redirect from="*" to="/" /> */}
          {/* <Route path="/admin/dashboard?logout" element={<Navigate replace to="/" />} /> */}
        </Routes>
    );
};


































// const routesConfig = [          
//     //  TEST ROUTES
//     { path: "/dash", element: <Admin /> },
//
//     //  MAIN ROUTES
//     { path: "/", element: <OurProgress /> },
//     { path: "/home", element: <Home /> },
//     { path: "/donations", element: <DonationPage /> },
//     { path: "/user/verify", element: <VerifySignUp /> },
//     // { path: "/user/verify/:token", element: <VerifySignUp />, },
//     { path: "/user/signup", element: <SignUp />, },
//     { path: "/user/login", element: <SignIn />, },
//     { path: "/admin/dashboard", element: <AdminDashboard />, },
//     { path: "/admin/users/", element: <DashboardUsersPage />, },
//     { path: "/admin/users/:id", element: <DashboardUsersDetailsPage />, },
//     { path: "/admin/staffs", element: <DashboardStaffsPage />, },
//     { path: "/admin/staffs/:id", element: <DashboardStaffsDetailsPage />, },
//     { path: "/admin/users/management", element: <AccountUsers />, },
// ];
// const routes = useRoutes(routesConfig);
// return routes;



//   return (
//     <Routes>
//       <Route path="/" element={<Home />} />
//       <Route 
//          path: "/admin/staffs/", 
//          element: <DashboardStaffsPage />,    
//          children: [
//              {
//                   path: ":id",
//                    element: <DashboardStaffsDetailsPage />,
//              },
//          ]
//       />
//     </Routes>
//   );