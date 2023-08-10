import React, { useEffect } from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector, useDispatch } from "react-redux";
import EventEntryCard from "../EventEntryCard/EventEntryCard";
import FilterViewAll from "../FilterViewAll/FilterViewAll";
import { Filter } from "@mui/icons-material";

function ViewAllPage() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const viewAllEntries = useSelector((store) => store.viewAllEntries);
  // const entry = useSelector((store) => store.selectedEntry);

  // const [editMode, setEditMode] = useState(false);
  // const [updatedDateTime, setUpdatedDateTime] = useState({});

  useEffect(() => {
    dispatch({ type: "FETCH_VIEW_ALL_ENTRIES" });
  }, [dispatch]);

  
  return (
    <>
    <div>
        <FilterViewAll />
    </div>
    <div>
      {viewAllEntries &&
        viewAllEntries.map((entry) => (
          <EventEntryCard key={entry.id} entry={entry} />
        ))}
    </div>
    </>
  );
}

export default ViewAllPage;
