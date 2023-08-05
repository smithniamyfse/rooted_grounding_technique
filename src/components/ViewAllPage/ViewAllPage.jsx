import React, { useEffect } from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector, useDispatch } from "react-redux";

function ViewAllPage() {
    const dispatch = useDispatch();
    const viewAllEntries = useSelector((state) => state.viewAllEntries);

    useEffect(() => {
        dispatch({ type: 'FETCH_VIEW_ALL_ENTRIES' });
    }, [dispatch]);


    // return (
    // )
}

export default ViewAll;