import { Suspense, lazy, useEffect } from "react";
const Nav = lazy(() => import("../components/Nav"));
const OurProgressBody = lazy(() => import("../components/OurProgressBody"));
const Footer = lazy(() => import("../components/Footer"));










const OurProgress = () => {


    useEffect(() => {
        const pageTitle = "Our Progress", siteTitle = "Samuel Akinola Foundation";
        document.title = `${pageTitle} | ${siteTitle}`;
    }, []);

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

            <Nav />
            <div className="absolute top-0 w-full -z-10">
                <OurProgressBody />
                <Footer />
            </div>
        </Suspense>
    );
};


export default OurProgress;
