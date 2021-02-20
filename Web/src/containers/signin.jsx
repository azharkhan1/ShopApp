import React, { useEffect, useRef, useState } from 'react';
import hamaraImage from "./images/cm-main-img.png";
import "./css/app.css";
import './css/line-awesome.css'
import './css/style.css'
import './css/responsive.css'
import { Link, Redirect } from "react-router-dom";
import url from "../core/index";
import axios from "axios";
import { useGlobalState, useGlobalStateUpdate } from "../context/globalContext"

axios.defaults.withCredentials = true



function Signin() {
    
    const globalState = useGlobalState();
    const setGlobalState = useGlobalStateUpdate()
    


    var email = useRef();
    var password = useRef();

   
    function login(e) {
        e.preventDefault();
        axios({
            method: 'post',
            url: url + "/auth/login",
            data: {
                userEmail: email.current.value,
                userPassword: password.current.value,
            },
        }).then((response) => {
            setGlobalState((prevValue) => ({...prevValue , user: true}));
            alert(response.data.message);

        }, (error) => {
            // alert(error.response.data.message);
            console.log("an error occured");
        })
    }

    return (
        <div className="wrapper">
            <div className="wrapper">
                <div className="sign-in-page">
                    <div className="signin-popup">
                        <div className="signin-pop">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="cmp-info">
                                        <div className="cm-logo">
                                            <img src="" alt="" />
                                            <p> Envycle, Recycle your materials through our application
                                                   </p>
                                        <img src={hamaraImage} alt="" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="login-sec">
                                        <ul className="sign-control">
                                            <li data-tab="tab-1" className="current"><Link to="/">Sign in </Link></li>
                                            <li> <Link to="/signup">Signup </Link> </li>
                                        </ul>

                                        <div className="sign_in_sec current" id="tab-1">

                                            <h3>Sign in</h3>

                                            <div className="signup-tab">
                                                <i className="fa fa-long-arrow-left"></i>

                                                <ul>
                                                    <li data-tab="tab-3" className="current"><Link to="/"> User </Link></li>
                                                    {/* <li data-tab="tab-4"><a href="#" title="">Company</a></li> */}
                                                    {/* <li >   <Link to="/vendorsignin"> Company </Link> </li> */}

                                                </ul>
                                            </div>

                                            <form onSubmit={(e) => login(e)}>
                                                <div className="row">
                                                    <div className="col-lg-12 no-pdd">
                                                        <div className="sn-field">
                                                            <input autoComplete="on" ref={email} type="email" name="email" placeholder="Enter Email" />
                                                            <i className="la la-user"></i>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12 no-pdd">
                                                        <div className="sn-field">
                                                            <input ref={password} type="password" name="password" placeholder="Enter Password" />
                                                            <i className="la la-lock"></i>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12 no-pdd">
                                                        <div className="checky-sec">
                                                            <div className="fgt-sec">
                                                                <input type="checkbox" name="cc" id="c1" />
                                                                <label >
                                                                    <span></span>
                                                                </label>
                                                                <small>Remember me</small>
                                                            </div>
                                                            {/* <a href="#" title="">Forgot Password?</a> */}
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12 no-pdd">
                                                        <button type="submit" value="submit">Sign in</button>
                                                    </div>
                                                </div>
                                            </form>



                                            {/* <div className="login-resources">
                                                <h4>Login Via Social Account</h4>
                                                <ul>
                                                    <li><a href="#" title="" className="fb"><i className="fa fa-facebook"></i>Login Via 
                                                    Facebook</a></li>
                                                    <li><a href="#" title="" className="tw"><i className="fa fa-twitter"></i>Login Via
                                                    Twitter</a></li>
                                                </ul>
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footy-sec">
                    <div className="container">


                    </div>
                </div>
                {/* {
                    loggedIn ? <Redirect to="/userdashboard" /> : ""
                } */}

            </div>
        </div>
    );

}


export default Signin;



