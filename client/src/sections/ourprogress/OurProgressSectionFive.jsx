import { useRef, useEffect } from "react";
import { useInViewport } from "react-in-viewport";
import { investmentPlatform } from "../../assets/images";
import { ButtonLinkComponent } from "../../components";




const OurProgressSectionFive = () => {


    const myRef = useRef();
    const { inViewport } = useInViewport(myRef);


    useEffect(() => {
        function myFunction() {
            if (inViewport) {
                console.log("Section 5 is in Viewport: ", inViewport);
                setTimeout(() => {
                    document.querySelector('#registrationsStepsId .step-one').classList.remove('opacity-50');
                    setTimeout(() => {
                        document.querySelector('#registrationsStepsId .step-one').classList.add('ease-in-anim');
                        // countValue[n]?.classList.add("s-5-anim");
                    }, 300);
                    document.querySelector('#registrationsStepsId .step-one .step-item-count').classList.add('ease-in-anim');
                }, 400);

                setTimeout(() => {
                    document.querySelector('#registrationsStepsId .step-two').classList.remove('opacity-50');
                    setTimeout(() => {
                        document.querySelector('#registrationsStepsId .step-two').classList.add('ease-in-anim');
                        // countValue[n]?.classList.add("s-5-anim");
                    }, 700);
                    document.querySelector('#registrationsStepsId .step-two .step-item-count').classList.add('ease-in-anim');
                }, 800);

                setTimeout(() => {
                    document.querySelector('#registrationsStepsId .step-three').classList.remove('opacity-50');
                    setTimeout(() => {
                        document.querySelector('#registrationsStepsId .step-three').classList.add('ease-in-anim');
                        // countValue[n]?.classList.add("s-5-anime");
                    }, 1100);
                    document.querySelector('#registrationsStepsId .step-three .step-item-count').classList.add('ease-in-anim');
                }, 1200);
            };
        };
        myFunction();
    }, [inViewport]);


    
    return (
        <section className="home-section-five">
            <div className="h-container-5 container">
                <div className="lg:flex lg:flex-row">
                    <div className="home-section-five--left">
                        <div className="h-investment-wrap">
                            <img src={investmentPlatform} alt="save online Nigeria cowrywise" />
                        </div>
                    </div>
                    <div className="home-section-five--right">
                        <h2>It only takes 5 minutes</h2>
                        <div id="registrationsStepsId">

                            {/* First Step */}
                            <div className="step-item step-one opacity-50">
                                <span className="h-full step-item-count"></span>
                                <div className="step-item-info">
                                    <span>Create an account</span>
                                    <p>Sign up for an account with your name, email and phone number.</p>
                                </div>
                            </div>
                            {/* First Step */}


                            {/* Second Step */}
                            <div className="step-item step-two opacity-50">
                                <span className="h-full step-item-count"></span>
                                <div className="step-item-info">
                                    <span ref={myRef}>Add a payment method</span>
                                    <p>Using your debit card or a bank transfer, setup your first plan.</p>
                                </div>
                            </div>
                            {/* Second Step */}


                            {/* Third Step */}
                            <div className="step-item step-three opacity-50">
                                <span className="h-full step-item-count"></span>
                                <div className="step-item-info">
                                    <span>Watch your money grow</span>
                                    <p>Sit back, relax & let your money work for you all day, everyday.</p>
                                </div>
                            </div>
                            {/* Third Step */}


                        </div>
                        <ButtonLinkComponent 
                            btnBg 
                            btnProps="text-white text-14xl font-bold px-10 py-6 capitalize"
                            linkURL="https://cowrywise.com/choose-account" 
                            label="Sign up now" 
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OurProgressSectionFive;
