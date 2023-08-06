import React from "react";
import convertDateAndTime from '../../utils/dateUtils';


function EventEntryCard({ entry }) {
    return (
        <div>
            <img src={entry.image_url} alt="Event" />
            <p>{entry.location}</p>
            <p>{convertDateAndTime(entry.date, entry.time)[0]}</p>
            <p>{convertDateAndTime(entry.date, entry.time)[1]}</p>
        </div>
    );
}

export default EventEntryCard;

// ** VERSION 2 - DOES WORK BUT NEEDED DATE AND TIME READABILITY **
// import React from "react";

// function EventEntryCard({ entry }) {
//     return (
//         <div>
//             <img src={entry.image_url} alt="Event" />
//             <p>{entry.location}</p>
//             <p>{entry.date}</p>
//             <p>{entry.time}</p>
//         </div>
//     );
// }

// export default EventEntryCard;


// ** VERSION 1 - DOESN'T WORK **
// import React, { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";

// function EventEntryCard() {
//     // const viewAllEntries = useSelector((store) => store.viewAllEntries);
//     const viewAllEntries = useSelector((store) => store.viewAllEntries);

//     return (
//         <div>
//             <img src={image_url} alt="Event" />
//             <p>{location}</p>
//             <p>{date}</p>
//             <p>{time}</p>
//         </div>
//     );
// }

// export default EventEntryCard;

