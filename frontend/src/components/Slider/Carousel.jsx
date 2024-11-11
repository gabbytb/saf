function Carousel({ blogs }) {
    const [imageIndex, setImageIndex] = useState(0);
  
    const transformDate = (date) => {
      return date.substring(0, 10);
    };
  
    const NextArrow = ({ onClick }) => {
      return (
        <div className={`${styles.arrow} ${styles.next}`} onClick={onClick}>
          <FaArrowRight />
        </div>
      );
    };
  
    const PrevArrow = ({ onClick }) => {
      return (
        <div className={`${styles.arrow} ${styles.prev}`} onClick={onClick}>
          <FaArrowLeft />
        </div>
      );
    };
  
    useEffect(() => {
      document.querySelectorAll(".slick-active").forEach((el) => {
        el.style.setProperty("position", "static", "important");
      });
  
      document
        .querySelectorAll(".slick-current")
        .style.setProperty("position", "relative", "important");
      document
        .querySelectorAll(".slick-current")
        .style.setProperty("z-index", "50", "important");
    }, [imageIndex]);
  
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      centerMode: true,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
      beforeChange: (current, next) => setImageIndex(next),
    };
  
    return (
      <div className={styles.carouselContainer}>
        <Slider {...settings}>
          {blogs.map((blog, idx) => (
            <div key={idx}>
              <div
                className={
                  idx === imageIndex
                    ? `${styles.innerSlide} ${styles.activeSlide}`
                    : `${styles.innerSlide} ${styles.passiveSlide}`
                }
              >
                <p>{transformDate(blog.created_on)}</p>
                <h3>{blog.title}</h3>
                <p>{blog.subtitle}</p>
                <button
                  className={
                    idx === imageIndex
                      ? `${styles.button} ${styles.activeButton}`
                      : styles.button
                  }
                >
                  <Link href={"/blog/" + blog.id}>READ MORE</Link>
                </button>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    );
}
  
export default Carousel;