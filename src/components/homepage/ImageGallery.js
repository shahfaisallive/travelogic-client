import React from 'react'
import Gallery from 'react-photo-gallery';

const ImageGallery = () => {
    const PHOTO_SET = [
        {
            src: 'images/place11.jpg',
            width: 4,
            height: 3
        },
        {
            src: 'images/place12.jpg',
            width: 3,
            height: 4
        },
        {
            src: 'images/place9.jpg',
            width: 4,
            height: 3
        },
        {
            src: 'images/place7.jpg',
            width: 4,
            height: 3
        },
        {
            src: 'images/place14.jpg',
            width: 5,
            height: 2
        },
        {
            src: 'images/place13.jpg',
            width: 3,
            height: 4
        }
    ];


    return (
        <>
            <Gallery photos={PHOTO_SET} />
        </>
    )
}
export default ImageGallery
