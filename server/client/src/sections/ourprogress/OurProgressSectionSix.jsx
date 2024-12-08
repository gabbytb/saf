import { Link } from "react-router-dom";
import { ArrowRight } from "../../assets/icons";





const OurProgressSectionSix = () => {
    
    return (
      <section className="home-section-six">
          <div className="h-container-6 container">

            
            <div className="lg:flex lg:flex-row">
              <div className="sm:w-full xl:w-5/12 home-section-six--left">
                <h2>Keeping your money safe is our business.</h2>
                <p>Trust is our currency. We are committed to the security of your money and the protection of your account.</p>
                <Link to="https://cowrywise.com/security" target="_blank">
                  Learn More <ArrowRight />
                </Link>
              </div>
            </div>


            <div className="flex flex-col lg:flex lg:flex-row lg:w-full lg:flex-wrap home-section-six--right">
              <div className="card-item">
                <div className="card-item--icon">
                  <h5>Top-Notch Security</h5>
                  <p>We use industry-standard encryption technology to protect user data. We also use two-factor authentication to verify all customer accounts, so you can be sure that your funds are safe and secure.</p>
                </div>
              </div>
              <div className="sm:ml-0 xl:ml-44 card-item">
                <div className="card-item--icon">
                  <h5>Assets Custody</h5>
                  <p>We use industry-standard encryption technology to protect user data. We also use two-factor authentication to verify all customer accounts, so you can be sure that your funds are safe and secure.</p>
                </div>
              </div>
              <div className="card-item">
                <div className="card-item--icon">
                  <h5>Regulatory Compliance</h5>
                  <p>We use industry-standard encryption technology to protect user data. We also use two-factor authentication to verify all customer accounts, so you can be sure that your funds are safe and secure.</p>
                </div>
              </div>
              <div className="sm:ml-0 xl:ml-44 card-item">
                <div className="card-item--icon">
                  <h5>Best-In-Class Assets</h5>
                  <p>We use industry-standard encryption technology to protect user data. We also use two-factor authentication to verify all customer accounts, so you can be sure that your funds are safe and secure.</p>
                </div>
              </div>
            </div>
          </div>
      </section>
    );
};

export default OurProgressSectionSix;
