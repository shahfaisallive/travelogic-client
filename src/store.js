import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { tripCreateReviewReducer, tripDetailsReducer, tripListReducer, } from "./reducers/tripReducers";
import { userLoginReducer } from './reducers/userReducers';
import { bookedTripReducer, bookingReducer, cancelBookingReducer, createBookingReducer, orderPayReducer, paymentMethodReducer, selectedTripReducer } from './reducers/bookingReducers';
import { rateDestinationReducer } from './reducers/destinationReducers';


const reducer = combineReducers({
    userLogin: userLoginReducer,
    tripList: tripListReducer,
    tripDetails: tripDetailsReducer,
    tripSelected: selectedTripReducer,
    bookingInfo: bookingReducer,
    paymentMethod: paymentMethodReducer,
    bookingDetails: createBookingReducer,
    bookedTrip: bookedTripReducer,
    orderPay: orderPayReducer,
    cancelBooking: cancelBookingReducer ,
    tripCreateReview: tripCreateReviewReducer,
    rateDestination: rateDestinationReducer
})

const tripDetailsFromStorage = localStorage.getItem('tripDetails') ? JSON.parse(localStorage.getItem('tripDetails')) : {}
const bookingInfoFromStorage = localStorage.getItem('bookingInfo') ? JSON.parse(localStorage.getItem('bookingInfo')) : {}
const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
const bookedTripInfoFromStorage = localStorage.getItem('bookedTripInfo') ? JSON.parse(localStorage.getItem('bookedTripInfo')) : {}



const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
    tripDetails: {loading: true, trip: tripDetailsFromStorage },
    bookingInfo: bookingInfoFromStorage,
    bookedTrip: { bookedTrip: bookedTripInfoFromStorage }
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store
