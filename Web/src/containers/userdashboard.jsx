import React, { useState, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import url from "../core/index";
import "./css/app.css";
import './css/line-awesome.css'
import './css/style.css'
import './css/responsive.css'
import './css/bootstrap.min.css'
import './css/font-awesome.min.css'
import './css/line-awesome-font-awesome.min.css'
import './css/jquery.mCustomScrollbar.min.css'
import './css/flatpickr.min.css'
import product from "./images/product.png";
import home from "./images/icon1.png";
import companies from "./images/icon2.png";
import projects from "./images/icon3.png";
import profile from "./images/icon4.png";
import card1 from "./images/home-6.jpg";
import "./css/dashboard.css";

// useEffect(() => {
//     axios({
//         method: 'get',
//         url: url + "/profile",
//     }).then((response) => {
//             // setLogout(false);
//             console.log("user details are = > " ,response.data);
//     }, (error) => {

//     });
// } , [] );



// function logout() {

//     axios({
//         method: 'post',
//         url: url + "/auth/logout",

//     }).then((response) => {
//         alert(response.data.message);
//         setLogout(true);

//     }, (error) => {
//         alert(error.response.data.message);
//     })
// }


axios.defaults.withCredentials = true


export default function UserDashboard() {

    // var [loggedOut, setLogout] = useState(true);
    var [cart, setCart] = useState([]);
    var [total, setTotal] = useState(0);
    var [products, setProducts] = useState([
        {
            product: 'Battery',
            price: 420,
            description: "Osaka battery , 1 year warrenty "
        },
        {
            product: 'Charger',
            price: 150,
            description: "Iphone 6 charger with original datacable and plug "
        },
        {
            product: 'Earpod',
            price: 350,
            description: "Iphone original earpods "
        },
        
    ])

    function getTotal() {

        var productTotal = 0;
        cart.map((value => {
            console.log("type of price is =>", typeof (value.price))
            productTotal += value.price;
        }))
        setTimeout(() => {
            setTotal(productTotal);
            alert("your total is = > " + productTotal);
        }, 1000)

    }

    function addCart(value, index) {
        var products_change = [...products];
        products_change[index].added = true;
        setProducts(products_change);

        var valueToAdd = {
            product: value.product,
            price: value.price,
            quantity: 1,
            productPrice: value.price,
        }
        console.log("total is = >  ", total);
        setCart([...cart, valueToAdd]);

    }
    function addQty(index) {
        var prevCart = [...cart];
        prevCart[index].quantity += 1;
        prevCart[index].price = prevCart[index].quantity * prevCart[index].productPrice;
        setCart(prevCart);

    }
    function removeQty(index) {

        if (cart[index].quantity > 1) {
            var prevCart = [...cart];
            prevCart[index].quantity -= 1;
            prevCart[index].price = prevCart[index].quantity * prevCart[index].productPrice;
            setCart(prevCart);


        }
        else {
            for (let i = 0; i < products.length; i++) {
                if (cart[index].product === products[i].product) {
                    var products_change = [...products];
                    products_change[i].added = false;
                    setProducts(products_change);
                }
            }


            let old_cart = [...cart]
            old_cart.splice(index, 1);
            setProducts(products_change);
            setCart(old_cart);
        }

    }

    return (
        // eslint-disable-next-line
        <div>
            <div className="wrapper">


                <main>
                    <div className="main-section">
                        <div className="container">
                            <div className="main-section-data">
                                <div className="row">
    
                                    <div className="col-lg-9 col-md-8 no-pd">
                                        <div className="main-ws-sec">
                                            {/* <div className="post-topbar">
                                                <div className="user-picy">
                                                    <img src="images/resources/user-pic.png" alt="" />
                                                </div>
                                                <div className="post-st">
                                                    <ul>
                                                        <li><a className="post_project" href="#" title="">Post a Item Name</a></li>
                                                        <li><a className="post-jb active" href="#" title="">Post Weight</a></li>
                                                    </ul>
                                                </div>
                                            </div> */}
                                            <div className="posts-section">
                                                {/* <div className="post-bar">
                                                </div> */}



                                                <div className="row">
                                                    {
                                                        products.map((value, index) => {

                                                            return <div key={index} className="card mr-2 mt-2" style={{ width: "15rem" }} >
                                                                <img src={product} className="card-img-top" alt="..." />
                                                                <div className="card-body">
                                                                    <div className="gradient-img">
                                                                    </div>
                                                                    <h2>{value.product}</h2>
                                                                    <p className="card-text">
                                                                        {value.description}
                                                                    </p>
                                                                </div>
                                                                <ul className="list-group list-group-flush">
                                                                    <li className="list-group-item">

                                                                        <span className="pricing">STARTING AT <span className="price-of-product">${value.price}</span></span>
                                                                    </li>
                                                                </ul>
                                                                <button onClick={value.added ? () => { return } : (e) => addCart(value, index)} className="cart-btn">{value.added ? "Added" : "Add to cart"}</button>

                                                            </div>

                                                        })
                                                    }
                                                </div>


                                                {/* Loding Logo */}
                                                <div className="process-comm">
                                                    <div className="spinner">
                                                        <div className="bounce1"></div>
                                                        <div className="bounce2"></div>
                                                        <div className="bounce3"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 pd-right-none no-pd">
                                        <div className="right-sidebar">
                                            <div className="widget widget-about">
                                                <img src="images/wd-logo.png" alt="" />
                                                <h3>Cart</h3>
                                                <div className="sign_link">
                                                    {
                                                        cart.map((value, index) => {
                                                            return <div key={index}>
                                                                <h2>
                                                                    <span className="pricing">{value.product} qty:{value.quantity} <span className="price-of-product">${value.price}</span></span>

                                                                </h2>
                                                                <div className="quantity buttons_added">
                                                                    <input onClick={value.quantity > 0 ? (e) => removeQty(index) : () => { return }} type="button" defaultValue="-" className="minus" />
                                                                    <input style={{ textAlign: "center", width: 34 }} type="text" value={value.quantity} className="input-text qty text" disabled />
                                                                    <input onClick={(e) => addQty(index)} type="button" defaultValue="+" className="plus" />
                                                                </div>


                                                            </div>
                                                        })
                                                    }

                                                </div>
                                                <button onClick={getTotal}>Checkout</button>

                                            </div>
                                            <hr />


                                        </div>

                                        <div className="tags-sec full-width">
                                            <ul>
                                                <li><a href="#" title="">Help Center</a></li>
                                                <li><a href="#" title="">About</a></li>
                                                <li><a href="#" title="">Privacy Policy</a></li>
                                                <li><a href="#" title="">Community Guidelines</a></li>
                                                <li><a href="#" title="">Cookies Policy</a></li>
                                                <li><a href="#" title="">Career</a></li>
                                                <li><a href="#" title="">Language</a></li>
                                                <li><a href="#" title="">Copyright Policy</a></li>
                                            </ul>
                                            <div className="cp-sec">
                                                <img src="images/logo2.png" alt="" />
                                                <p><img src="images/cp.png" alt="" />Copyright 2021</p>
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