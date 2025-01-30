// import { useEffect } from "react";
// import ReactGA from 'react-ga';
import { Routes, Route, } from "react-router-dom";
// import { googleAnalytics } from "./constants";


// Use React.lazy to load the About component only when needed
// const About = React.lazy(() => import('./About'));
// const Home = React.lazy(() => import('./Home'));


import {   
    Home,
    
    ArticlesList,
    // ArticlesListPublished,
    ArticleDetails,

    DonationsList,
    // DonationDetails,

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
    TestVerification,
    // TestVerifySignUp,
    SignIn,


    Dashboard,

    DashboardArticles,    
    DashboardArticlesDetails,
    DashboardCreateArticle,

    DashboardDonations,
    // DashboardDonationsDetails,
    DashboardCreateDonation,
    DashboardDonationsHistory,
    
    DashboardUsers, 
    DashboardUsersDetails,
    DashboardStaffs,
    DashboardStaffsDetails,
    DashboardCreateUser,

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
          <Route path="/user/verify" element={<TestVerification />} />    
          <Route path="/user/login" element={<SignIn />} />        
        
          <Route path="/blog" element={<ArticlesList />} />
          {/* <Route path="/blog" element={<ArticlesListPublished />} />            */}
          <Route path="/blog/page/:id" element={<ArticleDetails />} />         
          <Route path="/blog/page" element={<Posts />} />

          <Route path="/blog/:slug" element={<ArticleDetails />} />        
          
          <Route path="/donations" element={<DonationsList />} />

          {/* <Route path="/blog/page/:id" element={<BlogPostPages />} />   */}  
          {/* <Route path="/blog/page/:id" element={<BlogPostPages //>} children=[] /> */}   

          <Route path="/home" element={<OurProgress />} />

          <Route path="/" element={<Home />} />          



          {/* add routes with layouts */}
          <Route path="/admin/dashboard" element={<Dashboard />} />


          <Route path="/admin/blog/manage" element={<DashboardArticles />} />
          <Route path="/admin/blog/create" element={<DashboardCreateArticle />} />
          <Route path="/admin/blog/manage/:id" element={<DashboardArticlesDetails />} />
          

          <Route path="/admin/donations/manage" element={<DashboardDonations />} />
          <Route path="/admin/donations/manage/create" element={<DashboardCreateDonation />} />
          {/* <Route path="/admin/donations/manage/:id" element={<DashboardDonationsDetails />} />     */}
          <Route path="/admin/donations/history" element={<DashboardDonationsHistory />} />


          <Route path="/admin/users" element={<DashboardUsers />} />
          <Route path="/admin/users/:id" element={<DashboardUsersDetails />} />
          <Route path="/admin/staffs" element={<DashboardStaffs />} />  
          <Route path="/admin/staffs/:id" element={<DashboardStaffsDetails />}></Route>


          <Route path="/admin/staffs/manage/create" element={<DashboardCreateUser />} />


          {/* add redirect for first page */}
          {/* <Redirect from="*" to="/" /> */}
          {/* <Route path="/admin/dashboard?logout" element={<Navigate replace to="/" />} /> */}
        </Routes>
    );
};

















// import React, { Suspense } from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// // Use React.lazy to load the About component only when needed
// const About = React.lazy(() => import('./About'));
// const Home = React.lazy(() => import('./Home'));

// function App() {
//   return (
//     <Router>
//       <div>
//         <h1>My React App</h1>
//         <Switch>
//           {/* Route for Home */}
//           <Route exact path="/" component={Home} />

//           {/* Route for About, which will be lazily loaded */}
//           <Route path="/about">
//             {/* Suspense is needed to show a loading indicator while the About component is loading */}
//             <Suspense fallback={<div>Loading...</div>}>
//               <About />
//             </Suspense>
//           </Route>
//         </Switch>
//       </div>
//     </Router>
//   );
// }

// export default App;



// Explanation:
// React.lazy(() => import('./About')): This tells React to load the About component only when the user navigates to the /about route.

// Suspense: This is a wrapper component from React that shows something while the lazily loaded component is being fetched. In our case, we’re using a simple "Loading..." text to indicate that the About component is being loaded.

// fallback={<div>Loading...</div>}: This is the UI that will be shown while the component is loading.

// Step-by-Step Process:
// Create Components: Define the Home and About components as you normally would.
// Wrap the Routes with React.lazy(): Use React.lazy() for components that you want to load lazily (like About).
// Wrap Lazily Loaded Components with Suspense: Use Suspense to handle the loading state when the component is being fetched.
// 4. Final Result:
// Now, when you visit the /about page, the About component will only load at that moment, instead of loading it right when the app starts. This helps make the initial load faster!

// And that's it! You've just set up lazy loading in React using React.lazy() and Suspense. It’s super simple, right?













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