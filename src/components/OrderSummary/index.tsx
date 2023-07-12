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

    const [billplanInformation, setBillplanInformation] = useState<billplanInformationIn>({
        ConnectionNumber: "",
        biller_category: '',
        biller_name: '',
        validation_date: '',
        valid_until: '',
        amount: 0,
        billlist: []
    });

    const [state, setState] = useState<any>({
        selectedCategory: null,
        selectedPlan: null,
        isLoading: true,
        billInformation: null,
        coupons: []
    })

    useEffect(() => {

        const state1: any = localStorage.getItem('state');
        if (state1) {
            const stateInfo = JSON.parse(state1);
            if(stateInfo.billInformation){
                stateInfo.billInformation.total_pay_amount = stateInfo.billInformation?.amount
            }
            getCouponCodeList(stateInfo.selectedCategory?.PayCategory)
            getLoyaltyPoints(stateInfo);
            setState((prev: any) => ({
                ...prev,
                loyaltyPoint: 0,
                selectedCategory: stateInfo?.selectedCategory,
                isLoading: false,
                selectedPlan: stateInfo?.selectedPlan,
                billInformation: stateInfo?.billInformation
            }));
        }

    }, []);
    async function getCouponCodeList(PayCategory: string) {
        setState((prev: any) => ({ ...prev, isLoading: true }));
        const data = {
            "Enquiryno": Math.floor(Math.random() * 1000) + 1000,
            "Product": "UTILITY",
            "Type": PayCategory,
            "CCNumber": ''
        }
        const cuponCodeList = await userService.DisplayCouponCode(data);
        setState((prev: any) => ({
            ...prev,
            isLoading: false,
            coupons: (cuponCodeList.coupons) ? cuponCodeList.coupons : []
        }));
    }
    async function getLoyaltyPoints(state: any) {
        setState((prev: any) => ({ ...prev, isLoading: true }));
        const data = {
            "Enquiryno": Math.floor(Math.random() * 1000) + 1000,
            "Product": "UTILITY",
            "Type": state.selectedCategory?.PayCategory,
            "Amount": (state.selectedPlan?.amount) ? state.selectedPlan?.amount : state.billInformation?.amount
        }
        const point = await userService.GetLoyaltyPoints(data);
        setState((prev: any) => ({ ...prev, isLoading: false, loyaltyPoint: point }));
    }
    const applyCouponCode = async (couponCode: any) => {
        if (state.selectedPlan) {
            state.selectedPlan.total_pay_amount = state.selectedPlan?.amount;
            state.selectedPlan.discount = 0;
            state.selectedPlan.couponCode = '';
            setState((prev: any) => ({
                ...prev,
                selectedPlan: state.selectedPlan
            }));
            setSelectedPlan(state.selectedPlan);
            localStorage.setItem('state', JSON.stringify(state.selectedPlan));
            let discount = 0;
            const data = {
                Enquiryno: Math.floor(Math.random() * 1000) + 1000,
                Product: "Utility",
                Type: state.selectedCategory?.PayCategory,
                Amount: selectedPlan?.amount,
                CouponCode: couponCode
            }
            const ApplyCodeResponse = await userService.ApplyCouponCode(data);
            if (!ApplyCodeResponse?.CouponDiscount) {

            }
            else {
                discount = ApplyCodeResponse?.CouponDiscount;
                if (state.selectedPlan.discount) {
                    state.selectedPlan.total_pay_amount = state.selectedPlan?.amount;
                }
                state.selectedPlan.total_pay_amount = (state.selectedPlan.total_pay_amount - discount).toFixed(2);
                state.selectedPlan.discount = discount;
                state.selectedPlan.couponCode = couponCode;
                setState((prev: any) => ({
                    ...prev,
                    selectedPlan: state.selectedPlan
                }));
                setSelectedPlan(state.selectedPlan);

                localStorage.setItem('state', JSON.stringify(state));

            }
        } else {

            state.billInformation.total_pay_amount = state.billInformation?.amount;
            state.billInformation.discount = 0;
            state.billInformation.couponCode = '';
            setState((prev: any) => ({
                ...prev,
                billInformation: state.billInformation
            }));

            localStorage.setItem('state', JSON.stringify(state));
            
            let discount = 0;
            const data = {
                Enquiryno: Math.floor(Math.random() * 1000) + 1000,
                Product: "Utility",
                Type: state.selectedCategory?.PayCategory,
                Amount: state.billInformation?.amount,
                CouponCode: couponCode
            }
            const ApplyCodeResponse = await userService.ApplyCouponCode(data);
            if (!ApplyCodeResponse?.CouponDiscount) {

            }
            else {
                discount = ApplyCodeResponse?.CouponDiscount;
                if (state.billInformation.discount) {
                    state.billInformation.total_pay_amount = state.billInformation?.amount;
                }
                state.billInformation.total_pay_amount = (state.billInformation.total_pay_amount - discount).toFixed(2);
                state.billInformation.discount = discount;
                state.billInformation.couponCode = couponCode;
                setState((prev: any) => ({
                    ...prev,
                    billInformation: state.billInformation
                }));
                setSelectedPlan(state.billInformation);

                localStorage.setItem('state', JSON.stringify(state));

            }
        }

    }
    const removeCouponCode = (couponCode: any) => {
        if (state.selectedPlan) {
            state.selectedPlan.total_pay_amount = state.selectedPlan?.amount;
            state.selectedPlan.discount = 0;
            state.selectedPlan.couponCode = '';
            setSelectedPlan(state.selectedPlan);

            setState((prev: any) => ({
                ...prev,
                selectedPlan: state.selectedPlan
            }));

            localStorage.setItem('state', JSON.stringify(state));
        } else {
            state.billInformation.total_pay_amount = state.billInformation?.amount;
            state.billInformation.discount = 0;
            state.billInformation.couponCode = '';
            setState((prev: any) => ({
                ...prev,
                billInformation: state.billInformation
            }));

            localStorage.setItem('state', JSON.stringify(state));
        }


    }
    if (state.isLoading) {
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
                        {(state.selectedPlan?.is_recharge) ? (
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
                                                <p className="col-sm text-sm-end fw-500"> {state.selectedPlan?.number}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-6 col-lg-6 text-3">
                                                <p className="col-sm text-muted mb-0 mb-sm-3">Operator/Circle:</p>
                                            </div>
                                            <div className="col-6 col-lg-6 text-3">
                                                <p className="col-sm text-sm-end fw-500">{state.selectedPlan?.biller_name} | {state.selectedPlan?.circle_name}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-6 col-lg-6 text-3">
                                                <p className="col-sm text-muted mb-0 mb-sm-3">Plan:</p>
                                            </div>
                                            <div className="col-6 col-lg-6 text-3">
                                                <p className="col-sm text-sm-end fw-500">{state.selectedPlan?.plan_category_name}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-6 col-lg-6 text-3">
                                                <p className="col-sm text-muted mb-0 mb-sm-3">Validity:</p>
                                            </div>
                                            <div className="col-6 col-lg-6 text-3">
                                                <p className="col-sm text-sm-end fw-500">{state.selectedPlan?.validity}</p>
                                            </div>
                                        </div>
                                        {
                                            (state.selectedPlan?.discount) ? (
                                                <div className="row">
                                                    <div className="col-6 col-lg-6 text-3">
                                                        <p className="col-sm text-muted mb-0 mb-sm-3">Discount:</p>
                                                    </div>
                                                    <div className="col-6 col-lg-6 text-3">
                                                        <p className="col-sm text-sm-end fw-500">{state.selectedPlan?.discount}</p>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="row"></div>
                                            )}
                                        <div className="row">
                                            <div className="col-6 col-lg-6 text-3">
                                                <p className="col-sm text-muted mb-0 mb-sm-3">Amount:</p>
                                            </div>
                                            <div className="col-6 col-lg-6 text-3">
                                                <p className="col-sm text-sm-end fw-500">{state.selectedPlan?.amount} </p>
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
                                                    <div className="col-sm text-sm-end text-5 fw-500">{state.selectedPlan?.total_pay_amount}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-grid mt-4"><Link to='/pay/payment' className="btn btn-primary">Make Payment</Link></div>
                                    </div>
                                </div>
                                <aside className="col-md-4 col-lg-5 col-xl-4">
                                    <div className="bg-white shadow-md rounded p-3">
                                        <h3 className="text-5 mb-3">Plan Description:</h3>
                                        <hr className="mx-n3" />
                                        <ul className="list-unstyled">
                                            <li className="mb-2"><span className="float-end mb-2" style={{ textAlign: 'justify' }}>{state.selectedPlan?.plan_description}</span></li>
                                        </ul>
                                        <hr />
                                        <br />
                                        <hr />
                                        {
                                            (state.loyaltyPoint > 0) ? (
                                                <>
                                                    <h3 className="text-5 mb-3 mt-2">Loyalty points earned:</h3>
                                                    <div className="row">
                                                        <div className="col-6 col-lg-6 text-3">
                                                            <p className="col-sm text-muted mb-0 mb-sm-3">Points:</p>
                                                        </div>
                                                        <div className="col-6 col-lg-6 text-3">
                                                            <p className="col-sm text-sm-end fw-500">{state.loyaltyPoint}</p>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                </>
                                            ) : (
                                                <>
                                                </>
                                            )
                                        }


                                        <h3 className="text-4 mb-3">Promo Code:</h3>

                                        <ul className="promo-code">
                                            {state.coupons && state.coupons.map((coupon: any, index: number) => (
                                                <li key={index}>
                                                    {
                                                        (state.selectedPlan.couponCode != coupon.CouponCode) ? (
                                                            <>
                                                                <span className="d-block text-3 fw-600">{coupon.CouponCode}
                                                                    <span
                                                                        onClick={() => { applyCouponCode(coupon.CouponCode) }} className='promo-code-apply-btn'>Apply </span>
                                                                </span>
                                                                {coupon.Remarks}</>
                                                        ) : (
                                                            <>
                                                                <span className="d-block text-3 fw-600">{coupon.CouponCode}
                                                                    <span onClick={() => { removeCouponCode(coupon.CouponCode) }} className='promo-code-apply-btn' style={{ color: 'red' }}>Remove</span>
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
                            <>
                                <div className="col-md-8 col-lg-7 col-xl-8 mx-auto">
                                    <div className="bg-white shadow-sm rounded text-3 p-3 pt-sm-4 pb-sm-5 px-sm-5 mb-0 mb-sm-4">
                                        <h3 className="text-5 fw-400 mb-3 mb-sm-4 text-center">Confirm Bill Details</h3>
                                        <hr className="mx-n3 mx-sm-n5 mb-4" />
                                        <div className="row">
                                            <div className="col-6 col-lg-6 text-3">
                                                <p className="col-sm text-muted mb-0 mb-sm-3">Connection Number:</p>
                                            </div>
                                            <div className="col-6 col-lg-6 text-3">
                                                <p className="col-sm text-sm-end fw-500 text-right">{state.billInformation?.ConnectionNumber}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-6 col-lg-6 text-3">
                                                <p className="col-sm text-muted mb-0 mb-sm-3">Category:</p>
                                            </div>
                                            <div className="col-6 col-lg-6 text-3">
                                                <p className="col-sm text-sm-end fw-500 text-right">{state.billInformation?.biller_category}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-6 col-lg-6 text-3">
                                                <p className="col-sm text-muted mb-0 mb-sm-3">Operator:</p>
                                            </div>
                                            <div className="col-6 col-lg-6 text-3">
                                                <p className="col-sm text-sm-end fw-500 text-right">{state.billInformation?.biller_name}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-6 col-lg-6 text-3">
                                                <p className="col-sm text-muted mb-0 mb-sm-3">Validation Date:</p>
                                            </div>
                                            <div className="col-6 col-lg-6 text-3">
                                                <p className="col-sm text-sm-end fw-500 text-right">{state.billInformation?.validation_date}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-6 col-lg-6 text-3">
                                                <p className="col-sm text-muted mb-0 mb-sm-3">Valid Until:</p>
                                            </div>
                                            <div className="col-6 col-lg-6 text-3">
                                                <p className="col-sm text-sm-end fw-500 text-right">{state.billInformation?.valid_until}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-6 col-lg-6 text-3">
                                                <p className="col-sm text-muted mb-0 mb-sm-3">Total Payment:</p>
                                            </div>
                                            <div className="col-6 col-lg-6 text-3">
                                                <p className="col-sm text-sm-end fw-500 text-right">{state.billInformation?.billlist[0]?.net_billamount}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-6 col-lg-6 text-3">
                                                <p className="col-sm text-muted mb-0 mb-sm-3">Remaining Amount:</p>
                                            </div>
                                            <div className="col-6 col-lg-6 text-3">
                                                <p className="col-sm text-sm-end fw-500 text-right">{state.billInformation?.billlist[0]?.billamount - state.billInformation?.amount}</p>
                                            </div>
                                        </div>
                                        <div className="bg-light-4 rounded p-3">
                                            <div className="row">
                                                <div className="col-6 col-lg-6 text-3">
                                                    <div className="col-sm text-3 fw-600">Payment Amount:</div>
                                                </div>
                                                <div className="col-6 col-lg-6 text-3">
                                                    <div className="col-sm text-sm-end text-5 fw-500">{state.billInformation?.total_pay_amount}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-grid mt-4"><Link to="/pay/payment" className="btn btn-primary">Make Payment</Link></div>
                                    </div>
                                </div>
                                <aside className="col-md-4 col-lg-5 col-xl-4">
                                    <div className="bg-white shadow-md rounded p-3">
                                        <h3 className="text-5 mb-3">More Detils:</h3>
                                        <ul className="list-unstyled">
                                            <li className="mb-2"><span className="float-end mb-2" style={{ textAlign: 'justify' }}>{state.selectedPlan?.plan_description}</span></li>
                                        </ul>
                                        <hr />
                                        <br />

                                        {
                                            (state.loyaltyPoint > 0) &&
                                            <>
                                                <h3 className="text-5 mb-3 mt-2">Loyalty points earned:</h3>
                                                <div className="row">
                                                    <div className="col-6 col-lg-6 text-3">
                                                        <p className="col-sm text-muted mb-0 mb-sm-3">Points:</p>
                                                    </div>
                                                    <div className="col-6 col-lg-6 text-3">
                                                        <p className="col-sm text-sm-end fw-500">{state.loyaltyPoint}</p>
                                                    </div>
                                                </div>
                                                <hr />
                                            </>
                                        }
                                        <h3 className="text-4 mb-3">Promo Code:</h3>

                                        <ul className="promo-code">
                                            {state.coupons && state.coupons.map((coupon: any, index: number) => (
                                                <>
                                                    <li key={JSON.stringify(coupon) + index}>
                                                        {
                                                            (state.billInformation.couponCode != coupon.CouponCode) ? (
                                                                <>
                                                                    <span className="d-block text-3 fw-600">{coupon.CouponCode}
                                                                        <span
                                                                            onClick={() => { applyCouponCode(coupon.CouponCode) }} className='promo-code-apply-btn'>Apply </span>
                                                                    </span>
                                                                    {coupon.Remarks}</>
                                                            ) : (
                                                                <>
                                                                    <span className="d-block text-3 fw-600">{coupon.CouponCode}
                                                                        <span onClick={() => { removeCouponCode(coupon.CouponCode) }} className='promo-code-apply-btn' style={{ color: 'red' }}>Remove</span>
                                                                    </span>
                                                                    {coupon.Remarks}</>
                                                            )
                                                        }

                                                    </li>
                                                </>
                                            ))}
                                        </ul>
                                    </div>
                                </aside>
                            </>

                        )}
                    </div>
                </div>
            </div>
            <a id="back-to-top" data-bs-toggle="tooltip" title="Back to Top" href=""><i className="fa fa-chevron-up"></i></a>

        </>
    )
}
export default OrderSummary;