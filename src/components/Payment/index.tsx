import React, { useState, useEffect } from 'react';
import { userService } from "../Services";
import { PaymentService } from '../Services/PaymentService';
import { Modal } from "react-bootstrap";
const renderHTML = require('react-render-html');

interface selectedPlanI {
    PayId: Number,
    discount: any,
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
    billerid: number,
}
interface billplanInformationIn {
    ConnectionNumber: any,
    biller_category: String,
    biller_name: String,
    validation_date: String,
    valid_until: String,
    amount: number,
    billlist: any[],
    billerid: any,
    txnid: String
}
interface giftCardFormIn{
    EnquiryNo:number,
    CardNo:string,
    PinNum:string,
    Amount:number
}
const Payment = () => {
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
        billerid: 0,

    });
    const [state, setState] = useState<any>({
        selectedCategory: null,
        selectedPlan: null,
        billInformation:null,
        isLoading: true,
    })
    const [amount, setAmount] = useState<any>(0);
    const [paymentMethods, setPaymentMethods] = useState<any>([]);
    const [billInformation, setBillInformation] = useState<billplanInformationIn>({
        ConnectionNumber: "",
        biller_category: '',
        biller_name: '',
        validation_date: '',
        valid_until: '',
        amount: 0,
        billlist: [],
        billerid: '',
        txnid: ""
    });
    
    const [giftCardForm, setGiftCardForm] = useState<giftCardFormIn>({
        EnquiryNo:Math.floor(Math.random() * 1000) + 1000,
        CardNo:"",
        PinNum:"",
        Amount:0
    });
    const [giftCardResponse, setGiftCardResponse] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('');
    const [upis, setUPI] = useState([]);
    const [wallets, setWallets] = useState([]);
    const [txnid, setTxnid] = useState<any>('');
    const [cardInfo, setCardInfo] = useState(
        { card_number: '5123456789012346', expiry_month: '02', expiry_year: '2028', cvv: '52', card_holder_name: 'suraj' })

    const furl = window.location.origin + "/#/pay/payment-success";
    const surl = window.location.origin + "/#/pay/payment-cancel";

    useEffect(() => {
        const state1: any = localStorage.getItem('state');
        if (state1) {
            const stateInfo = JSON.parse(state1);
            setState((prev: any) => ({
                ...prev,
                loyaltyPoint: 0,
                selectedCategory: stateInfo?.selectedCategory,
                isLoading: false,
                selectedPlan: stateInfo?.selectedPlan,
                billInformation:stateInfo?.billInformation
            }));
        }
    }, []);

    useEffect(() => {
        if (state.selectedPlan?.billerid) {
            setTxnid(state.selectedPlan?.txnid);
            setAmount(state.selectedPlan?.total_pay_amount);
            getPaymentMethodList(state.selectedPlan?.billerid);
        }
        if (state.billInformation?.billerid) {
            setTxnid(state.billInformation?.txnid);
            setAmount(state.billInformation?.amount);
            getPaymentMethodList(state.billInformation?.billerid);
        }

    }, [state.selectedPlan, state.billInformation]);

    const handleCardInfo = (event: any) => {
        const { name, value } = event.target;
        setCardInfo((prevProps) => ({
            ...prevProps,
            [name]: value
        }));
    };

    async function getPaymentMethodList(billerid: number) {
        setState((prev: any) => ({ ...prev,isLoading: true}));
        const paymentMethodList: any = await userService.getPaymentMethodList(billerid);
        setPaymentMethods(paymentMethodList);
        setActiveTab(paymentMethodList[0]?.Paymethod);
        setState((prev: any) => ({ ...prev,isLoading: false}));
    }


    const months = [
        { 'id': '01', name: "January" },
        { 'id': '02', name: "February" },
        { 'id': '03', name: "March" },
        { 'id': '04', name: "April" },
        { 'id': '05', name: "May" },
        { 'id': '06', name: "June" },
        { 'id': '07', name: "July" },
        { 'id': '08', name: "August" },
        { 'id': '09', name: "September" },
        { 'id': '10', name: "October" },
        { 'id': '11', name: "November" },
        { 'id': '12', name: "December" },
    ]
    var years: any[] = Array.from(Array(2051 - new Date().getFullYear()), (_, i) => (i + new Date().getFullYear()).toString())

    const handleTabClick = (index: number) => {

        setCardInfo({ card_number: '', expiry_month: '', expiry_year: '', cvv: '', card_holder_name: '' })

        setActiveTab(paymentMethods[index]?.Paymethod);
        setUPI(paymentMethods[index]?.paymentValues);
        setWallets(paymentMethods[index]?.paymentValues)
    }

    const handleWalletPayment = (index: number) => {
        let wallet: any = wallets[index];
        let txnid = (selectedPlan?.txnid) ? selectedPlan?.txnid : (billInformation?.txnid);
        const data = {
            txnid: txnid,
            amount: (state.selectedPlan)?(state.selectedPlan?.total_pay_amount):state.billInformation?.total_pay_amount,
            firstname: "Adnan",
            email: "skgautam7889@gmail.com",
            phone: "8707673327",
            productinfo: "iPhone14",
            pg: wallet?.pg,
            bankcode: wallet?.Bankcode,
            surl: surl,
            furl: furl,
            clientid: "10"
        }
        payPaymentRequestwithWallets(data);
    }
    const handleUPIPayment = (index: number) => {
        // let txnid = (selectedPlan?.txnid) ? selectedPlan?.txnid : (billInformation?.txnid);
        let upi: any = upis[index];
        const data = {
            txnid: Math.random().toString(16).slice(2),
            amount: (state.selectedPlan)?(state.selectedPlan?.total_pay_amount):state.billInformation?.total_pay_amount,
            firstname: "Adnan",
            email: "skgautam7889@gmail.com",
            phone: '8707673327',
            productinfo: "iPhone14",
            pg: upi.pg,
            bankcode: upi?.Bankcode,
            vpa: "7839295506@payu",
            surl: surl,
            furl: furl,
            clientid: "0"
        }
        payPaymentRequestwithUPI(data);
    }
    async function payPaymentRequestwithWallets(data: any) {
        setState((prev: any) => ({ ...prev,isLoading: true}));
        const paymentresponse: any = await PaymentService.payPaymentRequestwithWallets(data);
        const winUrl = URL.createObjectURL(
            new Blob([JSON.parse(paymentresponse)], { type: "text/html" })
        );
         const link = document.createElement('a');
         link.href = winUrl;
         link.click();  
        setState((prev: any) => ({ ...prev,isLoading: false}));
    }
    const handlePayPaymentWithCard = () => {
        const data = {
            txnid: Math.random().toString(16).slice(2),
            amount: (state.selectedPlan)?(state.selectedPlan?.total_pay_amount):state.billInformation?.total_pay_amount,
            firstname: "Adnan",
            email: "skgautam7889@gmail.com",
            phone: "8707673327",
            productinfo: "iPhone14",
            pg: "cc",
            bankcode: "No Need, api will get it from card",
            surl: surl,
            furl: furl,
            ccnum: "5123456789012346",
            ccexpmon: "05",
            ccexpyr: "2028",
            ccvv: "123",
            ccname: "Any",
            clientid: "0"
        }
        payPaymentRequestWitCard(data);
    }
    async function payPaymentRequestWitCard(data: any) {
        setState((prev: any) => ({ ...prev,isLoading: true}));
        const paymentresponse: any = await PaymentService.payPaymentWithCard(data);
        const winUrl = URL.createObjectURL(
            new Blob([JSON.parse(paymentresponse)], { type: "text/html" })
        );
         const link = document.createElement('a');
         link.href = winUrl;
         link.click();  
        setState((prev: any) => ({ ...prev,isLoading: false}));
    }
    async function payPaymentRequestwithUPI(data: any) {
        setState((prev: any) => ({ ...prev,isLoading: true}));
        const paymentresponse: any = await PaymentService.payPaymentRequestwithUPI(data);
        const winUrl = URL.createObjectURL(
            new Blob([JSON.parse(paymentresponse)], { type: "text/html" })
        );
         const link = document.createElement('a');
         link.href = winUrl;
         link.click();  
        setState((prev: any) => ({ ...prev,isLoading: false}));
    }

    //handle on change gift Card Form
    const handleGiftCardForm = (event: any) => {
        setGiftCardForm((prevProps) => ({...prevProps, Amount: amount}));
        const { name, value } = event.target;
        setGiftCardForm((prevProps) => ({
            ...prevProps,
            [name]: value
        }));
    };
    // handle on submit gift card form
    const handlePayPaymentWitGiftCard = (event:any) => {
        event.preventDefault();
        
        payApplyGiftCard(giftCardForm);
    }
    async function payApplyGiftCard(data: any) {
        setState((prev: any) => ({ ...prev,isLoading: true}));
        const giftresponse: any = await userService.ApplyGiftCard(data);
        setGiftCardResponse(giftresponse);
        setState((prev: any) => ({ ...prev,isLoading: false}));
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
                                <div className="col-3 step complete">
                                    <div className="step-name">Summary</div>
                                    <div className="progress">
                                        <div className="progress-bar"></div>
                                    </div>
                                    <a href="recharge-order-summary.html" className="step-dot"></a> </div>
                                <div className="col-3 step active">
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
                            <h2 className="text-8">Select a Payment Mode</h2>
                        </div>
                        <div className='col-lg-12 mx-auto -mt-2'>
                            <div className="bg-white shadow-md rounded">
                                <div className="row align-items-center p-4">
                                    <div className="col-md-6">
                                        {(state.selectedPlan?.is_recharge == true) ? (
                                            <h2 className="text-primary d-flex align-items-center m-0"><span className="text-3 text-dark me-1">Total Payable Amount: </span> {state.selectedPlan?.total_pay_amount}</h2>

                                        ) : (
                                            <h2 className="text-primary d-flex align-items-center m-0"><span className="text-3 text-dark me-1">Total Payable Amount: </span> {(state.billInformation?.total_pay_amount)}</h2>

                                        )}
                                       </div>
                                    <div className="col-md-6">
                                        <p className="text-md-end pb-0 mb-0">Transaction ID: <span className="text-body">{txnid}</span></p>
                                    </div>
                                </div>
                                <hr className="m-0" />
                                <div className="p-4">
                                    <h3 className="text-6 mb-4">How would you like to pay?</h3>
                                    <div className="row">
                                        <div className="col-md-4 col-lg-3">
                                            <ul className="nav nav-tabs flex-column" id="myTab" role="tablist">
                                                {/* <li className="nav-item"> <a className="nav-link active" id="first-tab" data-bs-toggle="tab" href="#firstTab" role="tab" aria-controls="firstTab" aria-selected="true">Credit/Debit Cards</a> </li>
                                                <li className="nav-item"> <a className="nav-link" id="second-tab" data-bs-toggle="tab" href="#secondTab" role="tab" aria-controls="secondTab" aria-selected="false">PayPal</a> </li> */}
                                                {
                                                    paymentMethods && paymentMethods.map((payment: any, index: number) => (
                                                        // <li key={index} className="nav-item">
                                                        //     <button className={(payment.Paymethod == activeTab) ? 'nav-link text-4 lh-lg active' : 'nav-link text-4 lh-lg'} onClick={() => handleTabClick(index)}>{payment.Paymethod}</button>
                                                        // </li>
                                                        <li key={index} className="nav-item"> <a className={(payment.Paymethod == activeTab) ? 'nav-link text-4 lh-lg active' : 'nav-link text-4 lh-lg'} id="second-tab" data-bs-toggle="tab" onClick={() => handleTabClick(index)} role="tab" aria-controls="secondTab" aria-selected="false">{payment.Paymethod}</a> </li>
                                                    ))
                                                }
                                            </ul>
                                        </div>
                                        <div className="col-md-3 col-lg-5">
                                            <div className="tab-content" id="myTabContentVertical">

                                                {activeTab === 'CreditCard' && <div className="tab-pane fade show active" id="CreditCard" role="tabpanel" aria-labelledby="first-tab">
                                                    <h3 className="text-5 mb-4">Enter Credit Card Details</h3>
                                                    <form id="payment" method="post" onSubmit={handlePayPaymentWithCard}>
                                                        <div className="row g-3">
                                                            <div className="col-12">
                                                                <label className="form-label" htmlFor="card_number">Enter Credit Card Number</label>
                                                                <input type="text" className="form-control" data-bv-field="card_number" id="card_number" name='card_number' required placeholder="Card Number" value={cardInfo.card_number} onChange={handleCardInfo} />
                                                            </div>
                                                            <div className="col-lg-4">
                                                                <div>
                                                                    <label className="form-label" htmlFor="expiryMonth">Expiry Month</label>
                                                                    <select id="expiryMonth" className="form-select" required name='expiry_month' value={cardInfo.expiry_month} onChange={handleCardInfo}>
                                                                        <option value="">Expiry Month</option>
                                                                        <option value="1">January</option>
                                                                        {
                                                                            months && months.map((month, index) => (
                                                                                <option key={index} value={month.id}>{month.name}</option>
                                                                            ))
                                                                        }
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-4">
                                                                <div>
                                                                    <label className="form-label" htmlFor="expiryYear">Expiry Year</label>
                                                                    <select id="expiryYear" className="form-select" required name='expiry_year' value={cardInfo.expiry_year} onChange={handleCardInfo}>
                                                                        <option value="">Expiry Year</option>
                                                                        {
                                                                            years && years.map((year, index) => (
                                                                                <option key={index}>{year}</option>
                                                                            ))
                                                                        }
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-4">
                                                                <label className="form-label" htmlFor="cvvNumber">CVV</label>
                                                                <input type="text" className="form-control" data-bv-field="cvvnumber" id="cvvNumber" required placeholder="CVV Number" name='cvv' value={cardInfo.cvv} onChange={handleCardInfo} />
                                                            </div>
                                                            <div className="col-12">
                                                                <label className="form-label" htmlFor="cardHolderName">Card Holder Name</label>
                                                                <input type="text" className="form-control" data-bv-field="cardholdername" id="cardHolderName" required placeholder="Card Holder Name" name='card_holder_name' value={cardInfo.card_holder_name} onChange={handleCardInfo} />
                                                            </div>
                                                            <div className="col-12">
                                                                <div className="form-check">
                                                                    <input id="save-card" name="savecard" className="form-check-input" type="checkbox" />
                                                                    <label className="form-check-label" htmlFor="save-card">Save my card Details.</label>
                                                                </div>
                                                            </div>
                                                            <div className="col-12 d-grid"> <button className="btn btn-primary" >Proceed to Pay</button> </div>
                                                        </div>
                                                    </form>
                                                </div>}
                                                {activeTab === 'DebitCard' && <div className="tab-pane fade show active" id="DebitCard" role="tabpanel" aria-labelledby="first-tab">
                                                    <h3 className="text-5 mb-4">Enter Debit Card Details</h3>
                                                    <form id="payment" method="post" onSubmit={handlePayPaymentWithCard}>
                                                        <div className="row g-3">
                                                            <div className="col-12">
                                                                <label className="form-label" htmlFor="card_number">Enter Credit Card Number</label>
                                                                <input type="text" className="form-control" data-bv-field="card_number" id="card_number" name='card_number' required placeholder="Card Number" value={cardInfo.card_number} onChange={handleCardInfo} />
                                                            </div>
                                                            <div className="col-lg-4">
                                                                <div>
                                                                    <label className="form-label" htmlFor="expiryMonth">Expiry Month</label>
                                                                    <select id="expiryMonth" className="form-select" required name='expiry_month' value={cardInfo.expiry_month} onChange={handleCardInfo}>
                                                                        <option value="">Expiry Month</option>
                                                                        <option value="1">January</option>
                                                                        {
                                                                            months && months.map((month, index) => (
                                                                                <option key={index} value={month.id}>{month.name}</option>
                                                                            ))
                                                                        }
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-4">
                                                                <div>
                                                                    <label className="form-label" htmlFor="expiryYear">Expiry Year</label>
                                                                    <select id="expiryYear" className="form-select" required name='expiry_year' value={cardInfo.expiry_year} onChange={handleCardInfo}>
                                                                        <option value="">Expiry Year</option>
                                                                        {
                                                                            years && years.map((year, index) => (
                                                                                <option key={index}>{year}</option>
                                                                            ))
                                                                        }
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-4">
                                                                <label className="form-label" htmlFor="cvvNumber">CVV</label>
                                                                <input type="text" className="form-control" data-bv-field="cvvnumber" id="cvvNumber" required placeholder="CVV Number" name='cvv' value={cardInfo.cvv} onChange={handleCardInfo} />
                                                            </div>
                                                            <div className="col-12">
                                                                <label className="form-label" htmlFor="cardHolderName">Card Holder Name</label>
                                                                <input type="text" className="form-control" data-bv-field="cardholdername" id="cardHolderName" required placeholder="Card Holder Name" name='card_holder_name' value={cardInfo.card_holder_name} onChange={handleCardInfo} />
                                                            </div>
                                                            <div className="col-12">
                                                                <div className="form-check">
                                                                    <input id="save-card" name="savecard" className="form-check-input" type="checkbox" />
                                                                    <label className="form-check-label" htmlFor="save-card">Save my card Details.</label>
                                                                </div>
                                                            </div>
                                                            <div className="col-12 d-grid"> <button className="btn btn-primary" >Proceed to Pay</button> </div>
                                                        </div>
                                                    </form>
                                                </div>}
                                                {activeTab === 'PrepaidCard' && <div className="tab-pane fade show active" id="PrepaidCard" role="tabpanel" aria-labelledby="first-tab">
                                                    <h3 className="text-5 mb-4">Enter Prepaid Card Details</h3>
                                                    <form id="payment" method="post" onSubmit={handlePayPaymentWithCard}>
                                                        <div className="row g-3">
                                                            <div className="col-12">
                                                                <label className="form-label" htmlFor="card_number">Enter Credit Card Number</label>
                                                                <input type="text" className="form-control" data-bv-field="card_number" id="card_number" name='card_number' required placeholder="Card Number" value={cardInfo.card_number} onChange={handleCardInfo} />
                                                            </div>
                                                            <div className="col-lg-4">
                                                                <div>
                                                                    <label className="form-label" htmlFor="expiryMonth">Expiry Month</label>
                                                                    <select id="expiryMonth" className="form-select" required name='expiry_month' value={cardInfo.expiry_month} onChange={handleCardInfo}>
                                                                        <option value="">Expiry Month</option>
                                                                        <option value="1">January</option>
                                                                        {
                                                                            months && months.map((month, index) => (
                                                                                <option key={index} value={month.id}>{month.name}</option>
                                                                            ))
                                                                        }
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-4">
                                                                <div>
                                                                    <label className="form-label" htmlFor="expiryYear">Expiry Year</label>
                                                                    <select id="expiryYear" className="form-select" required name='expiry_year' value={cardInfo.expiry_year} onChange={handleCardInfo}>
                                                                        <option value="">Expiry Year</option>
                                                                        {
                                                                            years && years.map((year, index) => (
                                                                                <option key={index}>{year}</option>
                                                                            ))
                                                                        }
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-4">
                                                                <label className="form-label" htmlFor="cvvNumber">CVV</label>
                                                                <input type="text" className="form-control" data-bv-field="cvvnumber" id="cvvNumber" required placeholder="CVV Number" name='cvv' value={cardInfo.cvv} onChange={handleCardInfo} />
                                                            </div>
                                                            <div className="col-12">
                                                                <label className="form-label" htmlFor="cardHolderName">Card Holder Name</label>
                                                                <input type="text" className="form-control" data-bv-field="cardholdername" id="cardHolderName" required placeholder="Card Holder Name" name='card_holder_name' value={cardInfo.card_holder_name} onChange={handleCardInfo} />
                                                            </div>
                                                            <div className="col-12">
                                                                <div className="form-check">
                                                                    <input id="save-card" name="savecard" className="form-check-input" type="checkbox" />
                                                                    <label className="form-check-label" htmlFor="save-card">Save my card Details.</label>
                                                                </div>
                                                            </div>
                                                            <div className="col-12 d-grid"> <button className="btn btn-primary">Proceed to Pay</button> </div>
                                                        </div>
                                                    </form>
                                                </div>}
                                                {activeTab === 'UPI' && <div className="tab-pane fade show active" id="UPI" role="tabpanel" aria-labelledby="first-tab">
                                                    <h3 className="text-5 mb-4">Select Any UPI</h3>
                                                    <div className="row g-3">
                                                        {
                                                            upis && upis.map((upi: any, index: number) => (
                                                                <div key={index} className="col-12">
                                                                    <div className="row">
                                                                        <div className='col-2'>
                                                                            <input type="radio" name='upi' onClick={() => handleUPIPayment(index)} />
                                                                        </div>
                                                                        <div className="col-2">
                                                                            <div style={{ height: "60px", width: "60px" }}>
                                                                                <img className="img-fluid" src={upi?.LogoPath} alt="Paypal Logo" title="Pay easily, fast and secure with PayPal." />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-8 text-left">
                                                                            <span>{upi?.PaymentName}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                </div>}
                                                {activeTab === 'Wallet' && <div className="tab-pane fade show active" id="Wallet" role="tabpanel" aria-labelledby="first-tab">
                                                    <h3 className="text-5 mb-4">Pay payment any Wallet</h3>
                                                    <div className="row g-3">
                                                        {
                                                            wallets && wallets.map((wallet: any, index: number) => (
                                                                <div key={index} className="col-12">
                                                                    <div className="row">
                                                                        <div className="col-2">
                                                                            <div style={{ height: "30px", width: "30px" }}>
                                                                                <img className="img-fluid" src={wallet?.LogoPath} alt="Paypal Logo" title="Pay easily, fast and secure with PayPal." />

                                                                            </div>
                                                                        </div>
                                                                        <div className="col-6 text-left">
                                                                            <span>{wallet?.PaymentName}</span>
                                                                        </div>
                                                                        <div className="col-4">
                                                                            <span><button className='btn btn-primary d-flex align-items-center justify-content-center' onClick={() => handleWalletPayment(index)}>Pay</button></span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                </div>}
                                                {activeTab === 'GiftCard' && <div className="tab-pane fade show active" id="CreditCard" role="tabpanel" aria-labelledby="first-tab">
                                                    <h3 className="text-5 mb-4">Enter Gift Card Detail</h3>
                                                    <form id="payment" method="post" onSubmit={handlePayPaymentWitGiftCard}>
                                                        <div className="row g-3">
                                                            <div className="col-12">
                                                                <label className="form-label" htmlFor="CardNo">Card Number</label>
                                                                <input type="text" className="form-control" data-bv-field="CardNo" id="CardNo" name='CardNo' required placeholder="Card Number" value={giftCardForm.CardNo} onChange={handleGiftCardForm} />
                                                            </div>
                                                            <div className="col-12">
                                                                <label className="form-label" htmlFor="pin_number">Pin Number</label>
                                                                <input type="text" className="form-control" data-bv-field="pin_number" id="pin_number" name='PinNum' required placeholder="Pin Number" value={giftCardForm.PinNum} onChange={handleGiftCardForm} />
                                                            </div>
                                                            <div className='col-12'>
                                                                {
                                                                    giftCardResponse && <>
                                                                        <span>{giftCardResponse?.Message}</span>
                                                                    </>
                                                                }
                                                            </div>
                                                            <div className="col-12 d-grid"> <button className="btn btn-primary" >Proceed to Pay</button> </div>
                                                        </div>
                                                    </form>
                                                </div>}
                                            </div>
                                        </div>
                                        <div className="col-md-5 col-lg-4">
                                            <div className='row'>
                                                <div className='col-md-12 col-lg-12'>
                                                    {(state.selectedPlan?.is_recharge == true) ? (
                                                        <div className="bg-light-2 rounded p-4 mb-4">
                                                            <h3 className="text-5 mb-4">Fare Details</h3>
                                                            <ul className="list-unstyled">
                                                                <li className="mb-2">Mobile Number: <span className="float-end text-4 fw-400 text-dark">{state.selectedPlan.number}</span></li>
                                                                <li className="mb-2">Operator/Circle: <span className="float-end text-4 fw-300 text-dark operator-biller_name">{state.selectedPlan?.biller_name} | {state.selectedPlan?.circle_name}</span></li>
                                                                <li className="mb-2">Plan: <span className="float-end text-4 fw-400 text-dark">{state.selectedPlan?.plan_category_name}</span></li>
                                                                <li className="mb-2">Validity: <span className="float-end text-4 fw-400 text-dark">{state.selectedPlan?.validity}</span></li>

                                                            </ul>
                                                        </div>
                                                    ) : (
                                                        <div className="bg-light-2 rounded p-4 mb-4">
                                                            <h3 className="text-5 mb-4">Payable Amount</h3>
                                                            <ul className="list-unstyled">
                                                                <li className="mb-2">Connection Number: <span className="float-end text-4 fw-400 text-dark">{state.billInformation?.ConnectionNumber}</span></li>
                                                                <li className="mb-2">Category: <span className="float-end text-4 fw-400 text-dark">{state.billInformation?.biller_category}</span></li>
                                                                <li className="mb-2">Operator: <span className="float-end text-4 fw-300 text-dark operator-bill">{state.billInformation?.biller_name}</span></li>
                                                                <li className="mb-2">Validation Date: <span className="float-end text-4 fw-300 text-dark">{state.billInformation?.validation_date}</span></li>
                                                                <li className="mb-2">Valid Until: <span className="float-end text-4 fw-300 text-dark">{state.billInformation?.valid_until}</span></li>

                                                            </ul>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className='col-md-12 col-lg-12'>
                                                    {(state.selectedPlan?.is_recharge == true) ? (
                                                        <div className="bg-light-2 rounded p-4 mb-4">
                                                            <h3 className="text-5 mb-4">Payable Amount</h3>
                                                            <ul className="list-unstyled">
                                                                <li className="mb-2">Transaction ID: <span className="float-end text-4 fw-500 text-dark">{txnid}</span></li>
                                                                <li className="mb-2">Amount <span className="float-end text-4 fw-500 text-dark">{state.selectedPlan?.amount}</span></li>
                                                                {
                                                                    state.selectedPlan?.discount ? (<li className="mb-2">Discount <span className="text-success">({state.selectedPlan?.discount} Off!)</span> <span className="float-end text-4 fw-500 text-dark">-{state.selectedPlan?.discount}</span></li>) : (<span></span>)
                                                                }
                                                            </ul>
                                                            <hr />
                                                            <div className="text-dark text-4 fw-500 py-1"> Total Amount<span className="float-end text-7">{state.selectedPlan?.total_pay_amount}</span></div>
                                                        </div>
                                                    ) : (
                                                        <div className="bg-light-2 rounded p-4 mb-4">
                                                            <h3 className="text-5 mb-4">Payable Amount</h3>
                                                            <ul className="list-unstyled">
                                                                <li className="mb-2">Transaction ID: <span className="float-end text-4 fw-500 text-dark">{txnid}</span></li>
                                                                <li className="mb-2">Amount <span className="float-end text-4 fw-500 text-dark">{state.billInformation?.billlist[0]?.billamount}</span></li>
                                                                <li className="mb-2">Remaining Amount <span className="float-end text-4 fw-500 text-dark">{state.billInformation?.billlist[0]?.billamount - state.billInformation?.total_pay_amount}</span></li>
                                                                {
                                                                    state.selectedPlan?.discount ? (<li className="mb-2">Discount <span className="text-success">({state.selectedPlan?.discount} Off!)</span> <span className="float-end text-4 fw-500 text-dark">-{state.selectedPlan?.discount}</span></li>) : (<span></span>)
                                                                }
                                                            </ul>
                                                            <hr />
                                                            <div className="text-dark text-4 fw-500 py-1"> Total Amount<span className="float-end text-7">{(state.billInformation?.total_pay_amount)}</span></div>
                                                        </div>
                                                    )}

                                                    <div className="bg-light-2 rounded p-4 d-none d-md-block">
                                                        <h3 className="text-5 mb-3">We value your Privacy.</h3>
                                                        <p className="mb-0">We will not sell or distribute your information. Read our <a href="#">Privacy Policy</a>.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <a id="back-to-top" data-bs-toggle="tooltip" title="Back to Top" href="#"><i className="fa fa-chevron-up"></i></a>
        </>
    )
}
export default Payment;