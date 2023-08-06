import React, { useEffect } from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector, useDispatch } from "react-redux";
import EventEntryCard from "../EventEntryCard/EventEntryCard";

function ViewAllPage() {
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user);
    const viewAllEntries = useSelector((store) => store.viewAllReducer);


    useEffect(() => {
        dispatch({ type: 'FETCH_VIEW_ALL_ENTRIES' });
    }, [dispatch]);

    return (
        <div>
            {viewAllEntries && viewAllEntries.map(entry => (
                <EventEntryCard key={entry.id} entry={entry} />
            ))}
        </div>
    );
}

export default ViewAllPage;

// ** VERSION 2 - RENDERS BLANK **
// import React, { useEffect } from "react";
// import LogOutButton from "../LogOutButton/LogOutButton";
// import { useSelector, useDispatch } from "react-redux";
// import EventEntryCard from "../EventEntryCard/EventEntryCard";

// function ViewAllPage() {
//     const dispatch = useDispatch();
//     const user = useSelector((store) => store.user);
//     // const viewAllEntries = useSelector((state) => state.viewAllEntries);
//     const viewAllEntries = useSelector((store) => store.viewAllEntries);

//     useEffect(() => {
//         dispatch({ type: 'FETCH_VIEW_ALL_ENTRIES' });
//     }, [dispatch]);

//     return (
//         <div>
//             {viewAllEntries.map(entry => (
//                 <EventEntryCard key={entry.id} entry={entry} />
//             ))}
//         </div>
//     );
// }


// export default ViewAllPage;

// ** VERSION 1 **
// import React, { useEffect } from "react";
// import LogOutButton from "../LogOutButton/LogOutButton";
// import { useSelector, useDispatch } from "react-redux";
// import EventEntryCard from "../EventEntryCard/EventEntryCard";

// function ViewAllPage() {
//     const dispatch = useDispatch();
//     const user = useSelector((store) => store.user);
//     const viewAllEntries = useSelector((state) => state.viewAllEntries);

//     useEffect(() => {
//         dispatch({ type: 'FETCH_VIEW_ALL_ENTRIES' });
//     }, [dispatch]);

//     return (
//         <div>
//             {viewAllEntries.map(entry => (
//                 <EventEntryCard key={entry.id} entry={entry} />
//             ))}
//         </div>
//     );
// }


// export default ViewAllPage;