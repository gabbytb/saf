import { useEffect, useRef, } from 'react';
import { ArrowDown } from "../../assets/icons";
import { ButtonComponent, ButtonLinkComponent } from "../../components";
import { useInViewport } from 'react-in-viewport';







const OurProgressSectionThree = () => {

    
    // const [isVisible, setIsVisible] = useState(false);
    const myRef = useRef();
    const { inViewport, enterCount } = useInViewport(myRef);


    useEffect(() => {
        function myFunction() {
            if (inViewport && enterCount === 1) {
                setTimeout(() => {
                    document.querySelector(".roi-investments-overlay").classList.remove('hidden');
                    document.querySelector(".roi-investments-overlay").classList.add('ease-out-anime');
                }, 500);
            };

            document.querySelector(".roi-investments-overlay").classList.add('hidden'); 
        };
        myFunction();
    // eslint-disable-next-line
    }, [inViewport]);



    return (
        <section className="home-section-three">
            <div className="h-container-3 container">


                <div className="content">
                    <h2>Stay the course, reap the rewards</h2>
                    <div className="roi-wrap">
                        <h6>If you invested</h6>
                        <div className="roi-input">
                            <sup>₦</sup>
                            <input type="tel" defaultValue="100,000" />
                        </div>
                        <div className="roi-dropdown-wrap">
                            <div className="wrap-selection">
                                <select className="roi--select-input">
                                    <option value="onetime">Onetime</option>
                                    <option value="weekly">Weekly</option>
                                    <option select='true' value="monthly">Monthly</option>
                                </select>
                                <div className="roi--select-arrow"><ArrowDown /></div>
                            </div>
                            <div className="wrap-selection">    
                                <select className="roi--select-input">
                                    <option value="12">Last year</option>
                                    <option select='true' value="36">3 years ago</option>
                                    <option value="60">5 years ago</option>
                                </select>
                                <div className="roi--select-arrow"><ArrowDown /></div>
                            </div>
                        </div>
                    </div>
                    <div className="slider-wrap">
                        <div className="slider">
                            <input type="range" min="5000" max="10000000" step="1000" defaultValue="100000" />
                        </div>
                    </div>
                    <div ref={myRef} className="relative">
                        <div className="text-center roi-investment">
                            <h6>Today, you’d have</h6>
                            <p>
                                <sup>₦</sup>
                                <span>4,434,260</span>
                            </p>
                        </div>
                        <div className="text-center roi-investment-returns">
                            <div>₦834,260 earned in returns on Cowrywise</div>
                            <p>*In a bank, you’d earn <span>₦28,800</span></p>
                        </div>
                        <div id="investmentOverlay" className="flex flex-col justify-center items-center roi-investments-overlay">
                            <h3>Ready to start investing?</h3>
                            <ButtonLinkComponent 
                                btnBg 
                                btnProps="text-white text-2xl font-bold px-10 py-6"
                                linkURL="https://cowrywise.com/choose-account" 
                                label="Get Started" 
                            />
                            <ButtonComponent 
                                btnProps="text-blue-500 text-14xl/extra-loosened font-bold font-firma mt-4"
                                label="Not yet" 
                            />
                        </div>
                    </div>
                    <p>Calculations are based on the average performance of conservative mutual funds on Cowrywise from 2019. Calculation excludes processing fees.</p>                    
                </div>


            </div>
        </section>
    );
};

export default OurProgressSectionThree;
