import { SELECT_TRIP_FOR_BOOKING, CANCEL_TRIP_FOR_BOOKING, SAVE_BOOKING_INFO, SAVE_PAYMENT_METHOD, CONFIRM_BOOKING_FAIL, CONFIRM_BOOKING_REQUEST, CONFIRM_BOOKING_SUCCESS, GET_BOOKED_TRIP_FAIL, GET_BOOKED_TRIP_SUCCESS, GET_BOOKED_TRIP_REQUEST, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS, ORDER_PAY_FAIL, ORDER_PAY_RESET, CANCEL_BOOKING_REQUEST, CANCEL_BOOKING_SUCCESS, CANCEL_BOOKING_FAIL } from "../constants/bookingConstants"

export const selectedTripReducer = (state = {}, action) => {
    switch (action.type) {
        case SELECT_TRIP_FOR_BOOKING:
            return { selectedTrip: action.payload }

        case CANCEL_TRIP_FOR_BOOKING:
            return {
                ...state,
                selectedTrip: {}
            }

        default:
            return state
    }
}


export const bookingReducer = (state = {}, action) => {
    switch (action.type) {
        case SAVE_BOOKING_INFO:
            return action.payload

        default:
            return state
    }
}

export const paymentMethodReducer = (state = { paymentMethod: null }, action) => {
    switch (action.type) {
        case SAVE_PAYMENT_METHOD:
            return {
                paymentMethod: action.payload
            }

        default:
            return state
    }
}


export const createBookingReducer = (state = {}, action) => {
    switch (action.type) {
        case CONFIRM_BOOKING_REQUEST:
            return {
                loading: true
            }

        case CONFIRM_BOOKING_SUCCESS:
            return {
                loading: false,
                success: true,
                booking: action.payload
            }

        case CONFIRM_BOOKING_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default: return state
    }
}


export const bookedTripReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_BOOKED_TRIP_REQUEST:
            return { loading: true, ...state }

        case GET_BOOKED_TRIP_SUCCESS:
            return { loading: false, bookedTrip: action.payload }

        case GET_BOOKED_TRIP_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}


export const orderPayReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_PAY_REQUEST:
            return {
                loading: true
            }

        case ORDER_PAY_SUCCESS:
            return {
                loading: false,
                success: true
            }

        case ORDER_PAY_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case ORDER_PAY_RESET:
            return {}

        default: return state

    }
}


export const cancelBookingReducer = (state = {}, action) => {
    switch (action.type) {
        case CANCEL_BOOKING_REQUEST:
            return {
                loading: true
            }

        case CANCEL_BOOKING_SUCCESS:
            return {
                loading: false,
                success: true
            }

        case CANCEL_BOOKING_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default: return state

    }
}
