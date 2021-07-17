import React from 'react'

const DestinationRating = ({ value, color }) => {
    return (
        <div className='rating' >
            <span>
                <i style={{ color }} className={value >= 1 ? 'fas fa-star fa-sm' : value >= 0.5 ? 'fas fa-star-half-alt fa-sm' : 'far fa-star fa-sm'}></i>
            </span>
            <span>
                <i style={{ color }} className={value >= 2 ? 'fas fa-star fa-sm' : value >= 1.5 ? 'fas fa-star-half-alt fa-sm' : 'far fa-star fa-sm'}></i>
            </span>
            <span>
                <i style={{ color }} className={value >= 3 ? 'fas fa-star fa-sm' : value >= 2.5 ? 'fas fa-star-half-alt fa-sm' : 'far fa-star fa-sm'}></i>
            </span>
            <span>
                <i style={{ color }} className={value >= 4 ? 'fas fa-star fa-sm' : value >= 3.5 ? 'fas fa-star-half-alt fa-sm' : 'far fa-star fa-sm'}></i>
            </span>
            <span>
                <i style={{ color }} className={value >= 5 ? 'fas fa-star fa-sm' : value >= 4.5 ? 'fas fa-star-half-alt fa-sm' : 'far fa-star fa-sm'}></i>
            </span>
        </div>
    )
}

DestinationRating.defaultProps = {
    color: '#114B5F'
}

export default DestinationRating
