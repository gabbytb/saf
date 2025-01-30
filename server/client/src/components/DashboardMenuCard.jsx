import { Link } from "react-router-dom";





const DashboardMenuCard = ({ linkURI, label }) => {

    return (
        <>
          <Link to={`#${linkURI}`}>{label}</Link>
        </>
    );
};


export default DashboardMenuCard;