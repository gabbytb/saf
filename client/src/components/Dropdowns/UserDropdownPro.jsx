import { googleLogout } from "@react-oauth/google";
import { Link, useNavigate } from "react-router-dom";
import {
  adminDashboardIcon,  
} from "../../assets/images";






const UserDropdownPro = () => {


    const navigate = useNavigate();


    
    // ***************************************************************************
    // FUNCTION TO LOG-OUT CURRENT ACTIVE USER
    // ***************************************************************************
    function logOut() {
          // Clear User Details from Local Storage
          localStorage.removeItem('user');
          // localStorage.clear();
          // log out function to log the user out of google and set the profile array to null
          googleLogout();
          // redirect to Login Page
          navigate("/user/login");
    };
       


    return (
        <>
            <Link to="#pablo" className="text-blueGray-500 block ml-10">                
                <div className="items-center flex">
                    <span className="w-16 h-16 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
                        <img src={adminDashboardIcon} alt="..." className="w-full rounded-full align-middle border-none shadow-lg" />
                    </span>
                </div>            
            </Link>


            <div className="bg-white text-base z-50 float-right py-2 list-none text-left rounded shadow-lg min-w-48 hidden">
                <Link to="#pablo" onClick={(e) => e.preventDefault()} className={"text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"}>
                    Action
                </Link>
                
                <Link to="#pablo" onClick={(e) => e.preventDefault()} className={"text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"}>
                    Another action
                </Link>

                <Link to="#pablo" onClick={(e) => e.preventDefault()} className={"text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"}>
                    Something else here
                </Link>
                
                <div className="h-0 my-2 border border-solid border-blueGray-100" />
                
                <Link to="/admin/dashboard?logout" onClick={logOut} className={"text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"}>
                    Log Out
                </Link>
            </div>
        </>
    );
    
};


export default UserDropdownPro;