import { 
    OurProgressSectionOne,
    OurProgressSectionTwo, 
    OurProgressSectionThree, 
    OurProgressSectionFour, 
    OurProgressSectionFive, 
    OurProgressSectionSix, 
    OurProgressSectionSeven, 
} from "../sections";



const OurProgressBody = () => {

    return (
        <main className="relative">
            <div>
                {/* <script src="https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.7.6/lottie_svg.min.js"></script> */}
                <OurProgressSectionOne />
                <OurProgressSectionTwo />
                <OurProgressSectionThree />
                <OurProgressSectionFour />
                <OurProgressSectionFive />
                <OurProgressSectionSix />
                <OurProgressSectionSeven />
            </div>
        </main>
    );
};


export default OurProgressBody;
