import React from "react";
import Slider from "react-slick";
import { AfroStyles } from "../../constants";






const SampleNextArrow = (props) => {  
    const { className, style, onClick } = props;
  
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "white" }}
        onClick={onClick}
      />
    );
};


const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;

    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "white" }}
        onClick={onClick}
      />      
    );
};
        


const PostDetailsSlider = () => {

    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,        
        initialSlide: 0,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: false,
                    dots: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <div className="slider-container h-full w-full">
            <Slider {...settings} className='grid h-full'>
                {
                    AfroStyles.map((item) => (
                        <div key={item.id} className="slider-wrapper">
                            <div className="img-body flex h-98">
                                <img src={item.src} alt={item.alt} className="w-full" />
                            </div>                        
                        </div>                
                    ))
                }
            </Slider> 
        </div>   
    );

};

export default PostDetailsSlider;