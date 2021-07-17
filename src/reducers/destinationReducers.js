import { RATE_DESTINATION_FAIL, RATE_DESTINATION_REQUEST, RATE_DESTINATION_RESET, RATE_DESTINATION_SUCCESS } from "../constants/destinationConstants"

export const rateDestinationReducer = (state = {}, action) => {
    switch (action.type) {
        case RATE_DESTINATION_REQUEST:
            return { loading: true }
        case RATE_DESTINATION_SUCCESS:
            return { loading: false, success: true }
        case RATE_DESTINATION_FAIL:
            return { loading: false, error: action.payload }
        case RATE_DESTINATION_RESET:
            return {}
        default:
            return state
    }
}