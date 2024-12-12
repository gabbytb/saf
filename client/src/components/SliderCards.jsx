import { Link } from "react-router-dom"


const SliderCards = ({ linkURL, label }) => {


    return (
      <Link to={linkURL} className="slider-item">
          <h4>{label}</h4>
      </Link>
    );
};


export default SliderCards;
