const TestimonialThumbnails = ({ activeImage, exactItem, changeActiveImage}) => {


    function handleActiveImage() {
        if (activeImage !== exactItem.imgURI) {
            changeActiveImage(exactItem.imgURI);
        };
    };
    

    return (
        <img className="img-click" src={exactItem.imgURI} alt={exactItem.label} onClick={handleActiveImage} />
    );
};


export default TestimonialThumbnails;
