import React, { useEffect, useState } from 'react';
import "./SelectPaymentBox.css"
import { useDispatch, useSelector } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import { getBookedTrip, payOrder, savePaymentMethod } from '../../../actions/bookingActions';
import { ORDER_PAY_RESET } from '../../../constants/bookingConstants';


const SelectPaymentBox = ({ bookingId }) => {
    const [paymentToken, setPaymentToken] = useState({})
    const dispatch = useDispatch()

    const bookedTrip = useSelector(state => state.bookedTrip)
    const { bookedTrip: booking } = bookedTrip

    const paymentMethod = useSelector(state => state.paymentMethod.paymentMethod)

    const orderPay = useSelector((state) => state.orderPay)
    const { success } = orderPay


    const setPaymentToStripe = () => {
        dispatch(savePaymentMethod('stripe'))
    }
    const setPaymentToCod = () => {
        dispatch(savePaymentMethod('cod'))
    }

    useEffect(() => {
        if (success) {
            dispatch({ type: ORDER_PAY_RESET })
            window.location.reload()
        }
    }, [dispatch, success, booking])


    const reactStripeKey = 'pk_test_51J8VayJrpiyZj4THbJkZ5ldZHMyoVGGzCSzTdhco8HYjTku5Agefh64BRrb4clhYaULhXuq5b4j6YJ6boaT7Oq4B00075nP3XZ'
    return (
        <div className="payment-box-wrap ml-3 pb-5">
            <div className="row">
                <h5 className="mb-3">Payment procedure</h5>
            </div>
            {!booking.isPaid ? (
                <div className="row">
                    <div className="col-lg-4">
                        <button className='easypaisa-btn' onClick={setPaymentToStripe} style={{ backgroundImage: `url("https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/2560px-Stripe_Logo%2C_revised_2016.svg.png")`, backgroundSize: 'cover', backgroundPosition: 'center', }}></button>
                    </div>
                    <div className="col-lg-4">
                        <button className='cod-btn' onClick={setPaymentToCod} style={{ backgroundImage: `url("https://pngimage.net/wp-content/uploads/2018/05/cash-on-delivery-icon-png-6.png")`, backgroundSize: 'cover', backgroundPosition: 'center', }}></button>
                    </div>
                </div>
            ) : null}
            <div className="row mt-3 d-flex justify-content-start">
                <div className="payment-details-box d-flex justify-content-center">
                    {paymentMethod === 'stripe' && !booking.isPaid ? (
                        <div className="row justify-content-center d-flex mt-2 pb-5 pl-2 pr-2">
                            <div className='container'>
                                <p>Click on the below button to proceed with card payment</p>
                            </div>
                            <StripeCheckout
                                name='Travelogic'
                                description={`Please pay PKR ${booking.totalPrice} for this trip`}
                                amount={booking.totalPrice * 100}
                                currency='PKR'
                                token={token => dispatch(payOrder(bookingId, token, { paymentMethod: paymentMethod }))}
                                stripeKey={reactStripeKey}
                            >
                                <button className='btn stripeButton'>Pay With Card</button>
                            </StripeCheckout>
                        </div>
                    ) :
                        paymentMethod === 'cod' && !booking.isPaid ? (
                            <div className='m-3'>
                                <p>For cash on delivery payment, our staff will contact you for further details.</p>
                                <p>You will need to deposit cash to our member at least 2 days before of departure</p>
                            </div>
                        ) : !booking.isPaid ? (
                            <h6 className="mt-3 ml-3">Please select a payment method to proceed payment</h6>
                        ) : (
                            <h5 className="mt-1" style={{ color: 'green' }}>Your payment is complete</h5>
                        )}
                </div>
            </div>
        </div>
    )
}

export default SelectPaymentBox;
