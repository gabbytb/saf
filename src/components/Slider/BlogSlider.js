import Slider from "react-slick";








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
        

const BlogSlider = ({ bgImage }) => {


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
                    bgImage?.images.map((item, index) => {
                        // if (!item?.featured) {
                            return (
                                <div key={index} className="slider-wrapper">
                                    <div className="img-body flex h-98">
                                        <img className="w-full" src={item?.url} alt={item?.alt} />
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