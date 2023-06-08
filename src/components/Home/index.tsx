import { Link } from "react-router-dom";
import Footer from "../Layouts/Footer";

const Home = () => {
    return (
        <>
            <div id="main-wrapper">
                <header id="header">
                    <div className="container">
                        <div className="header-row">
                            <div className="header-column justify-content-start">
                                <div className="logo me-2 me-lg-3"> <a href='/' className="d-flex" title="HTML Template"><img
                                    src="assets/images/logo.png" alt="Quickai" /></a> </div>
                            </div>
                            <div className="header-column justify-content-end">

                                <nav className="primary-menu navbar navbar-expand-lg">
                                    <div id="header-nav" className="collapse navbar-collapse">
                                        <ul className="navbar-nav">
                                            <li><a className="dropdown-item" href='/'>Home</a></li>
                                        </ul>
                                    </div>
                                </nav>
                                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#header-nav">
                            <span></span> <span></span> <span></span> </button>
                        <div className="vr mx-2 h-25 my-auto"></div>
                        <nav className="login-signup navbar navbar-expand">
                            <ul className="navbar-nav">
                                <li className="profile"><a className="pe-0" data-bs-toggle="modal" data-bs-target="#login-modal" href="#"
                                    title="Login / Sign up"><span className="d-none d-sm-inline-block">Login / Sign up</span> <span
                                        className="user-icon ms-sm-2"><i className="fas fa-user"></i></span></a></li>
                            </ul>
                        </nav>
                            </div>
                        </div>
                    </div>
                </header>
                <div id="content">
                    <div className="bg-secondary">
                        <div className="container">
                            <ul className="nav secondary-nav">
                                <li className="nav-item"> <a className="nav-link active" href="index.html"><span><i
                                    className="fas fa-mobile-alt"></i></span> Mobile</a> </li>
                                <li className="nav-item"> <a className="nav-link" href="recharge-bill-dth.html"><span><i
                                    className="fas fa-tv"></i></span> DTH</a> </li>
                                <li className="nav-item"> <a className="nav-link" href="recharge-bill-datacard.html"><span><i
                                    className="fas fa-credit-card"></i></span> DataCard</a> </li>
                                <li className="nav-item"> <a className="nav-link" href="recharge-bill-broadband.html"><span><i
                                    className="fas fa-wifi"></i></span> Broadband</a> </li>
                                <li className="nav-item"> <a className="nav-link" href="recharge-bill-landline.html"><span><i
                                    className="fas fa-phone"></i></span> Landline</a> </li>
                                <li className="nav-item"> <a className="nav-link" href="recharge-bill-cabletv.html"><span><i
                                    className="fas fa-plug"></i></span> CableTv</a> </li>
                                <li className="nav-item"> <a className="nav-link" href="recharge-bill-electricity.html"><span><i
                                    className="fas fa-lightbulb"></i></span> Electricity</a> </li>
                                <li className="nav-item"> <a className="nav-link" href="recharge-bill-metro.html"><span><i
                                    className="fas fa-subway"></i></span> Metro</a> </li>
                                <li className="nav-item"> <a className="nav-link" href="recharge-bill-gas.html"><span><i
                                    className="fas fa-flask"></i></span> Gas</a> </li>
                                <li className="nav-item"> <a className="nav-link" href="recharge-bill-water.html"><span><i
                                    className="fas fa-tint"></i></span> Water</a> </li>
                            </ul>
                        </div>
                    </div>

                    <section className="container">
                        <div className="bg-white shadow-md rounded p-4">
                            <div className="row g-4">
                                <div className="col-lg-4 col-xxl-5">
                                    <h2 className="text-4 mb-3">Mobile Recharge or Bill Payment</h2>
                                    <form id="recharge-bill" method="post">
                                        <div className="mb-3">
                                            <div className="form-check form-check-inline">
                                                <input id="prepaid" name="rechargeBillpayment" className="form-check-input" required
                                                    type="radio" />
                                                <label className="form-check-label" htmlFor="prepaid">Prepaid</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input id="postpaid" name="rechargeBillpayment" className="form-check-input" required type="radio" />
                                                <label className="form-check-label" htmlFor="postpaid">Postpaid</label>
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <input type="text" className="form-control" data-bv-field="number" id="mobileNumber" required
                                                placeholder="Enter Mobile Number" />
                                        </div>
                                        <div className="mb-3">
                                            <select className="form-select" id="operator" required>
                                                <option value="">Select Your Operator</option>
                                                <option>1st Operator</option>
                                                <option>2nd Operator</option>
                                                <option>3rd Operator</option>
                                                <option>4th Operator</option>
                                                <option>5th Operator</option>
                                                <option>6th Operator</option>
                                                <option>7th Operator</option>
                                            </select>
                                        </div>
                                        <div className="input-group mb-3"> <span className="input-group-text">$</span> <a href="#"
                                            data-bs-target="#view-plans" data-bs-toggle="modal" className="view-plans-link">View Plans</a>
                                            <input className="form-control" id="amount" placeholder="Enter Amount" required type="text" />
                                        </div>
                                        <div className="d-grid"><a className="btn btn-primary" href="recharge-order-summary.html">Continue to
                                            Recharge</a></div>
                                    </form>
                                </div>
                                <div className="col-lg-8 col-xxl-7">
                                    <div className="owl-carousel owl-theme single-slider" data-animateout="fadeOut" data-animatein="fadeIn"
                                        data-autoplay="true" data-loop="true" data-autoheight="true" data-nav="true" data-items="1">
                                        <div className="item"><a href="#"><img className="img-fluid" src="images/slider/banner-1.jpg"
                                            alt="banner 1" /></a></div>
                                        <div className="item"><a href="#"><img className="img-fluid" src="images/slider/banner-2.jpg"
                                            alt="banner 2" /></a></div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </section>
                    <div className="section pt-4 pb-3">
                        <div className="container">
                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                <li className="nav-item"> <a className="nav-link active" id="mobile-recharge-tab" data-bs-toggle="tab"
                                    href="#mobile-recharge" role="tab" aria-controls="mobile-recharge" aria-selected="true">Mobile
                                    Recharge</a> </li>
                                <li className="nav-item"> <a className="nav-link" id="billpayment-tab" data-bs-toggle="tab" href="#billpayment"
                                    role="tab" aria-controls="billpayment" aria-selected="false">Bill Payment</a> </li>
                                <li className="nav-item"> <a className="nav-link" id="why-quickai-tab" data-bs-toggle="tab" href="#why-quickai"
                                    role="tab" aria-controls="why-quickai" aria-selected="false">Why Quickai</a> </li>
                            </ul>
                            <div className="tab-content my-3" id="myTabContent">
                                <div className="tab-pane fade show active" id="mobile-recharge" role="tabpanel"
                                    aria-labelledby="mobile-recharge-tab">
                                    <p>Instant Online mobile recharge Iisque persius interesset his et, in quot quidam persequeris vim, ad mea
                                        essent possim iriure. Mutat tacimates id sit. Ridens mediocritatem ius an, eu nec magna imperdiet.
                                        Mediocrem qualisque in has. Enim utroque perfecto id mei, ad eam tritani labores facilisis, ullum
                                        sensibus no cum. Eius eleifend in quo. At mei alia iriure propriae.</p>
                                    <p>Partiendo voluptatibus ex cum, sed erat fuisset ne, cum ex meis volumus mentitum. Alienum pertinacia
                                        maiestatis ne eum, verear persequeris et vim. Mea cu dicit voluptua efficiantur, nullam labitur veritus
                                        sit cu. Eum denique omittantur te, in justo epicurei his, eu mei aeque populo. Cu pro facer sententiae,
                                        ne brute graece scripta duo. No placerat quaerendum nec, pri alia ceteros adipiscing ut. Quo in nobis
                                        nostrum intellegebat. Ius hinc decore erroribus eu, in case prima exerci pri. Id eum prima adipisci. Ius
                                        cu minim theophrastus, legendos pertinacia an nam. <a href="#">Read Terms</a></p>
                                </div>
                                <div className="tab-pane fade" id="billpayment" role="tabpanel" aria-labelledby="billpayment-tab">
                                    <p>Partiendo voluptatibus ex cum, sed erat fuisset ne, cum ex meis volumus mentitum. Alienum pertinacia
                                        maiestatis ne eum, verear persequeris et vim. Mea cu dicit voluptua efficiantur, nullam labitur veritus
                                        sit cu. Eum denique omittantur te, in justo epicurei his, eu mei aeque populo. Cu pro facer sententiae,
                                        ne brute graece scripta duo. No placerat quaerendum nec, pri alia ceteros adipiscing ut. Quo in nobis
                                        nostrum intellegebat. Ius hinc decore erroribus eu, in case prima exerci pri. Id eum prima adipisci. Ius
                                        cu minim theophrastus, legendos pertinacia an nam.</p>
                                    <p>Instant Online mobile recharge Iisque persius interesset his et, in quot quidam persequeris vim, ad mea
                                        essent possim iriure. Mutat tacimates id sit. Ridens mediocritatem ius an, eu nec magna imperdiet.
                                        Mediocrem qualisque in has. Enim utroque perfecto id mei, ad eam tritani labores facilisis, ullum
                                        sensibus no cum. Eius eleifend in quo. At mei alia iriure propriae.</p>
                                </div>
                                <div className="tab-pane fade" id="why-quickai" role="tabpanel" aria-labelledby="why-quickai-tab">
                                    <p>Cu pro facer sententiae, ne brute graece scripta duo. No placerat quaerendum nec, pri alia ceteros
                                        adipiscing ut. Quo in nobis nostrum intellegebat. Ius hinc decore erroribus eu, in case prima exerci
                                        pri. Id eum prima adipisci. Ius cu minim theophrastus, legendos pertinacia an nam.</p>
                                    <p>Partiendo voluptatibus ex cum, sed erat fuisset ne, cum ex meis volumus mentitum. Alienum pertinacia
                                        maiestatis ne eum, verear persequeris et vim. Mea cu dicit voluptua efficiantur, nullam labitur veritus
                                        sit cu. Eum denique omittantur te, in justo epicurei his, eu mei aeque populo.</p>
                                    <p>Instant Online mobile recharge Iisque persius interesset his et, in quot quidam persequeris vim, ad mea
                                        essent possim iriure. Mutat tacimates id sit. Ridens mediocritatem ius an, eu nec magna imperdiet.
                                        Mediocrem qualisque in has. Enim utroque perfecto id mei, ad eam tritani labores facilisis, ullum
                                        sensibus no cum. Eius eleifend in quo. At mei alia iriure propriae.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <section className="section bg-white shadow-md rounded px-5">
                            <h2 className="text-9 fw-600 text-center">Refer & Earn</h2>
                            <p className="lead text-center mb-5">Refer your friends and earn up to $20.</p>
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="featured-box style-4">
                                        <div className="featured-box-icon bg-light-4 text-primary rounded-circle"> <i className="fas fa-bullhorn"></i>
                                        </div>
                                        <h3>You Refer Friends</h3>
                                        <p className="text-3">Share your referral link with friends. They get $10.</p>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="featured-box style-4">
                                        <div className="featured-box-icon bg-light-4 text-primary rounded-circle"> <i
                                            className="fas fa-sign-in-alt"></i> </div>
                                        <h3>Your Friends Register</h3>
                                        <p className="text-3">Your friends Register with using your referral link.</p>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="featured-box style-4">
                                        <div className="featured-box-icon bg-light-4 text-primary rounded-circle"> <i
                                            className="fas fa-dollar-sign"></i> </div>
                                        <h3>Earn You</h3>
                                        <p className="text-3">You get $20. You can use these credits to take recharge.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center pt-4"> <a href="#" className="btn btn-primary">Get Started Earn</a> </div>
                        </section>
                    </div>
                    <section className="section pb-0">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-5 col-lg-6 text-center"> <img className="img-fluid" alt="" src="images/app-mobile.png" />
                                </div>
                                <div className="col-md-7 col-lg-6">
                                    <h2 className="text-9 fw-600 my-4">Download Our Quickai<br className="d-none d-lg-inline-block" />
                                        Mobile App Now</h2>
                                    <p className="lead">Download our app for the fastest, most convenient way to send Recharge.</p>
                                    <p>Ridens mediocritatem ius an, eu nec magna imperdiet. Mediocrem qualisque in has. Enim utroque perfecto
                                        id mei, ad eam tritani labores facilisis, ullum sensibus no cum. Eius eleifend in quo.</p>
                                    <ul>
                                        <li>Recharge</li>
                                        <li>Bill Payment</li>
                                        <li>Booking Online</li>
                                        <li>and much more.....</li>
                                    </ul>
                                    <div className="d-flex flex-wrap pt-2"> <a className="me-4" href="#"><img alt="" src="images/app-store.png" /></a><a
                                        href="#"><img alt="" src="images/google-play-store.png" /></a> </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <Footer />
            </div>
        </>
    )
}
export default Home;