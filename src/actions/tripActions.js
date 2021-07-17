import axios from '../components/support-components/axios.js'
import { TRIP_LIST_REQUEST, TRIP_LIST_SUCCESS, TRIP_LIST_FAIL, TRIP_DETAILS_REQUEST, TRIP_DETAILS_SUCCESS, TRIP_DETAILS_FAIL, TRIP_CREATE_REVIEW_REQUEST, TRIP_CREATE_REVIEW_SUCCESS, TRIP_CREATE_REVIEW_FAIL } from '../constants/tripConstants'



export const listTrips = () => async (dispatch) => {
    try {
        dispatch({ type: TRIP_LIST_REQUEST })

        const { data } = await axios.get('/trips')

        dispatch({
            type: TRIP_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: TRIP_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}


export const listTripDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: TRIP_DETAILS_REQUEST })

        const { data } = await axios.get(`/trips/${id}`)

        dispatch({
            type: TRIP_DETAILS_SUCCESS,
            payload: data
        })

        localStorage.setItem('tripDetails', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: TRIP_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}



export const createTripReview = (tripId, review) => async (dispatch, getState) => {
    try {
        dispatch({
            type: TRIP_CREATE_REVIEW_REQUEST
        })

        const {
            userLogin: { userInfo }
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        await axios.post(`/trips/${tripId}/reviews`, review, config)

        dispatch({
            type: TRIP_CREATE_REVIEW_SUCCESS
        })
    } catch (error) {
        dispatch({
            type: TRIP_CREATE_REVIEW_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}
