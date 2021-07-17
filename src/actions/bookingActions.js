import { SELECT_TRIP_FOR_BOOKING, CANCEL_TRIP_FOR_BOOKING, SAVE_BOOKING_INFO, SAVE_PAYMENT_METHOD, CONFIRM_BOOKING_REQUEST, CONFIRM_BOOKING_SUCCESS, CONFIRM_BOOKING_FAIL, GET_BOOKED_TRIP_SUCCESS, GET_BOOKED_TRIP_FAIL, GET_BOOKED_TRIP_REQUEST, ORDER_PAY_FAIL, ORDER_PAY_SUCCESS, ORDER_PAY_REQUEST, CANCEL_BOOKING_REQUEST, CANCEL_BOOKING_SUCCESS, CANCEL_BOOKING_FAIL } from "../constants/bookingConstants"
import axios from "../components/support-components/axios"

export const selectTripForBooking = (id) => async (dispatch) => {
    const { data } = await axios.get(`/trips/${id}`)

    dispatch({
        type: SELECT_TRIP_FOR_BOOKING,
        payload: {
            tripId: data._id,
            title: data.title,
            price: data.price,
        }
    })
}

export const cancelTripForBooking = () => {
    return {
        type: CANCEL_TRIP_FOR_BOOKING
    }
}


export const saveBookingInfo = (data) => (dispatch) => {
    dispatch({
        type: SAVE_BOOKING_INFO,
        payload: data
    })

    localStorage.setItem('bookingInfo', JSON.stringify(data))
}


export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({
        type: SAVE_PAYMENT_METHOD,
        payload: data
    })

}


export const createBooking = (booking) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CONFIRM_BOOKING_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(`/bookings`, booking, config)

        dispatch({
            type: CONFIRM_BOOKING_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: CONFIRM_BOOKING_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }

}


export const getBookedTrip = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: GET_BOOKED_TRIP_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }


        const { data } = await axios.get(`/bookings/${id}`, config)

        dispatch({
            type: GET_BOOKED_TRIP_SUCCESS,
            payload: data
        })

        localStorage.setItem('bookedTripInfo', JSON.stringify(data))


    } catch (error) {
        dispatch({
            type: GET_BOOKED_TRIP_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }

}


export const payOrder = (bookingId, token, paymentMethod) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_PAY_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        // const { data } = await axios.put(`/bookings/${bookingId}/pay`, paymentResult, config)
        const { data } = await axios.put(`/bookings/${bookingId}/pay`, token, config)
        await axios.put(`/bookings/${bookingId}/paymentMethod`, paymentMethod, config)
        console.log(data)

        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}


export const cancelBooking = (bookingId) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CANCEL_BOOKING_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(`/bookings/${bookingId}/cancel`, config)

        dispatch({
            type: CANCEL_BOOKING_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: CANCEL_BOOKING_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}