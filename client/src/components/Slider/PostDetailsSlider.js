import Slider from "react-slick";
// import SliderCards from "../SliderCards";







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
        





const PostDetailsSlider = ({ sliderCards }) => {

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
                    slidesToScroll: 1,              
                }
            }
        ]
    };

    return (
        <div className="slider-container h-full w-full">
            <Slider {...settings} className='grid h-full'>
                {
                    sliderCards?.images?.map((item, index) => {
                        // if (!item?.featured) {
                            return (
                                <div key={index} className="slider-wrapper flex">
                                    <div className="img-body flex h-98 w-full">
                                        <img className="w-full" 
                                            src={item?.url}
                                            alt={item?.alt}
                                            loading="lazy"
                                            srcSet={`${item?.url} 800w,
                                                     ${item?.url} 1200w`}
                                            sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 800px" />
                                    </div>
                                </div>
                            );
                        // };
                    })
                } 
            </Slider> 
        </div>   
    );
};

export default PostDetailsSlider;