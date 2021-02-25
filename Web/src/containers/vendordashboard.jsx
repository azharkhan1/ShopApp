import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/app.css";
import './css/line-awesome.css'
import './css/style.css'
import './css/responsive.css'
import './css/bootstrap.min.css'
import './css/font-awesome.min.css'
import './css/line-awesome-font-awesome.min.css'
import './css/jquery.mCustomScrollbar.min.css'
import './css/flatpickr.min.css'
import "./css/vendorDashboard.css";

// importing context
import { useGlobalState, useGlobalStateUpdate } from "../context/globalContext";

// importing url 
import url from "../core";

// import socket
import socket from "../config/socket";


export default function VendorDashboard() {

    console.log('socket is=>', socket);
    const globalState = useGlobalState();
    const updateGlobalState = useGlobalStateUpdate();

    const [orders, setOrders] = useState([]);
    const [realTime, setRealTime] = useState(false);
    useEffect(() => {
        let arr = [];
        axios({
            method: 'get',
            url: `${url}/getOrders`,
        }).then((response) => {

            response.data.placedRequests.map((value) => {
                if (value.pending) {
                    arr.push(value);
                }
            })

            setOrders(arr);
            console.log("orders are=>", orders);
        }, (error) => {
            console.log("an error occured");
        })

        socket.on('requests', (data) => {
            setRealTime(!realTime);
        })
    }, [realTime])

    const logout = () => {
        axios({
            method: 'post',
            url: `${url}/logout`

        }).then((response) => {
            alert(response.data);
            updateGlobalState((prevValue) => ({ ...prevValue, loginStatus: false, user: null, roll: null }));
        }, (error) => {
            console.log("error=>", error);
        })
    }
    const confirmOrder = (index) => {
        console.log(orders[index]._id)
        axios({
            method: 'patch',
            url: `${url}/confirmOrder`,
            data: {
                id: orders[index]._id,
            },

        }).then((res) => {
            alert('Order confirmed');
            setRealTime(!realTime);
        }).catch((err) => {
            console.log("error is=>", err);
        })
    }

    return (
        <div>

            <div className="wrapper">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="#">Navbar w/ text</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                            </li>
                        </ul>
                        <span className="navbar-text" onClick={logout}>
                            <a href="#" className="nav-link logout" title="">
                                <span><i className="fa fa-sign-out" aria-hidden="true"></i></span>
                                        Logout
                                    </a>
                        </span>
                    </div>
                </nav>

                <main>
                    <div className="main-section">
                        <div className="container">
                            <div className="main-section-data">
                                <div className="row">
                                    <div className="col-lg-3 col-md-4 pd-left-none no-pd">
                                        <div className="main-left-sidebar no-margin">
                                            <div className="user-data full-width">
                                                <div className="user-profile">
                                                    <div className="username-dt">
                                                        <div className="usr-pic">
                                                        </div>
                                                    </div>
                                                    <div className="user-specs">
                                                        <h3>{globalState.user.userName}</h3>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-8 no-pd">
                                        <div className="main-ws-sec">
                                            <div className="post-topbar">

                                            </div>
                                            <div>
                                                {
                                                    orders.map(({ cart, userEmail, total }, index) => {
                                                        return (
                                                            <div key={index} className="card text-center" style={{ width: '18rem' }}>
                                                                <div className="card-body">
                                                                    <h5 className="card-title">From: {userEmail}</h5>
                                                                    <h2>Total is {total}</h2>
                                                                    {
                                                                        cart.map((cartVal, i) => {
                                                                            return <ul key={i}>
                                                                                <li>
                                                                                    <p>{cartVal.product} Price <b>{cartVal.productPrice} x {cartVal.quantity}</b></p>
                                                                                </li>
                                                                            </ul>
                                                                        })
                                                                    }
                                                                    <button onClick={() => confirmOrder(index)} className="btn btn-primary">Confirm Order</button>
                                                                </div>
                                                            </div>
                                                        )

                                                    })
                                                }
                                            </div>

                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}