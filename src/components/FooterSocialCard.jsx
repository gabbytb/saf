import { Link } from "react-router-dom";


const FooterSocialCard = ({ linkURL, iconURI}) => {


    return (
      <Link to={linkURL}>
          {iconURI}
      </Link>
    );
};


export default FooterSocialCard;
