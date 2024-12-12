import { useRef, useEffect } from 'react';
import { useInViewport } from 'react-in-viewport';
import { ButtonLinkComponent, GraphComponent } from "../../components"








const OurProgressSectionTwo = () => {


  
    const myRef = useRef();
    const { inViewport } = useInViewport(
        myRef, // options, config = { disconnectOnLeave: false }, props
    );
    // console.log('In ViewPort: ', inViewport);



    useEffect(() => {
        function myFunction() {  
            if (inViewport) { 
                          
                setTimeout(() => {
                  document.querySelector('.card-item-one').classList.add('s-2-rc-1');

                  var reveal = document.getElementById('sectionTwoID');
                  if (reveal.classList.contains('opacity-0')) {
                    reveal.classList.remove('opacity-0');
                    reveal.classList.add('ease-out-anime');
                  };
                }, 0);
                
                setTimeout(() => {
                  document.querySelector('.card-item-two').classList.add('s-2-rc-2');
                }, 180);
                            
                setTimeout(() => {
                  document.querySelector('.card-item-three').classList.add('s-2-rc-3');
                }, 220);

                setTimeout(() => {
                  document.querySelector('.home-section-two--left h2').classList.remove('opacity-0');
                  document.querySelector('.home-section-two--left h2').classList.add('s-2-l2-anim');

                  document.querySelector('.home-section-two--left h2 span').classList.remove('opacity-0');
                  document.querySelector('.home-section-two--left h2 span').classList.add('s-2-ls-anim');

                  document.querySelector('.home-section-two--left h5').classList.remove('opacity-0');
                  document.querySelector('.home-section-two--left h5').classList.add('s-2-l5-animreverse');  

                  document.querySelector('.home-section-two--left div a').classList.remove('opacity-0');
                  document.querySelector('.home-section-two--right svg').classList.remove('opacity-0');
                  document.querySelector('.home-section-two--right svg').classList.add('animate-slideUp');
                }, 1300);    
                        
            } 
        };
        
        myFunction();        
    }, [inViewport]);



    return (
      <section id="sectionTwoID" className="home-section-two opacity-0">
        {/* {`Enter viewport: ${enterCount} times`} */}
          <div className="h-container-2 container">
              <div className="grid sm:grid sm:grid-cols-18 gap-16 px-10 min-h-138">


                  {/* Left Side */}
                  <div className="home-section-two--left">
                    <div className="flex flex-col pt-5 space-y-12 sm:space-y-16 lg:space-y-12 w-136">
                        <h2 className="opacity-0">Get a <span className="opacity-0">little</span>&nbsp; richer each day</h2>
                        <h5 className='opacity-0'>One small step today, a giant leap for tomorrow.</h5>
                        <ButtonLinkComponent 
                            linkURL="https://cowrywise.com/choose-account" 
                            label="Start your financial journey"
                            btnProps="rounded-lg shadow-lg opacity-0"
                            btnBg
                        />
                    </div>
                  </div>
                  {/* Left Side */}




                  {/* Right Side */}
                  <div className="home-section-two--right">
                      <div>
                        {/* <div id="bar-anima--wrap"> */}
                        <GraphComponent />
                      </div>

                      <div ref={myRef} className="card-item-one card-wrap">
                        <div className="card-item">
                          <h6>Build your savings</h6>
                          <p>Consistently automate your savings while setting realistic goals.</p>
                        </div>
                      </div>

                      <div className="card-item-two card-wrap">
                        <div className="card-item">
                          <h6>Invest deliberately</h6>
                          <p>Invest in our diverse range of assets that grow in value over time.</p>
                        </div>
                      </div>

                      <div className="card-item-three card-wrap">
                        <div className="card-item">
                          <h6>Stay rich ✨</h6>
                          <p>Protect your wealth by managing risk, seeking advice and making smart financial decisions.</p>
                        </div>
                      </div>
                  </div>
                  {/* Right Side */}


              </div>
          </div>
          {/* {`Leave viewport: ${leaveCount} times`} */}
      </section>
    );
};

export default OurProgressSectionTwo;
