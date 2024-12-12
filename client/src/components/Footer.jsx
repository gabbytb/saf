import { Link } from "react-router-dom";
import { AppStoreIcon, ArrowRight, PlayStoreIcon, StarRating, } from "../assets/icons";
import { footerCompany, footerProduct, footerResources, footerContact, footerLinks, } from "../constants";
import { ButtonComponent, FooterCard, FooterSocialCard, } from ".";





const Footer = () => {
  return (
    <footer className="w-full relative">
        <div className="container-fc container">
            <div className="app-reviews mt-8 mb-40">

                {/* Left Side Element */}
                <div className="app-review--card">

                    {/* top review card */}
                    <div className="top-review--card">
                        <div className="r-star-rating">
                            <h3>4.5<sub>/5</sub></h3>
                            <StarRating />
                        </div>
                        <Link to="https://cwry.se/app">
                            <PlayStoreIcon />
                        </Link>
                    </div>
                    {/* top review card */}


                    {/* bottom review card */}
                    <div className="flex flex-col bottom-review--card">
                        <h6>Available on the Play Store</h6>
                        <p>“I was able to achieve my one year goal of saving a particular amount of money every month.” - Lilian, May 2023</p>
                        <Link to="https://cwry.se/app">
                            Download now
                            <ArrowRight />
                        </Link>
                    </div>
                    {/* bottom review card */}
                    
                </div>
                {/* Left Side Element */}






                {/* Right Side Element */}
                <div className="app-review--card">

                    {/* top review card */}
                    <div className="top-review--card">
                        <div className="r-star-rating">
                            <h3>4.4<sub>/5</sub></h3>
                            <StarRating />
                        </div>
                        <Link to="https://cwry.se/app">
                            <AppStoreIcon />
                        </Link>
                    </div>
                    {/* top review card */}


                    {/* bottom review card */}
                    <div className="flex flex-col bottom-review--card">
                        <h6>Available on the App Store</h6>
                        <p>“I love the option of being able to lock my money without being able to withdraw it until full term. This is the most important and amazing feature 😍” - Chidiebere, May 2023</p>
                        <Link to="https://cwry.se/app">
                            Download now
                            <ArrowRight />
                        </Link>
                    </div>
                    {/* bottom review card */}

                </div>
                {/* Right Side Element */}

            </div>

            <div className="shadow-2xl rounded-3xl footer-email--wrap">
                <div className="sm:basis-5/12 p-4">
                    <h3 className="text-white font-semibold">Sign up for free.<br/>Start investing today.</h3>
                </div>
                <div className="sm:basis-1/2 lg:basis-5/12 p-4">
                    <form className="w-full" action="https://cowrywise.com/choose-account" method="GET">
                        <div className="footer_email">
                            <input className="text--white" type="email" name="email" required="required" placeholder="Your email..." />
                            {/* <input type="hidden" name="utm_source" value="web">
                            <input type="hidden" name="utm_medium" value="button">
                            <input type="hidden" name="utm_campaign" value="web_signup"> */}
                            <ButtonComponent 
                                btnProps="hidden sm:block text-black bg-white capitalize h-20 px-12 text-14xl font-semibold shrink-0 rounded-xl absolute top-106 right-106"
                                btnType="submit" 
                                label="Sign up for free" 
                            />
                        </div>
                        <ButtonComponent 
                            btnProps="block sm:hidden text-center text-14xl text-black font-semibold capitalize bg-white h-20 px-12 mt-8 shrink-0 rounded-xl"
                            btnType="submit" 
                            label="Sign up for free" 
                        />
                    </form>
                </div>
            </div>

            <div className="flex flex-row footer-menu--wrap">
                <div className="basis-1/4 p-4">
                    <h4>company</h4>
                    <ul>
                        {
                            footerCompany.map((item) => {
                                return (
                                    <li key={item.label}>
                                        <FooterCard {...item} />
                                    </li>
                                );
                            })
                        }
                    </ul>
                </div>
                <div className="basis-1/4 p-4">
                    <h4>product</h4>
                    <ul>
                        {
                            footerProduct.map((item) => {
                                return (
                                    <li key={item.label}>
                                        <FooterCard {...item} />
                                    </li>
                                );
                            })
                        }
                    </ul>
                </div>
                <div className="basis-1/4 p-4">
                    <h4>resources</h4>
                    <ul>
                        {
                            footerResources.map((item) => {
                                return (
                                    <li key={item.label}>
                                        <FooterCard {...item} />
                                    </li>
                                );
                            })
                        }
                    </ul>
                </div>
                <div className="basis-1/4 p-4">
                    <h4>contact</h4>
                    <ul>
                        {
                            footerContact.map((item) => {
                                return (
                                    <li key={item.label}>
                                        <FooterCard {...item} />
                                    </li>
                                );
                            })
                        }
                    </ul>
                </div>
            </div>

            <hr/>
            
            <div className="flex footer-social--wrap">
                <div className="basis-7/12 p-4 h-28">
                    <ul>
                        <li>
                            {
                                footerLinks.map((item) => {
                                    return (
                                        <FooterSocialCard key={item.linkURL} {...item} />
                                    );
                                })
                            }
                        </li>
                    </ul>
                </div>
            </div>

            <div className="flex justify-between footer-badge">
                <div>
                    <p>🇳🇬 &nbsp; 5C Reverend Ogunbiyi Street, Ikeja GRA, Lagos Nigeria.</p>
                    <p>🇺🇸 &nbsp; 2261 Market Street #4817 San Francisco, CA 94114</p>
                </div>
                <div></div>
            </div>
        </div>
    </footer>
  );
};

export default Footer;
