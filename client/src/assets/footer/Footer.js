import React from "react";
import { Link } from "react-router-dom";
import FacebookIcon from "../img/Facebook.svg";
import LinkedInIcon from "../img/LinkedIn.svg";
import TwitterIcon from "../img/Twitter.svg";
import YoutubeIcon from "../img/Youtube.svg";
import InstagramIcon from "../img/Instagram.svg";



export default function HomeFooter() {

    return (
        <>
        <div className="container-sm px-5">
                <div className="row mx-auto">
                    <div className="container-sm px-0 pt-5 pb-4 d-flex flex-column align-items-end border-bottom">
                        <div className="row justify-content-sm-center justify-content-md-between justify-content-lg-between justify-content-xl-between mx-auto align-items-center w-100 d-flex flex-sm-column flex-md-row flex-lg-row flex-xl-row g-4 border-bottom pt-5 pb-4">
                            <div className="col-sm-6 col-md-4 col-lg-3 px-0 d-flex">
                                <p className="d-flex mb-0 w-100 justify-content-center justify-content-sm-center justify-content-md-start justify-content-lg-start justify-content-xl-start">©2023 Yourcompany</p>
                            </div>

                            <div className="col-sm-6 col-md-3 col-lg-4 mb-0 p-0 d-flex justify-content-center justify-content-xs-center justify-content-sm-center justify-content-md-center justify-content-lg-center">
                                <h4 className="fw-bold d-flex mb-0 w-100 justify-content-center">Landing</h4>
                            </div>

                            <div className="col-sm-6 col-md-5 col-lg-4 mb-0 p-0 d-flex justify-content-center justify-content-md-end justify-content-lg-end">
                                <button type="button" className="btn btn-md px-5 bg-dark">
                                    <Link to={"/shop"} className="text-light text-decoration-none">Purchase now</Link>
                                </button>   
                            </div>
                        </div>   

                        <div className="row justify-content-sm-center justify-content-md-between justify-content-lg-between justify-content-xl-between mx-auto align-items-center w-100 d-flex flex-sm-column flex-md-row flex-lg-row flex-xl-row g-4 py-4">
                            <div className="col-sm-8 col-md-4 col-lg-3 col-xl-2 px-0 d-flex justify-content-md-between justify-content-lg-around">
                                <ul className="list-unstyled mb-0 d-flex justify-content-around justify-content-sm-around justify-content-md-between justify-content-lg-between w-100">
                                    <li>
                                        <small><Link className="text-secondary text-decoration-none" to={"/"}>Home</Link></small>
                                    </li>
                                    <li>
                                        <small><Link className="text-secondary text-decoration-none" to={"/blog"}>About</Link></small>
                                    </li>
                                    <li>
                                        <small><Link className="text-secondary text-decoration-none" to={"/admin/dashboard"}>Contact</Link></small>
                                    </li>
                                </ul>
                            </div>

                            <div className="col-sm-6 col-md-3 col-lg-2 px-0 d-flex justify-content-around justify-content-sm-between justify-content-md-between justify-content-lg-around">
                                <img src={FacebookIcon} alt="Facebook" />
                                <img src={LinkedInIcon} alt="LinkedIn" />
                                <img src={TwitterIcon} alt="Twitter" />
                                <img src={YoutubeIcon} alt="YouTube" />
                                <img src={InstagramIcon} alt="Instagram" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>             
        </>
    )
}