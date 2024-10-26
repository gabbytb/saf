import { Link } from "react-router-dom";


const ButtonLinkComponent = ({ linkURL, btnProps, btnBg, label }) => {


    return (
        <Link to={linkURL} className={`${btnProps} ${btnBg ? 'bg-blue-600' : 'bg-transparent'}`}>
            {label}
        </Link>
    );
};


export default ButtonLinkComponent;
