import React, { useEffect } from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector, useDispatch } from "react-redux";
import EventEntryCard from "../EventEntryCard/EventEntryCard";

function ViewAllPage() {
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user);
    const viewAllEntries = useSelector((state) => state.viewAllEntries);

    useEffect(() => {
        dispatch({ type: 'FETCH_VIEW_ALL_ENTRIES' });
    }, [dispatch]);

    return (
        <div>
            {viewAllEntries.map(entry => (
                <EventEntryCard key={entry.id} entry={entry} />
            ))}
        </div>
    );
}


export default ViewAllPage;