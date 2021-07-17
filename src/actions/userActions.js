import axios from "../components/support-components/axios"
import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT } from "../constants/userConstants"
import { toast } from "react-toastify";


export const login = (email, password) => async (dispatch) => {
    // let status = false
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/users/login', { email, password }, config)

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        // status=true
        localStorage.setItem('userInfo', JSON.stringify(data))
        // localStorage.setItem('token', data)

    } catch (error) {
        // status=false
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
        toast.warn(error.response.data.message, {
				position: toast.POSITION.TOP_LEFT
			});
    }
    // return status
}

export const loginWithGoogle = (tokenId) => async (dispatch) => {
    // let status = false
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/users/login/google/',{tokenId},config)

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        // status=true
        localStorage.setItem('userInfo', JSON.stringify(data))
        // localStorage.setItem('token', data)

    } catch (error) {
        // status=false
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
        toast.warn('Login With Google Failed', {
			position: toast.POSITION.TOP_LEFT
			});
    }
    // return status
}

export const logout = () => dispatch => {
    localStorage.removeItem('userInfo')
    localStorage.removeItem('bookedTripInfo')
    localStorage.removeItem('bookingInfo')
    dispatch({ type: USER_LOGOUT })

}
