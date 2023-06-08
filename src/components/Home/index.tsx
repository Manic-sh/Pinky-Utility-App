import { useState } from "react";
import DownloadOurApp from "../DownloadOurApp";
import Footer from "../Layouts/Footer";
import Header from "../Layouts/Header";
import ReferEarnSection from "../ReferEarnSection";
import Select from 'react-select';
import OfferImageSlider from "../OfferImageSlider";
interface stateInterFace {
    isLoding: boolean,
    categories:any[],
    offers:any[]

}
const Home = () => {
    const [state, setUseState] = useState<stateInterFace>({
        isLoding: true,
        categories:[
            {
                PayID:1,
                IconClassName:"fas fa-credit-card",
                PayCategory:"rechare",
            }
        ],
        offers:[
            {ImageURL:"http://theme1.pkgrp.in/images/slider/banner-1.jpg"},
            {ImageURL:"http://theme1.pkgrp.in/images/slider/banner-2.jpg"}
        ],
    })
    console.log("state=>",state?.categories);
    const handleClick1 = (index:Number) =>{
        console.log("index",index);
    }
    return (
        <>
            <div id="main-wrapper">
                <Header />
                <div id="content">
                    <div className="bg-secondary desktop-view" >
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
                    <section className="container desktop-view">
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

                    <section className="container mt-4 mobile-view">
                        <div className="bg-white shadow-md rounded p-4">
                            <div className="row g-4">
                                <div className="col-lg-4 col-xxl-5">
                                    <div className="accordion" id="accordionExample">
                                        {state?.categories && state?.categories.map((category, index) => {

                                            // return <li key={index} className="nav-item"> <div onClick={handleClick(index)} className={(category.slug == currentCategory.slug) ? 'active nav-link' : 'nav-link'} to={'/' + category.slug}><span><i
                                            //     className={category.IconClassName}></i></span> {category.PayCategory}</div> </li>
                                            // return <div key={index} className="accordion-item">
                                            //     <h2 className="accordion-header" id={'headingOne' + index} >
                                            //         <button onClick={handleClick1(index)} className={(category.PayID == currentCategory.PayID) ? 'accordion-button' : 'accordion-button collapsed'} type="button" >
                                            //             <span><i className={category.IconClassName}></i></span> &nbsp;{category.PayCategory}
                                            //         </button>
                                            //     </h2>
                                            //     <div id={"collapseOne" + index} className={(category.PayID == currentCategory.PayID) ? 'accordion-collapse collapse show' : 'accordion-collapse collapse'} aria-labelledby={'headingOne' + index} data-bs-parent="#accordionExample">
                                            //         <div className="accordion-body">

                                            //             <h2 className="text-4 mb-3">{currentCategory.Payheading}</h2>
                                            //             {isNumberTrue ? (
                                            //                 <form id="recharge-bill" method="post" onSubmit={handleSubmit}>
                                            //                     <div className="mb-3">
                                            //                         <input type="text" className="form-control" data-bv-field="number" id="mobileNumber" required
                                            //                             placeholder={currentCategory.DefaultMessage} name="number" value={rechargeForm.number} onChange={handleInputChange} />
                                            //                         {numberError && <span style={numErrorStyle}>{numberError}</span>}
                                            //                     </div>
                                            //                     <div className="mb-3">

                                            //                         {/* <SelectOperator subCategoryList={subCategoryList} billerid={billerid} plansInfo={plansInfo} handleOperatorChange={handleOperatorChange} selectedOption={selectedOption} /> */}
                                            //                         <Select
                                            //                             placeholder="Select Your Operator"
                                            //                             value={selectedOption}
                                            //                             options={subCategoryList}
                                            //                             onChange={handleOperatorChange}
                                            //                             getOptionLabel={e => (
                                            //                                 <div style={{ display: 'flex', alignItems: 'center' }}>
                                            //                                     <span><img height={45} width={45} src={e.BillerLogo} alt='' /></span>
                                            //                                     <span style={{ marginLeft: 5 }}>{e.BillerName}</span>
                                            //                                 </div>
                                            //                             )}
                                            //                         />
                                            //                     </div>
                                            //                     <div className="input-group mb-3"> <span className="input-group-text"></span> <div onClick={handleShow} href="#"
                                            //                         className="view-plans-link">View Plans</div>
                                            //                         <input className="form-control" id="amount" placeholder="Enter Amount" value={selectedPlan?.amount} required type="text" />
                                            //                     </div>
                                            //                     {planError && <span style={numErrorStyle}>{planError}</span>}
                                            //                     <div className="d-grid">
                                            //                         <button className="btn btn-primary">Continue to Recharge</button>
                                            //                     </div>
                                            //                 </form>
                                            //             ) : (
                                            //                 <form id="recharge-bill" method="post" onSubmit={handleBillPaymentSubmit}>
                                            //                     <div className="mb-3">

                                            //                         {/* <select className="form-select" id="operator" name="operator" required="" onChange={handleOperatorChange}>
                                            //                             <option value="">Select Your Operator</option>
                                            //                             {subCategoryList && subCategoryList.map((subCategory, index) => {
                                            //                                 return <option key={index} value={index} selected={billPayForm?.billerInfo?.billerid === subCategory.billerid}>{subCategory.BillerName}</option>;
                                            //                             })}
                                            //                         </select> */}

                                            //                         <Select
                                            //                             placeholder="Select Your Operator"
                                            //                             value={selectedOption}
                                            //                             options={subCategoryList}
                                            //                             onChange={handleOperatorChange}
                                            //                             getOptionLabel={e => (
                                            //                                 <div style={{ display: 'flex', alignItems: 'center' }}>
                                            //                                     <span><img height={45} width={45} src={e.BillerLogo} alt="" /></span>
                                            //                                     <span style={{ marginLeft: 5 }}>{e.BillerName}</span>
                                            //                                 </div>
                                            //                             )}
                                            //                         />
                                            //                         {errorBillerName && <span style={numErrorStyle}>{errorBillerName}</span>}
                                            //                     </div>
                                            //                     {
                                            //                         subCategory && subCategory.billerParameters && subCategory.billerParameters.map((billerParameter, index) => (
                                            //                             <div className="mb-3">
                                            //                                 <input type="text" className="form-control" data-bv-field={billerParameter?.ConnectionNumber} required value={billerParameter?.ConnectionNumber} onChange={(event) => handleInputBillPaymentChange(index, event)}
                                            //                                     placeholder={billerParameter?.ParameterName} name={billerParameter?.ConnectionNumber} />
                                            //                                 {(billerParameter?.isError == true) && <span style={numErrorStyle}> {billerParameter?.ErrorMsg} </span>}
                                            //                                 <span>{billerParameter?.ErrorMs} {billerParameter?.ConnectionNumber}</span>
                                            //                             </div>
                                            //                         ))
                                            //                     }
                                            //                     {/* <div className="mb-3">
                                            //                         <input type="text" className="form-control" data-bv-field="ConnectionNumber" id="ConnectionNumber" required value={billPayForm.ConnectionNumber} onChange={handleInputBillPaymentChange}
                                            //                             placeholder={subCategory?.ParameterName} name="ConnectionNumber" />
                                            //                         {connectionNumberError && <span style={numErrorStyle}>{connectionNumberError}</span>}
                                            //                     </div> */}
                                            //                     {isPartialPay ? (<div className="mb-3">
                                            //                         <input type="text" className="form-control" data-bv-field="amount" id="amount" value={chargeableAmount} readOnly onChange={(event) => setChargeableAmount(event.target.value)}
                                            //                             placeholder="Amount" name="amount" />
                                            //                     </div>) : (<div className="mb-3">
                                            //                         <input type="text" className="form-control" data-bv-field="amount" id="amount" value={chargeableAmount} onChange={(event) => setChargeableAmount(event.target.value)}
                                            //                             placeholder="Amount" name="amount" />
                                            //                     </div>)}
                                            //                     {
                                            //                         (billInformation?.validationid) ? (<div className="d-grid">
                                            //                             <div className="btn btn-primary w-100" onClick={payBillPayment}>Pay</div>
                                            //                         </div>) : (<div className="d-grid"><button className="btn btn-primary">Continue to Pay</button> </div>)
                                            //                     }
                                            //                 </form>
                                            //             )}
                                            //         </div>
                                            //     </div>
                                            // </div>
                                            return <h1>test</h1>
                                        })}
                                    </div>
                                </div>
                                <div className="col-lg-8 col-xxl-7">
                                   {
                                        state.offers && <OfferImageSlider offers={state.offers} />
                                   } 
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

                    <ReferEarnSection />
                    <DownloadOurApp />
                </div>
                <Footer />
            </div>
        </>
    )
}
export default Home;