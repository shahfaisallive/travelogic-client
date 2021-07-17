import { RATE_DESTINATION_FAIL, RATE_DESTINATION_REQUEST, RATE_DESTINATION_SUCCESS } from "../constants/destinationConstants"
import axios from "../components/support-components/axios"

export const rateDestination = (destId, data) => async (dispatch, getState) => {
    try {
        dispatch({
            type: RATE_DESTINATION_REQUEST
        })
        // console.log(destId)

        const {
            userLogin: { userInfo }
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        await axios.post(`/destinations/${destId}/rating`, data, config)

        dispatch({
            type: RATE_DESTINATION_SUCCESS
        })
    } catch (error) {
        dispatch({
            type: RATE_DESTINATION_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}