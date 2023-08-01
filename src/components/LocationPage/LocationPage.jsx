import React from 'react';
import CaptureImage from '../CaptureImage/CaptureImage';
import ImageUploader from '../ImageUploader/ImageUploader';

function LocationPage() {
    return (
        <section className= "location-page-container">
            <CaptureImage />
            {/* <ImageUploader /> */}
        </section>
    )
}

export default LocationPage;



// ** VERSION 1 ** 
// import React from 'react';
// import CaptureImage from '../CaptureImage/CaptureImage';

// function LocationPage() {
//     return (
//         <section className= "location-page-container">
//             <CaptureImage />
//         </section>
//     )
// }

// export default LocationPage;