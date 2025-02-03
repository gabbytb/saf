import { Suspense, lazy, useEffect } from "react";
import api from "../api";
const NavSlider = lazy(() => import("../components/Navbars/NavSlider"));
const OurProgressBody = lazy(() => import("../components/OurProgressBody"));
const Footer = lazy(() => import("../components/Footer"));










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



const OurProgress = () => {



    // *************************** //
    // *** SET PAGE TITLE(SEO) *** //
    // *************************** //
    useEffect(() => {
        const pageTitle = "Our Progress", siteTitle = "Samuel Akinola Foundation";
        document.title = `${pageTitle} | ${siteTitle}`;

        logEvent(`User visited ${pageTitle} page`);
    }, []);
    // *************************** //
    // *** SET PAGE TITLE(SEO) *** //
    // *************************** //


    
    // const [progress, setProgress] = useState(0);

    // async function autoIncrement() {
    //   for (var n = 0; n < 100; n++) {
    //     if (n < 100) {
    //       n++;
    //       setProgress(n);
    //       return progress;
    //     };
    //   };
    // };


    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div className="jumbu">
                <label htmlFor="file" className="progress_label">
                  <progress id="file" className="flex" value={70} max={100}>CLICK OVER HERE</progress>
                </label>
            </div>

            <NavSlider />
            <div className="absolute top-0 w-full -z-10">
                <OurProgressBody />
                <Footer />
            </div>
        </Suspense>
    );
};


export default OurProgress;
