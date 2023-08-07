import React, { useEffect } from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector, useDispatch } from "react-redux";
import EventEntryCard from "../EventEntryCard/EventEntryCard";

function ViewAllPage() {
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user);
    const viewAllEntries = useSelector((store) => store.viewAllEntries);


    useEffect(() => {
        dispatch({ type: 'FETCH_VIEW_ALL_ENTRIES' });
    }, [dispatch]);

    
{/* <div className="filter-section">
    <label>
        Location:
        <input type="text" onChange={handleLocationFilterChange} />
    </label>
    <label>
        Date:
        <input type="date" onChange={handleDateFilterChange} />
    </label>
    <label>
        Time:
        <input type="time" onChange={handleTimeFilterChange} />
    </label>
    <label>
        Min Distress Rating:
        <select onChange={handleMinDistressRatingChange}>
            <option value="0">0</option>
            <option value="1">1</option>
            ... (and so on till 10)
        </select>
    </label>
    <label>
        Max Distress Rating:
        <select onChange={handleMaxDistressRatingChange}>
            <option value="0">0</option>
            <option value="1">1</option>
            ... (and so on till 10)
        </select>
    </label>
    <label>
        Sense Item:
        <input type="text" onChange={handleSenseItemFilterChange} />
    </label>
    <button onClick={applyFilters}>Filter</button>
</div> */}
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
// ** VERSION 3 - WORKS **
// import React, { useEffect } from "react";
// import LogOutButton from "../LogOutButton/LogOutButton";
// import { useSelector, useDispatch } from "react-redux";
// import EventEntryCard from "../EventEntryCard/EventEntryCard";

// function ViewAllPage() {
//     const dispatch = useDispatch();
//     const user = useSelector((store) => store.user);
//     const viewAllEntries = useSelector((store) => store.viewAllReducer);


//     useEffect(() => {
//         dispatch({ type: 'FETCH_VIEW_ALL_ENTRIES' });
//     }, [dispatch]);

//     return (
//         <div>
//             {viewAllEntries && viewAllEntries.map(entry => (
//                 <EventEntryCard key={entry.id} entry={entry} />
//             ))}
//         </div>
//     );
// }

// export default ViewAllPage;

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