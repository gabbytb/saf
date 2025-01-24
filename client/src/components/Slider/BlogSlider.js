import Slider from "react-slick";








const SampleNextArrow = (props) => {  
    const { className, style, onClick } = props;
  
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "transparent", zIndex: 1, top: "12rem", right: "3rem", }}
        onClick={onClick}
      />
    );
};

const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;

    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "transparent", zIndex: 1, top: "12rem", left: "2rem", }}
        onClick={onClick}
      />      
    );
};
        






const BlogSlider = ({ sliderCards }) => {


    var settings = {
        dots: false,
        infinite: true,
        // speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,        
        initialSlide: 0,   // By index number
        autoplay: true, 
        speed: 2000, 
        autoplaySpeed: 8200,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 2,
                    infinite: true,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,    
                    infinite: true,          
                }
            }
        ],
        autoPlay: true,
    };


    return (
        <div className="slider-container h-full w-full">
            <Slider {...settings} className='block h-full w-full m-auto relative'>
                {
                    sliderCards?.map((item, index) => {
                        // if (!item?.featured) {
                            return (
                                <div key={index} className="slider-wrapper">
                                    <div className="flex w-full h-98">
                                        <img className="w-full" src={item?.url} alt={item?.label} />
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

export default BlogSlider;