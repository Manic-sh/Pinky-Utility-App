import { Link, } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { userService } from "../Services";
interface selectedPlanI {
    PayId: Number,
    discount: number,
    is_recharge: Boolean
    number: String,
    total_pay_amount: any,
    txnid: String,
    amount: number,
    planid: String,
    biller_name: String,
    plan_category_name: String,
    validity: String,
    circle_name: String,
    plan_description: String,
    couponCode: any

}
interface billplanInformationIn {
    ConnectionNumber: any,
    biller_category: String,
    biller_name: String,
    validation_date: String,
    valid_until: String,
    amount: number,
    billlist: any[]
}
const OrderSummary = () => {
    const [selectedPlan, setSelectedPlan] = useState<selectedPlanI>({
        PayId: 0,
        discount: 0,
        is_recharge: false,
        number: "",
        total_pay_amount: 0,
        txnid: "",
        amount: 0,
        planid: "",
        biller_name: '',
        plan_category_name: '',
        validity: '',
        circle_name: '',
        plan_description: '',
        couponCode: ''
    });
    const [couponCode, setCouponCode] = useState('');
    const [isDiscountApply, setIsDiscountApply] = useState(false);
    const [discounAmount, setDiscounAmount] = useState(0);
    const [couponCodeError, setCouponCodeError] = useState('');
    const [payAmount, setPayAmount] = useState<any>(0);

    const [billplanInformation, setBillplanInformation] = useState<billplanInformationIn>({
        ConnectionNumber: "",
        biller_category: '',
        biller_name: '',
        validation_date: '',
        valid_until: '',
        amount: 0,
        billlist: []
    });
    const [isLoading, setIsLoading] = useState(false);
    const [coupons, setCoupons] = useState([]);
    useEffect(() => {
        const recharge_information: any = localStorage.getItem('recharge_information');
        if (recharge_information) {
            const recharge_info: any = JSON.parse(recharge_information);
            // recharge_info.total_pay_amount = recharge_info.amount;
            setPayAmount(recharge_info.amount);
            setSelectedPlan(recharge_info)
        }
        const billplan_information = localStorage.getItem('billplan_information');
        if (billplan_information) {
            const bill_info = JSON.parse(billplan_information);
            setBillplanInformation(bill_info);
        }
        getCouponCodeList();
    }, []);

    async function getCouponCodeList() {
        setIsLoading(true);
        const data = {
            "Enquiryno": selectedPlan?.planid,
            "Product": "UTILITY",
            "Type": "Mobile Prepaid"
        }
        const cuponCodeList = await userService.DisplayCouponCode(data);
        setCoupons(cuponCodeList.Coupons)
        setIsLoading(false);
    }
    const applyCouponCode = async (couponCode: any) => {
        // frist remove coupan theapply
        setCouponCode('');
        setCouponCodeError('');
        setIsDiscountApply(false);
        setPayAmount(0);
        selectedPlan.total_pay_amount = selectedPlan.amount;
        selectedPlan.discount = 0;
        selectedPlan.couponCode = '';
        setSelectedPlan(selectedPlan);
        setDiscounAmount(0);
        localStorage.setItem('recharge_information', JSON.stringify(selectedPlan));

        setCouponCode(couponCode);

        let discount = 0;
        const data = {
            Enquiryno: selectedPlan.planid,
            Product: "Utility",
            Type: "Mobile Prepaid",
            Amount: selectedPlan.amount,
            CouponCode: couponCode
        }
        const ApplyCodeResponse = await userService.ApplyCouponCode(data);
        if (!ApplyCodeResponse?.CouponDiscount) {
            setCouponCodeError("Invalid coupon code")
        } else {
            discount = ApplyCodeResponse?.CouponDiscount;
            setDiscounAmount(discount);
            setIsDiscountApply(true);
            if (selectedPlan.discount) {
                selectedPlan.total_pay_amount = selectedPlan.amount;
            }
            selectedPlan.total_pay_amount = (selectedPlan.total_pay_amount - discount).toFixed(2);
            selectedPlan.discount = discount;
            selectedPlan.couponCode = couponCode;
            setPayAmount(selectedPlan.total_pay_amount);
            setSelectedPlan(selectedPlan);

            localStorage.setItem('recharge_information', JSON.stringify(selectedPlan));

        }

    }
    const removeBtn = {
        marginLeft: ' 60px',
        color: 'red',
        cursor: 'pointer'
    }
    const removeCouponCode = (couponCode: any) => {
        console.log("removeCouponCode couponCode===>", couponCode);
        setCouponCode('');
        setCouponCodeError('');
        setIsDiscountApply(false);
        setPayAmount(0);
        selectedPlan.total_pay_amount = selectedPlan.amount;
        selectedPlan.discount = 0;
        selectedPlan.couponCode = '';
        setSelectedPlan(selectedPlan);
        setDiscounAmount(0);
        localStorage.setItem('recharge_information', JSON.stringify(selectedPlan));

    }
    if (isLoading) {
        return <div id="preloader">
            <div data-loader="dual-ring"></div>
        </div>;
    }
    return (
        <>
            <div id="content">
                <div className="container">
                    <div className="row my-5">
                        <div className="col-lg-11 mx-auto">
                            <div className="row widget-steps">
                                <div className="col-3 step complete">
                                    <div className="step-name">Order</div>
                                    <div className="progress">
                                        <div className="progress-bar"></div>
                                    </div>
                                    <a href="" className="step-dot"></a> </div>
                                <div className="col-3 step active">
                                    <div className="step-name">Summary</div>
                                    <div className="progress">
                                        <div className="progress-bar"></div>
                                    </div>
                                    <a href="#" className="step-dot"></a> </div>
                                <div className="col-3 step disabled">
                                    <div className="step-name">Payment</div>
                                    <div className="progress">
                                        <div className="progress-bar"></div>
                                    </div>
                                    <a href="#" className="step-dot"></a> </div>
                                <div className="col-3 step disabled">
                                    <div className="step-name">Done</div>
                                    <div className="progress">
                                        <div className="progress-bar"></div>
                                    </div>
                                    <a href="#" className="step-dot"></a> </div>
                            </div>
                        </div>

                        <div className="col-lg-12 text-center mt-5">
                            <h2 className="text-8 mb-4">Order Summary</h2>
                        </div>
                        {(selectedPlan?.is_recharge) ? (
                            <>
                                <div className="col-md-8 col-lg-7 col-xl-8 mx-auto">
                                    <div className="bg-white shadow-sm rounded text-3 p-3 pt-sm-4 pb-sm-5 px-sm-5 mb-0 mb-sm-4">
                                        <h3 className="text-5 fw-400 mb-3 mb-sm-4 text-center">Confirm Recharge Details</h3>
                                        <hr className="mx-n3 mx-sm-n5 mb-4" />
                                        <div className="row">
                                            <div className="col-6 col-lg-6 text-3">
                                                <p className="col-sm text-muted mb-0 mb-sm-3">Mobile Number:</p>
                                            </div>
                                            <div className="col-6 col-lg-6 text-3">
                                                <p className="col-sm text-sm-end fw-500"> {selectedPlan?.number}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-6 col-lg-6 text-3">
                                                <p className="col-sm text-muted mb-0 mb-sm-3">Operator/Circle:</p>
                                            </div>
                                            <div className="col-6 col-lg-6 text-3">
                                                <p className="col-sm text-sm-end fw-500">{selectedPlan?.biller_name} | {selectedPlan?.circle_name}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-6 col-lg-6 text-3">
                                                <p className="col-sm text-muted mb-0 mb-sm-3">Plan:</p>
                                            </div>
                                            <div className="col-6 col-lg-6 text-3">
                                                <p className="col-sm text-sm-end fw-500">{selectedPlan?.plan_category_name}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-6 col-lg-6 text-3">
                                                <p className="col-sm text-muted mb-0 mb-sm-3">Validity:</p>
                                            </div>
                                            <div className="col-6 col-lg-6 text-3">
                                                <p className="col-sm text-sm-end fw-500">{selectedPlan?.validity}</p>
                                            </div>
                                        </div>
                                        {
                                            (selectedPlan?.discount) ? (
                                                <div className="row">
                                                    <div className="col-6 col-lg-6 text-3">
                                                        <p className="col-sm text-muted mb-0 mb-sm-3">Discount:</p>
                                                    </div>
                                                    <div className="col-6 col-lg-6 text-3">
                                                        <p className="col-sm text-sm-end fw-500">{selectedPlan?.discount}</p>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="row">
                                                    <div className="col-6 col-lg-6 text-3">
                                                        <p className="col-sm text-muted mb-0 mb-sm-3">Discount:</p>
                                                    </div>
                                                    <div className="col-6 col-lg-6 text-3">
                                                        <p className="col-sm text-sm-end fw-500">{selectedPlan?.discount}</p>
                                                    </div>
                                                </div>
                                        )}
                                        <div className="row">
                                            <div className="col-6 col-lg-6 text-3">
                                                <p className="col-sm text-muted mb-0 mb-sm-3">Amount:</p>
                                            </div>
                                            <div className="col-6 col-lg-6 text-3">
                                                <p className="col-sm text-sm-end fw-500">{selectedPlan?.amount} </p>
                                            </div>
                                        </div>
                                        {/* <div className="row">
                                            <div className="col-6 col-lg-6 text-3">
                                                <p className="col-12 text-muted mb-0">Plan Description:</p>
                                            </div>
                                            <div className="col-6 col-lg-6 text-3">
                                                <p className="col-12 text-1" style={{ textAlign: 'justify' }}>{selectedPlan?.plan_description}</p>
                                            </div>
                                        </div> */}
                                        <div className="bg-light-4 rounded p-3">
                                            <div className="row">
                                                <div className="col-6 col-lg-6 text-3">
                                                    <div className="col-sm text-3 fw-600">Payment Amount:</div>
                                                </div>
                                                <div className="col-6 col-lg-6 text-3">
                                                    <div className="col-sm text-sm-end text-5 fw-500">{selectedPlan?.total_pay_amount}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-grid mt-4"><Link to='/pay/payment' className="btn btn-primary">Make Payment</Link></div>
                                    </div>
                                </div>
                                <aside className="col-md-4 col-lg-5 col-xl-4">
                                    <div className="bg-white shadow-md rounded p-3">
                                        <h3 className="text-5 mb-3">Fare Details</h3>
                                        <hr className="mx-n3" />
                                        <ul className="list-unstyled">
                                            <li className="mb-2"><span className=' text-4 fw-500 text-dark' > Plan Description:</span> <span className="float-end" style={{ textAlign: 'justify' }}>{selectedPlan?.plan_description}</span></li>
                                        </ul>
                                        <hr />
                                        <br />
                                        <h3 className="text-4 mb-3 mt-4">Promo Code</h3>

                                        <ul className="promo-code">
                                            {coupons && coupons.map((coupon: any, index: number) => (
                                                <li key={index}>
                                                    {
                                                        (selectedPlan.couponCode != coupon.CouponCode) ? (
                                                            <>
                                                                <span onClick={() => { applyCouponCode(coupon.CouponCode) }} className="d-block text-3 fw-600">{coupon.CouponCode}
                                                                    <span className='promo-code-apply-btn'>Apply </span>
                                                                </span>
                                                                {coupon.Remarks}</>
                                                        ) : (
                                                            <>
                                                                <span onClick={() => { removeCouponCode(coupon.CouponCode) }} className="d-block text-3 fw-600">{coupon.CouponCode}
                                                                    <span className='promo-code-apply-btn' style={{ color: 'red' }}>Remove</span>
                                                                </span>
                                                                {coupon.Remarks}</>
                                                        )
                                                    }

                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </aside>
                            </>

                        ) : (
                            <div className="col-md-8 col-lg-7 col-xl-6 mx-auto">
                                <div className="bg-white shadow-sm rounded text-3 p-3 pt-sm-4 pb-sm-5 px-sm-5 mb-0 mb-sm-4">
                                    <h3 className="text-5 fw-400 mb-3 mb-sm-4 text-center">Confirm Bill Details</h3>
                                    <hr className="mx-n3 mx-sm-n5 mb-4" />
                                    <div className="row">
                                        <div className="col-6 col-lg-6 text-3">
                                            <p className="col-sm text-muted mb-0 mb-sm-3">Connection Number:</p>
                                        </div>
                                        <div className="col-6 col-lg-6 text-3">
                                            <p className="col-sm text-sm-end fw-500 text-right">{billplanInformation?.ConnectionNumber}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6 col-lg-6 text-3">
                                            <p className="col-sm text-muted mb-0 mb-sm-3">Category:</p>
                                        </div>
                                        <div className="col-6 col-lg-6 text-3">
                                            <p className="col-sm text-sm-end fw-500 text-right">{billplanInformation?.biller_category}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6 col-lg-6 text-3">
                                            <p className="col-sm text-muted mb-0 mb-sm-3">Operator:</p>
                                        </div>
                                        <div className="col-6 col-lg-6 text-3">
                                            <p className="col-sm text-sm-end fw-500 text-right">{billplanInformation?.biller_name}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6 col-lg-6 text-3">
                                            <p className="col-sm text-muted mb-0 mb-sm-3">Validation Date:</p>
                                        </div>
                                        <div className="col-6 col-lg-6 text-3">
                                            <p className="col-sm text-sm-end fw-500 text-right">{billplanInformation?.validation_date}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6 col-lg-6 text-3">
                                            <p className="col-sm text-muted mb-0 mb-sm-3">Valid Until:</p>
                                        </div>
                                        <div className="col-6 col-lg-6 text-3">
                                            <p className="col-sm text-sm-end fw-500 text-right">{billplanInformation?.valid_until}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6 col-lg-6 text-3">
                                            <p className="col-sm text-muted mb-0 mb-sm-3">Total Payment:</p>
                                        </div>
                                        <div className="col-6 col-lg-6 text-3">
                                            <p className="col-sm text-sm-end fw-500 text-right">{billplanInformation?.billlist[0]?.net_billamount}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6 col-lg-6 text-3">
                                            <p className="col-sm text-muted mb-0 mb-sm-3">Remaining Amount:</p>
                                        </div>
                                        <div className="col-6 col-lg-6 text-3">
                                            <p className="col-sm text-sm-end fw-500 text-right">{billplanInformation?.billlist[0]?.billamount - billplanInformation?.amount}</p>
                                        </div>
                                    </div>
                                    <div className="bg-light-4 rounded p-3">
                                        <div className="row">
                                            <div className="col-6 col-lg-6 text-3">
                                                <div className="col-sm text-3 fw-600">Payment Amount:</div>
                                            </div>
                                            <div className="col-6 col-lg-6 text-3">
                                                <div className="col-sm text-sm-end text-5 fw-500">{billplanInformation?.amount}</div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <p className="text-center my-4"><a className="btn-link" data-bs-toggle="collapse" href="#couponCode" aria-expanded="false" aria-controls="couponCode">Apply a Coupon Code</a></p>
                                    <div id="couponCode" className="bg-light-3 p-4 rounded collapse">
                                        <h3 className="text-4">Coupon Code</h3>
                                        <div className="input-group">
                                            <input className="form-control" placeholder="Coupon Code" value={couponCode} name='coupon_code' onChange={handelCouponCodeChange} aria-label="Promo Code" type="text" />
                                            <button className="btn btn-secondary" onClick={applyCouponCode} type="submit">Apply</button>
                                        </div>
                                        {
                                            isDiscountApply ? (<div>
                                                <label style={{ color: 'green' }} >{discounAmount} Rupay discount has been applied.</label>
                                                <span style={removeBtn} onClick={removeCouponCode} >Remove</span>
                                            </div>) : (<span style={{ color: 'red' }}>{couponCodeError}</span>)
                                        }
                                    </div> */}
                                    <div className="d-grid mt-4"><Link to="/pay/payment" className="btn btn-primary">Make Payment</Link></div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <a id="back-to-top" data-bs-toggle="tooltip" title="Back to Top" href=""><i className="fa fa-chevron-up"></i></a>

        </>
    )
}
export default OrderSummary;