import { useState, useEffect } from "react";
import { flipItems } from "../../constants";
import { DisqusCard } from "../../components";






const OurProgressSectionSeven = () => {
    
    
    // eslint-disable-next-line
    const [itemsToFlip, setItemsToFlip] = useState(flipItems);
    
    
    const [count, setCount] = useState(0);


    

    useEffect(() => {
        function myFunction() {            
            for (var n = 0; n < itemsToFlip.length; n++) {    
                if (count <= n) {
                    setCount(count + 1);                   
                        
                    var disqusObj = document.querySelectorAll('.disqus');  
                    for (var i = 0; i < disqusObj.length; i++) {                                                            
                        if (count === i) { 
                            disqusObj[i].classList.remove('hidden');
                            disqusObj[i].classList.add('activate-first');
                                                                      
                            
                            var disqusA = document.querySelectorAll('.disqus-a');  
                            for (var u = 0; u < disqusA.length; u++) {
                                if (i === u) {
                                    disqusA[u].classList.add('activate-second');

                                    var lasIndex = disqusA.length - 1;
                                    if (lasIndex === u) {
                                        disqusA[u].classList.add('text-skin-lightblue');
                                    }
                                };                               
                            }
                        } else {
                            disqusObj[i].classList.remove('activate-first');
                            disqusObj[i].classList.add('hidden');
                        };
                    };
                } else {
                    setCount(0);
                };
            };
        };

               
        // Setup interval
        var intervalId = setInterval(myFunction, 2500);
    
        // Clean up interval when component unmount
        return () => {
            clearInterval(intervalId);
        };
    }, [count]); 
    // NOTE: Empty dependency array means this runs once on mount and cleans up on unmount
    



    return (
        <section className="home-section-seven">
            <div className="h-container-7 container">
                <div className="h-section-7-wrap">
                    <h6>why cowrywise?</h6>
                    <div id="disqusWrapID" className="relative">
                        {
                            flipItems.map((item) => {
                                return (
                                    <DisqusCard key={item.title} {...item} />
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        </section>
    );
};


export default OurProgressSectionSeven;
