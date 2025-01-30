import { Link } from "react-router-dom";


const FooterCard = ({ linkURL, label }) => {

    return (
        <Link to={linkURL}>
            {label}
        </Link>
    );
};

export default FooterCard;
